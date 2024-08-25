"use client";

import axios from "axios";
import { ChangeEvent, useState } from "react";

function Upload() {
  const [section, setSection] = useState<string>("Tech");
  const [subSection, setSubSection] = useState<string>("Apple");
  const [title, setTitle] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<string>();

  async function handleSubmit(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();
    const blog = await axios.post("http://localhost:3001/api/upload", {
      section,
      subSection,
      title,
    });
    const data = await blog.data;
    setBlog(data);
    setLoading(false);
  }

  return (
    <div className="  inline-block ">
      <form action="" className="flex flex-col " onSubmit={handleSubmit}>
        <select
          title="Ndew"
          name="cdc"
          id="csd"
          onChange={(e) => {
            setSection(e.target.value);
          }}
        >
          <option value="Tech">Tech</option>
          <option value="Fashion">Fashion</option>
          <option value="Rides">Rides</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Living">Living</option>
          <option value="Outdoors">Outdoors</option>
          <option value="News">News</option>
        </select>
        {section == "Tech" && (
          <select
            title="Tech"
            name="Tech"
            id="Tech"
            onChange={(e) => {
              setSubSection(e.target.value);
            }}
          >
            <option value="Apple">Apple</option>
            <option value="Audio">Audio</option>
            <option value="Cameras">Cameras</option>
            <option value="Computers">Computers</option>
            <option value="Smartphones">Smartphones</option>
          </select>
        )}{" "}
        {section == "Fashion" && (
          <select
            title="Fashion"
            name="Fashion"
            id="Fashion"
            onChange={(e) => {
              setSubSection(e.target.value);
            }}
          >
            <option value="Men's Fashion Advice">Men's Fashion Advice</option>
            <option value="Men's Fashion Trends">Men's Fashion Trends</option>
            <option value="Men's Fragnances">Men's Fragnances</option>
            <option value="Men's Hairstyles">Men's Hairstyles</option>
            <option value="Sneakers & Shoes">Sneakers & Shoes</option>
            <option value="Watches">Watches</option>
          </select>
        )}{" "}
        {section == "Rides" && (
          <select
            title="Rides"
            name="Rides"
            id="Rides"
            onChange={(e) => {
              setSubSection(e.target.value);
            }}
          >
            <option value="Boats">Boats</option>
            <option value="Cars">Cars</option>
            <option value="Cycling">Cycling</option>
            <option value="Flying">Flying</option>
            <option value="Motorcycles">Motorcycles</option>
          </select>
        )}
        {section == "Lifestyle" && (
          <select
            title="Lifestyle"
            name="Lifestyle"
            id="Lifestyle"
            onChange={(e) => {
              setSubSection(e.target.value);
            }}
          >
            <option value="Boats">Advice</option>
            <option value="Cars">Drinks</option>
            <option value="Cycling">Fitness</option>
            <option value="Flying">Finance</option>
            <option value="Food">Food</option>
            <option value="Grooming">Grooming</option>
            <option value="Sex & Dating">Sex & Dating</option>
            <option value="Travel">Travel</option>
          </select>
        )}
        {section == "Entertainment" && (
          <select
            title="Entertainment"
            name="Entertainment"
            id="Entertainment"
            onChange={(e) => {
              setSubSection(e.target.value);
            }}
          >
            <option value="Art">Art</option>
            <option value="Books">Books</option>
            <option value="Gaming">Gaming</option>
            <option value="Movies & TV">Movies & TV</option>
            <option value="Music">Music</option>
            <option value="Sport">Sport</option>
          </select>
        )}
        {section == "Living" && (
          <select
            title="Living"
            name="Living"
            id="Living"
            onChange={(e) => {
              setSubSection(e.target.value);
            }}
          >
            <option value="Appliances">Appliances</option>
            <option value="Architecture">Architecture</option>
            <option value="Furniture">Furniture</option>
            <option value="Homewares">Homewares</option>
          </select>
        )}
        {section == "Outdoors" && (
          <select
            title="Outdoors"
            name="Outdoors"
            id="Outdoors"
            onChange={(e) => {
              setSubSection(e.target.value);
            }}
          >
            <option value="Camping">Camping</option>
            <option value="Snow">Snow</option>
            <option value="Surfing">Surfing</option>
          </select>
        )}
        <input
          type="text"
          name=""
          id=""
          placeholder="Write the Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button className="border-2">Generate</button>
      </form>
      {loading ? <h1>Loading...</h1> : <p className="text-base">{blog}</p>}
    </div>
  );
}

export default Upload;
