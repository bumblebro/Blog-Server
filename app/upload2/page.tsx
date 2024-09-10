"use client";

import { subSections } from "@/libs/Section";
import axios from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import slugify from "slugify";

function Upload2() {
  const [isRunning, setIsRunning] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  async function getRandomPath(subSections: any) {
    const firstLevel = Object.keys(subSections);
    const randomFirstLevel =
      firstLevel[Math.floor(Math.random() * firstLevel.length)];
    const secondLevel = Object.keys(subSections[randomFirstLevel]);
    const randomSecondLevel =
      secondLevel[Math.floor(Math.random() * secondLevel.length)];
    const thirdLevel = subSections[randomFirstLevel][randomSecondLevel];
    const randomThirdLevel =
      thirdLevel[Math.floor(Math.random() * thirdLevel.length)];
    return [randomFirstLevel, randomSecondLevel, randomThirdLevel];
  }

  const searchImages = async (query: string) => {
    const response = await axios.post("/api/scrape", {
      query,
    });
    return response.data.results.url;
  };

  async function startProcess() {
    try {
      const path = await getRandomPath(subSections);
      console.log(`STARTED`);
      console.log(`section : `, path[0]);
      console.log(`subSection : `, path[1]);
      console.log(`subSubSection : `, path[2]);
      console.log(`GETTING BLOG...`);
      const blogs = await axios.post("/api/upload", {
        section: path[0],
        subSection: path[1],
        subSubSection: path[2],
      });
      const data = await blogs.data;
      const covertedBlog = await JSON.parse(data);
      console.log(`GOT BLOG`, covertedBlog);
      console.log(`GETTING IMAGE FOR MAIN TITLE...`);

      if (
        covertedBlog.imageQuery == null ||
        covertedBlog.imageQuery == "null"
      ) {
        console.log(`GETTING IMAGE FOR MAIN TITLE FAILED`);
        setFailedCount((prev) => prev + 1);
        console.log(`RETRYING...`);
        startProcess();
        return;
      }
      const link = await searchImages(covertedBlog.imageQuery);
      console.log(`GETTING IMAGE FOR MAIN TITLE SUCCESSFULL`);

      console.log(`GETTING IMAGES FOR CONTENT...`);

      const results = await Promise.all(
        covertedBlog.content.map(
          async (item: {
            query: string;
            title: string;
            description: string;
          }) => {
            let link;
            if (item.query == null) {
              link = "null";
            } else {
              link = await searchImages(item.query);
            }
            console.log("IMAGE GENERATED", link);
            return {
              title: item.title,
              description: item.description,
              url: link,
              alt: item.query,
            };
          }
        )
      );
      console.log(`GETTING IMAGES FOR CONTENT SUCCESSFULL`);
      console.log(`BLOG UPLOAD START...`);

      if (
        (path[0],
        covertedBlog.pageTitle,
        covertedBlog.imageQuery,
        link,
        path[1],
        path[2],
        results,
        covertedBlog.author,
        covertedBlog.quote,
        covertedBlog.seo)
      ) {
        const res = await axios.post("/api/dbupload", {
          section: path[0],
          title: slugify(covertedBlog.pageTitle),
          imagealt: covertedBlog.imageQuery,
          imageurl: link,
          subsection: path[1],
          subsubsection: path[2],
          content: results,
          author: covertedBlog.author,
          quote: covertedBlog.quote,
          seo: covertedBlog.seo,
          slug: `${path[0]}/${path[1]}/${path[2]}/${slugify(
            covertedBlog.pageTitle
          )}`,
        });
        if (res.status) {
          console.log("UPLOAD SUCCESSFULL", res.data, "STARTING NEXT CYCLE...");
          setSuccessCount((prev) => prev + 1);
          startProcess(); // Continue the process if running
        } else {
          console.error("UPLOAD FAILED, RETRYING...");
          setFailedCount((prev) => prev + 1);
          startProcess(); // Retry if failed
        }
      }
    } catch (error) {
      console.error("ERROR OCCURED, RETRYING...");
      setFailedCount((prev) => prev + 1);
      startProcess(); // Handle errors and retry
    }
  }

  const startRunning = () => {
    setIsRunning(true);
    startProcess(); // Start the process immediately when the button is clicked
  };

  // Stop the process
  const stopRunning = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    // Cleanup when the component unmounts or stops
    return () => {
      setIsRunning(false);
    };
  }, []);

  return (
    <div className="w-7/12 flex flex-col mx-auto my-52 ">
      {/* <div>
        {updatedBlog.map((item, index) => (
          <div key={index} className="flex flex-col gap-5 pb-5">
            <h1 className="text-2xl font-bold">{item?.title}</h1>
            <h2 className="text-[#505050]">{item?.description}</h2>{" "}
            {item.url !== "null" && (
              <img className="h-96 object-cover" src={item.url} alt="" />
            )}
          </div>
        ))}
      </div> */}

      <div>
        <h1 className="bg-green-500">SUCCESS: {successCount}</h1>
        <h1 className="bg-red-500">FAILED: {failedCount}</h1>
        <button onClick={startRunning} disabled={isRunning}>
          Start
        </button>
        {/* <button onClick={stopRunning} disabled={!isRunning}>
          Stop
        </button> */}
      </div>
    </div>
  );
}

export default Upload2;
