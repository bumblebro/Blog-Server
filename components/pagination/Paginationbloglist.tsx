"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  pageNo?: number;
  totalPages: number;
  hasNextPage: boolean;
  category: string;
  subCategory: string;
  subSubCategory: string;
  slug: string[];
}

function Paginationbloglist({
  pageNo = 1,
  totalPages,
  hasNextPage,
  slug,
}: Props) {
  let pathname = usePathname();
  const currentPage = pageNo;
  const getPages = () => {
    let start = 1;
    let end = start + 10;

    if (totalPages > 10) {
      if (parseInt(pageNo) % 10 == 0) {
        start = parseInt(pageNo);
      } else {
        let start = parseInt(pageNo) - (parseInt(pageNo) % 10);
      }
    }
    if (end > totalPages) {
      end = totalPages;
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPages();
  const slugPath = slug.join("/");
  console.log("paaaath", slugPath, slug);

  if (totalPages === 1) return null;

  return (
    <div>
      <nav className="flex justify-between items-center mb-10  px-4 mx-auto xl:max-w-[73rem]">
        <Link
          className={`flex justify-start font-medium ${
            currentPage == 1 && "invisible"
          }`}
          href={`/${slugPath}/page/${currentPage - 1}`}
        >
          <div className="bg-black text-white py-3 px-4 rounded-lg flex  items-center gap-2  md:px-8 tracking-widest">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>{" "}
            <p>Prev</p>
          </div>
        </Link>
        <div className="invisible md:visible md:w-[30%] flex justify-between">
          {pages.map((page, i) => {
            return (
              <Link key={i} href={`/${slugPath}/page/${page}`}>
                {page}
              </Link>
            );
          })}
        </div>

        <Link
          className={`flex justify-end font-medium ${
            !hasNextPage && "invisible"
          }`}
          href={`/${slugPath}/page/${currentPage + 1}`}
        >
          <div className="bg-black text-white py-3 px-4 rounded-lg flex  items-center gap-2 md:px-8 tracking-widest">
            <p>Next</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default Paginationbloglist;
