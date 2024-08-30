"use client";

import BlogList from "@/components/bloglist/BlogList";
import Category from "@/components/category/Category";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Paginationbloglist from "@/components/pagination/Paginationbloglist";
import Sidebar from "@/components/sidebar/Sidebar";
import { Blogs } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

function BlogCategory({ params }) {
  const [sidebar, SetSideBar] = useState(false);
  const [posts, setPosts] = useState<Blogs[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  let page = 1;

  const { slug } = params;
  const decodedslug = slug.map((item) => decodeURIComponent(item));

  useEffect(() => {
    async function run() {
      console.log("sluggggggg", decodedslug);
      // Determine if the URL includes a "page" segment
      const pageIndex = decodedslug.indexOf("page");
      if (pageIndex !== -1 && pageIndex < decodedslug.length - 1) {
        setPageNumber(parseInt(decodedslug[pageIndex + 1])); // Get the page number
        page = parseInt(decodedslug[pageIndex + 1]);
        decodedslug.splice(pageIndex, 2); // Remove "page" and the page number from the slug
      }

      if (decodedslug.length === 0) {
        // Fetch all blogs in the root category with pagination
        // blogs = await fetchBlogsByCategory("root", pageNumber);
      } else if (decodedslug.length === 1) {
        // Fetch blogs for the subcategory with pagination
        fetchBlogs({ category: decodedslug[0] });
      } else if (decodedslug.length === 2) {
        // Fetch blogs for the sub-subcategory with pagination
        fetchBlogs({ subCategory: decodedslug[1] });
      } else if (decodedslug.length === 3) {
        // Fetch blogs for the third level category with pagination
        fetchBlogs({ subSubCategory: decodedslug[2] });
      }
    }
    run();
  }, [slug]);

  async function fetchBlogs(params) {
    const response = await axios.get("/api/blogslayer", {
      params: {
        ...params,
        pageNo: page,
      },
    });
    console.log("Category Blog", response.data);

    if (response.data) {
      setPosts(response.data.blogs);
      // setPageNo(pageNumber);
      setTotalPages(response.data.metaData.totalPages);
      setHasNextPage(response.data.metaData.hasNextPage);
      setTotalBlogs(response.data.metaData.totalBlogs);
    }
  }

  return (
    <>
      <Navbar SetSideBar={SetSideBar} sidebar={sidebar} />
      {sidebar ? (
        <Sidebar />
      ) : (
        <>
          <Category decodedslug={decodedslug} totalBlogs={totalBlogs} />
          <div className=" px-4">
            {/* <h1 className="text-center  text-lg font-semibold">
              The Latest News
            </h1> */}
            <BlogList posts={posts || []} />
            <Paginationbloglist
              pageNo={pageNumber}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              slug={decodedslug}
            />
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default BlogCategory;
