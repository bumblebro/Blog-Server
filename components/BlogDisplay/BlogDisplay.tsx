"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function BlogDisplay({ decodedslug, currentPost }) {
  const [posts, setPosts] = useState();
  const date = new Date(currentPost.creationDate);

  const options = { day: "2-digit", month: "short", year: "numeric" };

  useEffect(() => {
    console.log("POST", currentPost);
  }, []);

  async function fetchBlogs(params) {
    const response = await axios.get("/api/blogslayer", {
      params: {
        ...params,
        pageNo: "1",
        pageSize: "10",
      },
    });
    console.log("Dinda Blog", response.data.blogs);

    if (response.data.blogs) {
      setPosts(response.data.blogs);
    }
  }

  useEffect(() => {
    if (currentPost?.subsubsection) {
      fetchBlogs({ subsubsection: currentPost.subsubsection });
      return;
    } else if (currentPost?.subsection) {
      fetchBlogs({ subsection: currentPost.subsection });
      return;
    } else if (currentPost?.section) {
      fetchBlogs({ section: currentPost.section });
      return;
    }
  }, []);

  return (
    <div className=" xl:max-w-[73rem] mx-auto  mb-10 md:grid md:grid-cols-[56.7%_auto] lg:grid-cols-[67.5%_auto] xl:grid-cols-[74.25%_auto] xl:gap-2 2xl:grid-cols-[71.5%_auto]">
      {" "}
      <div>
        <div>
          <img
            className="px-4 pb-4 h-[17rem] object-cover  md:h-[21rem] lg:h-[31.5rem] xl:h-[39.5rem] 2xl:h-[38rem] w-full sm:h-[29.5rem] xl:px-0"
            src={currentPost.imageurl}
            alt=""
          />
          <h1 className="font-semibold  mx-4 pb-2 text-sm tracking-wider text-[#004ff2] hidden md:flex xl:mx-0">
            {decodedslug[decodedslug.length - 2]}
          </h1>
          <h1 className="text-2xl mx-4 xl:mx-0  font-semibold border-b-[0.1px] pb-4 mb-6 border-gray-500  capitalize sm:text-[25px] md:text-[30px] lg:text-[32px] xl:pb-6">
            {decodedslug[decodedslug.length - 1]}
          </h1>{" "}
          <div className="lg:flex lg:pb-4">
            <div className="mx-4 text-xs tracking-wider flex flex-col gap-2 pb-4 xl:mx-0">
              <h1 className="font-semibold">
                By <span className="underline ">{currentPost.author}</span>
              </h1>
              <h2 className=" font-normal text-gray-600">
                Published: {date.toLocaleDateString("en-GB", options)}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider mb-4 px-4 lg:w-[45%] lg:ml-auto xl:px-0 2xl:w-[40%]">
              <button
                className="uppercase flex justify-center items-center bg-[#ee5631]  rounded-md py-[0.6rem] w-full gap-2  "
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
                <h1> Copy Link</h1>
              </button>
              <button
                className="uppercase flex justify-center items-center border-[#ee5631] border-solid border-2 rounded-md py-[0.5rem] gap-2 w-full "
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>{" "}
                <h1> Share</h1>
              </button>
            </div>
          </div>
        </div>
        {currentPost.content?.map((item, i) => {
          return (
            <div key={i} className="flex flex-col  pb-8 px-4 xl:px-0">
              {/* <h1
                className={`${
                  i == 0 && "hidden"
                } text-[18.72px] pb-6 font-semibold `}
              > */}
              <h1
                className={`${
                  item.title == "Introduction" && "hidden"
                } text-[18.72px] pb-6 font-semibold `}
              >
                {item.title}
              </h1>
              {item.url == "null" ? null : (
                <div className="mb-4 flex flex-col gap-2">
                  <img
                    className="h-[17rem] object-cover  md:h-[21rem] lg:h-[31.5rem] xl:h-[39.5rem] sm:h-[28.5rem] 2xl:h-[38rem]"
                    src={item.url}
                    alt=""
                  />
                  <p className="text-gray-500 font-light text-sm">
                    {item.alt} | Image: Supplied
                  </p>
                </div>
              )}
              <h1 className="leading-7 font-normal text-[#030303]">
                {item.description}
              </h1>
            </div>
          );
        })}
      </div>
      <div className="bg-[#eeeff1] py-8 px-4 md:bg-[#ffffff]">
        <h1 className="text-lg font-semibold text-center pb-4">
          Related Stories
        </h1>
        <div className="flex flex-col gap-4">
          {posts?.map((item, i) => {
            return (
              <div key={i} className="grid grid-cols-[100px_auto] gap-4">
                <Link
                  href={`/${item.section !== "null" ? item.section + "/" : ""}${
                    item.subsection !== "null" ? item.subsection + "/" : ""
                  }${
                    item.subsubsection !== "null"
                      ? item.subsubsection + "/"
                      : ""
                  }${item.title}`}
                >
                  <img
                    className="object-cover w-full h-[75px]"
                    src={item.imageurl}
                    alt=""
                  />
                </Link>
                <div className="flex flex-col gap-2 ">
                  {item.subsubsection ? (
                    <Link
                      href={`/${
                        item.section !== "null" ? item.section + "/" : ""
                      }${
                        item.subsection !== "null" ? item.subsection + "/" : ""
                      }${
                        item.subsubsection !== "null"
                          ? item.subsubsection + "/"
                          : ""
                      }`}
                    >
                      {" "}
                      <h1 className="text-xs text-[#1750d3] font-semibold tracking-wider">
                        {item.subsubsection}
                      </h1>
                    </Link>
                  ) : item.subsection ? (
                    <Link
                      href={`/${
                        item.section !== "null" ? item.section + "/" : ""
                      }${
                        item.subsection !== "null" ? item.subsection + "/" : ""
                      }`}
                    >
                      <h1 className="text-xs text-[#1e50ce] font-semibold tracking-wider">
                        {item.subsection}
                      </h1>
                    </Link>
                  ) : (
                    <Link
                      href={`/${
                        item.section !== "null" ? item.section + "/" : ""
                      }`}
                    >
                      {" "}
                      <h1 className="text-xs text-[#1e50ce] font-semibold tracking-wider">
                        {item.section}
                      </h1>
                    </Link>
                  )}{" "}
                  <Link
                    href={`/${
                      item.section !== "null" ? item.section + "/" : ""
                    }${
                      item.subsection !== "null" ? item.subsection + "/" : ""
                    }${
                      item.subsubsection !== "null"
                        ? item.subsubsection + "/"
                        : ""
                    }${item.title}`}
                  >
                    <h1 className="text-sm font-semibold">{item.title}</h1>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogDisplay;
