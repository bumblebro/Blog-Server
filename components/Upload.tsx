"use client";

import axios from "axios";
import { load } from "cheerio";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { subSections } from "../libs/Section";

function Upload() {
  interface blogs {
    blog: string;
    image: string;
  }

  const [section, setSection] = useState<string>("Tech");
  const [subSection, setSubSection] = useState<string>("Apple");
  const [subSubSection, setSubSubSection] = useState<string>("iPhone");
  const [title, setTitle] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState([{ blog: "", query: "" }]);
  const [updatedBlog, setUpdatedBlog] = useState([]);

  const searchImages = async (query: string) => {
    console.log(query);
    const response = await axios.post("/api/scrape", {
      query,
    });
    console.log(response.data.results.url);
    return response.data.results.url;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Clicked");
    setLoading(true);
    setUpdatedBlog([]);
    const blogs = await axios.post("/api/upload", {
      section,
      subSection,
      subSubSection,
      title,
    });
    const data = await blogs.data;
    const covertedBlog = await JSON.parse(data);
    console.log(covertedBlog);
    const results = await Promise.all(
      covertedBlog.map(async (item) => {
        let link;
        if (item.query == null) {
          link = "null";
        } else {
          link = await searchImages(item.query);
        }

        // const link = "hello";
        console.log("links", link);
        return { title: item.title, description: item.description, url: link };
      })
    );
    setUpdatedBlog(results);
    console.log(covertedBlog);
    console.log(updatedBlog);
    console.log(typeof blog);
    setLoading(false);
  }

  async function createBlog() {
    const res = await axios.post("/api/dbupload", {
      title: updatedBlog[0].title,
      section,
      subsection: subSection,
      subsubsection: subSubSection,
      blogDetails: updatedBlog,
    });
    console.log("Upload Result", res);
  }

  async function handleimage(query: string) {
    const image = await axios.post("/api/image", {
      query,
    });
    const data = await image.data;
    // console.log(data);
    console.log(data.link);
    return data.link;
  }

  return (
    <div className="w-7/12 flex flex-col mx-auto mt-12 ">
      <form action="" className="flex flex-col" onSubmit={handleSubmit}>
        <select
          title="Section"
          name="section"
          id="section"
          onChange={(e) => {
            setSection(e.target.value);
            setSubSection(""); // Reset sub-section when section changes
            setSubSubSection(""); // Reset sub-sub-section when section changes
          }}
        >
          {Object.keys(subSections).map((section, index) => (
            <option key={index} value={section}>
              {section}
            </option>
          ))}
        </select>

        {section && (
          <select
            title="Subsection"
            name="subSection"
            id="subSection"
            onChange={(e) => {
              setSubSection(e.target.value);
              setSubSubSection(""); // Reset sub-sub-section when sub-section changes
            }}
          >
            {Object.keys(subSections[section] || {}).map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}

        {subSection && (
          <select
            title="Sub-subsection"
            name="subSubSection"
            id="subSubSection"
            onChange={(e) => setSubSubSection(e.target.value)}
          >
            {(subSections[section][subSection] || []).map((subSub, index) => (
              <option key={index} value={subSub}>
                {subSub}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Write the Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="border-2">Generate</button>
      </form>

      {/* <button onClick={searchImages} className="border-2">
        Generate cat
      </button> */}
      {/* {updatedBlog.map((item, index) => (
        <h1 key={index}>
          <ReactMarkdown>{item?.blog}</ReactMarkdown>
          {item.url !== "null" && <img src={item.url} alt="" />}
        </h1>
      ))} */}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <button onClick={createBlog}>Add to DB</button>
          {updatedBlog.map((item, index) => (
            <div key={index} className="flex flex-col gap-5 pb-5">
              <h1 className="text-2xl font-bold">{item?.title}</h1>
              <h2 className="text-[#505050]">{item?.description}</h2>{" "}
              {item.url !== "null" && (
                <img className="h-96 object-cover" src={item.url} alt="" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Upload;
