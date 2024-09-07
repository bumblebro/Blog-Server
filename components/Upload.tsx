"use client";

import axios from "axios";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { subSections } from "../libs/Section";
import slugify from "slugify";

interface blogs {
  blog: string;
  image: string;
}

interface updatedBlog {
  title: string;
  description: string;
  url: string;
}
interface sections {
  [key: string]: any; // Allows any string key to be used
}

function Upload() {
  const sections: sections = subSections;

  const [section, setSection] = useState<string>("Tech");
  const [subSection, setSubSection] = useState<string>("Apple");
  const [subSubSection, setSubSubSection] = useState<string>("iPhone");
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState([{ blog: "", query: "" }]);
  const [updatedBlog, setUpdatedBlog] = useState<updatedBlog[]>([]);
  const [seo, setSeo] = useState({});
  const [author, setAuthor] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [imageurl, setImageUrl] = useState<string>("");
  const [imagealt, setImageAlt] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

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
    console.log(`blog`, covertedBlog);
    const link = await searchImages(covertedBlog.imageQuery);
    setAuthor(covertedBlog.author);
    setQuote(covertedBlog.quote);
    setSeo(covertedBlog.seo);
    setTitle(slugify(covertedBlog.pageTitle));
    setImageUrl(link);
    setImageAlt(covertedBlog.imageQuery);
    setSlug(
      `${section}/${subSection}/${subSubSection}/${slugify(
        covertedBlog.pageTitle
      )}`
    );
    const results = await Promise.all(
      covertedBlog.content.map(
        async (item: { query: string; title: string; description: string }) => {
          let link;
          if (item.query == null) {
            link = "null";
          } else {
            link = await searchImages(item.query);
          }

          // const link = "hello";
          console.log("links", link);
          return {
            title: item.title,
            description: item.description,
            url: link,
            alt: item.query,
          };
        }
      )
    );

    setUpdatedBlog(results);

    setLoading(false);
  }

  async function createBlog() {
    const res = await axios.post("/api/dbupload", {
      section,
      title,
      imagealt,
      imageurl,
      subsection: subSection,
      subsubsection: subSubSection,
      content: updatedBlog,
      author,
      quote,
      seo,
      slug,
    });
    console.log("Upload Result", res);
  }

  return (
    <div className="w-7/12 flex flex-col mx-auto my-52 ">
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
          {Object.keys(sections).map((section, index) => (
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
            {Object.keys(sections[section] || {}).map((sub, index) => (
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
            {(sections[section][subSection] || []).map(
              (subSub: string[], index: number) => (
                <option key={index} value={subSub}>
                  {subSub}
                </option>
              )
            )}
          </select>
        )}

        <input type="text" placeholder="Write the Title" />
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
