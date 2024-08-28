"use client";

import axios from "axios";
import { load } from "cheerio";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";

const subSections = {
  Tech: {
    Apple: ["iPhone", "MacBook", "iPad"],
    Audio: ["Headphones", "Speakers", "Earbuds"],
    Cameras: ["DSLR", "Mirrorless", "Action Cameras"],
    Computers: ["Laptops", "Desktops", "Tablets"],
    Smartphones: ["Android", "iOS", "Windows Phone"],
    TVs: ["LG", "Samsung", "Sony", "Projectors"],
  },
  Fashion: {
    "Men's Fashion Advice": ["Formal", "Casual", "Business Casual"],
    "Men's Fashion Trends": ["Seasonal Trends", "Streetwear", "Minimalist"],
    "Men's Fragrances": ["Cologne", "Perfume", "Body Spray"],
    "Men's Hairstyles": ["Short", "Medium", "Long"],
    "Sneakers & Shoes": ["Sneakers", "Dress Shoes", "Boots"],
    Watches: ["Analog", "Digital", "Smartwatches"],
  },
  Rides: {
    Boats: ["Yachts", "Superyachts", "Sailing", "Jetskis", "Submarines"],
    Cars: [
      "Most Popular Car Brands",
      "Electric Vehicles",
      "SUVs",
      "Porsche",
      "Ford",
      "BMW",
      "Sports Cars",
      "Mercedes Benz",
      "Luxury",
      "Reviews",
    ],
    Cycling: [
      "Bicycles",
      "Electric Bikes",
      "Helmets",
      "Mountain Bikes",
      "Kickstarter",
      "Buyers Guides",
      "Best Electric Bikes",
    ],
    Flying: [
      "Planes",
      "Jets",
      "Electric Vehicles",
      "Space",
      "Travel",
      "Auctions",
    ],
    Motorcycles: [
      "Best Cafe Racers",
      "Fastest Motorcycles in the World",
      "Electric Motorcycles",
      "Harley Davidson",
      "Cafe Racers",
      "Triumph",
      "Vintage Helmets",
      "Motorcycle Backpacks",
    ],
  },

  Lifestyle: {
    Advice: [
      "Health",
      "Mental Health",
      "COVID-19",
      "Money",
      "Australia",
      "Work",
      "Productivity",
      "Investing",
      "Cryptocurrency",
    ],
    Drinks: ["Whisky", "Beer", "Wine", "Cocktails", "Bars"],
    Fitness: [
      "Workouts",
      "Shoulder Exercises",
      "Bicep Exercises",
      "Triceps Workouts",
      "Chest Workouts",
      "Forearm Workouts",
      "Strongest Celebrities in Hollywood",
      "How to Lose Weight Fast",
      "Celebrity Diet & Workout Plans",
      "Gyms",
      "Diet & Nutrition",
    ],
    Finance: [
      "Money",
      "Cryptocurrency",
      "Investing",
      "NFTs",
      "Australia",
      "Celebrities",
      "Elon Musk",
      "Net Worths",
      "Rich Lists",
    ],
    Food: [
      "Monday Munchies",
      "Restaurants",
      "Fast Food",
      "Sydney",
      "Melbourne",
      "Brisbane",
    ],
    Grooming: [
      "Skincare",
      "Razors",
      "Hair",
      "Beards",
      "Best Beard Oils",
      "Best Body Groomers",
      "Best Face Washes",
      "Men's Skincare Guide",
      "Best Skincare Products",
      "Beard Care Guide",
    ],
    "Sex & Dating": [
      "Best Sex Toys",
      "Best Tinder Bios for Guys",
      "How To Be Sexually Dominant",
      "A Guide to (Safe) Rough Sex",
      "How to Get a Sugar Momma",
      "Tinder Pick-Up Lines for Guys",
      "Best Sex Positions",
      "Best Dating Apps",
    ],
    Travel: [
      "Hotels",
      "Sydney  ",
      "Melbourne",
      "Best Hotels in the World",
      "Travel Gifts",
      "World's Best Rooftop Bars",
      "Skyscanner Alternatives",
      "Qantas",
    ],
  },
  Entertainment: {
    Art: ["NFTs", "Auctions", "Tattoos", "Collections", "Memes"],
    Books: [
      "Coffee Table Books",
      "Self-Help Books",
      "Cookbooks",
      "Best Kindles",
    ],
    Gaming: [
      "Top New Games",
      "Playstation",
      "Xbox",
      "PC",
      "Nintendo Switch",
      "LEGO",
      "Sony",
      "Reviews",
    ],
    "Movies & TV": [
      "Guide to Streaming Services",
      "New on Netflix",
      "New on Prime Video",
      "New on Disney+",
      "New on Stan Australia",
      "Best Action Movies",
      "Best Sci-Fi Movies",
      "Trailers",
      "Netflix",
      "Best Movies on Netflix",
      "Best Amazon Prime Movies",
      "Best Shows on Netflix",
      "Documentaries",
      "James Bond",
    ],
    Music: ["Guitars", "Festivals", "Hip Hop"],
    Sport: [
      "Golf",
      "NBA",
      "Football",
      "Boxing",
      "Tennis",
      "UFC",
      "AFL",
      "Formula 1",
    ],
  },
  Living: {
    Appliances: [
      "Vacuum Cleaners",
      "Coffee",
      "Kitchens",
      "Cooking",
      "Lighting",
      "Dyson",
      "Best Coffee Machines",
      "Best Air Fryers",
      "Best Robot Vacuums",
    ],
    Architecture: [
      "Homes",
      "Design",
      "Real Estate",
      "Interior Design",
      "Penthouses",
      "Celebrity Homes",
    ],
    Furniture: [
      "Desks",
      "IKEA",
      "Interior Design",
      "Homes",
      "Italian",
      "Chairs",
      "Office",
      "Tables",
      "Design",
      "Herman Miller",
    ],
    Homewares: [],
  },
  Outdoors: {
    Camping: [
      "Tents",
      "Campervans",
      "Knives",
      "Vehicles",
      "Australia",
      "4WD",
      "Fishing",
      "Kayaks",
      "Kickstarter",
    ],
    Snow: [
      "Skiing",
      "Snowboarding",
      "Cabins",
      "Best Ski Jackets",
      "Best Snow Goggles",
      "Best Ski Fields in New Zealand",
      "Winter Must Haves",
      "Best Australian Ski Fields",
    ],
    Surfing: [
      "Beaches",
      "Wetsuits",
      "Surfboards",
      "Best Wetsuit Tops",
      "Best Wetsuits for Surfing",
    ],
    Skate: [],
    Hiking: [],
  },
  News: [],
};

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
    const response = await axios.post("http://localhost:3000/api/scrape", {
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
    const blogs = await axios.post("http://localhost:3000/api/upload", {
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
    const res = await axios.post("http://localhost:3000/api/dbupload", {
      section,
      subsection: subSection,
      subsubsection: subSubSection,
      blogDetails: updatedBlog,
    });
    console.log("Upload Result", res);
  }

  async function handleimage(query: string) {
    const image = await axios.post("http://localhost:3000/api/image", {
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
