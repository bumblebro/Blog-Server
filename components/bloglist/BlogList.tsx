import Link from "next/link";
import { useEffect, useState } from "react";

function BlogList({ posts, decodedslug }) {
  return (
    <div className="  mx-auto mb-10   w-full px-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4   xl:max-w-[73rem] mx-auto w-full">
        {posts.map((item, index) => (
          <div key={index} className="pt-4 ">
            <Link
              href={`/${item.section !== "null" ? item.section + "/" : ""}${
                item.subsection !== "null" ? item.subsection + "/" : ""
              }${
                item.subsubsection !== "null" ? item.subsubsection + "/" : ""
              }${item.blogDetails[0].title}`}
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
                className="h-[75vw] object-cover w-full pb-4 lg:h-[12rem] xl:h-[14rem] md:h-[17rem]"
                src={item.blogDetails[0].url}
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
              <h1 className="text-md text-blue-600 font-semibold pb-2">
                {item.subsection}
              </h1>
            </Link>

            <Link
              href={`/${item.section !== "null" ? item.section + "/" : ""}${
                item.subsection !== "null" ? item.subsection + "/" : ""
              }${
                item.subsubsection !== "null" ? item.subsubsection + "/" : ""
              }${item.blogDetails[0].title}`}
            >
              <h2 className="font-semibold">{item.blogDetails[0].title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
