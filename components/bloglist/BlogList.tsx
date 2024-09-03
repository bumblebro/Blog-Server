import Link from "next/link";
import { useEffect, useState } from "react";

function BlogList({ posts }) {
  useEffect(() => {
    console.log("blog", posts);
  }, [posts]);
  return (
    <div className="  mx-auto mb-10   w-full px-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4   xl:max-w-[73rem] mx-auto w-full lg:gap-x-5 xl:gap-y-14">
        {posts.map((item, index) => (
          <div key={index} className="pt-4 ">
            <Link
              href={`/${item.section !== "null" ? item.section + "/" : ""}${
                item.subsection !== "null" ? item.subsection + "/" : ""
              }${
                item.subsubsection !== "null" ? item.subsubsection + "/" : ""
              }${item.title}`}
            >
              {/* <img
                className="h-[75vw] object-cover w-full pb-4 lg:h-[12rem] xl:h-[14rem] md:h-[17rem]"
                src={
                  item.blogDetails[0].url
                    ? item.blogDetails[1].url
                      ? item.blogDetails[2].url
                        ? item.blogDetails[3].url
                        : item.blogDetails[2].url
                      : item.blogDetails[1].url
                    : item.blogDetails[0].url
                }
                alt=""
              /> */}

              <img
                className="h-[75vw] object-cover w-full pb-4 lg:h-[12rem] xl:h-[13rem] md:h-[17rem] sm:h-[29rem]"
                src={item.imageurl}
                alt=""
              />
            </Link>
            <Link
              href={`/${item.section !== "null" ? item.section + "/" : ""}${
                item.subsection !== "null" ? item.subsection + "/" : ""
              }${
                item.subsubsection !== "null" ? item.subsubsection + "/" : ""
              }`}
            >
              <h1 className="text-sm text-blue-600 font-semibold pb-2 tracking-wider">
                {item.subsection}
              </h1>
            </Link>

            <Link
              href={`/${item.section !== "null" ? item.section + "/" : ""}${
                item.subsection !== "null" ? item.subsection + "/" : ""
              }${
                item.subsubsection !== "null" ? item.subsubsection + "/" : ""
              }${item.title}`}
            >
              <h2 className="font-semibold">{item.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
