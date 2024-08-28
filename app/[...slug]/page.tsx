"use client";

import BlogList from "@/components/bloglist/BlogList";
import Category from "@/components/category/Category";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Pagination from "@/components/pagination/Pagination";
import Sidebar from "@/components/sidebar/Sidebar";
import { Blogs } from "@prisma/client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function BlogCategory({ params }) {
  const [sidebar, SetSideBar] = useState(false);
  const [posts, setPosts] = useState<Blogs[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [blogs, setBlogs] = useState();
  const [pageNumber, setPageNumber] = useState<Number>(1);
  const { slug } = params;

  console.log(slug);

  useEffect(() => {
    // Determine if the URL includes a "page" segment
    const pageIndex = slug.indexOf("page");
    if (pageIndex !== -1 && pageIndex < slug.length - 1) {
      setPageNumber(parseInt(slug[pageIndex + 1], 10)); // Get the page number
      console.log(pageNumber);
      slug.splice(pageIndex, 2); // Remove "page" and the page number from the slug
      console.log(slug);
    }

    if (slug.length === 0) {
      // Fetch all blogs in the root category with pagination
      // blogs = await fetchBlogsByCategory("root", pageNumber);
    } else if (slug.length === 1) {
      // Fetch blogs for the subcategory with pagination
      fetchBlogs({ category: slug[0] }, pageNumber);
    } else if (slug.length === 2) {
      // Fetch blogs for the sub-subcategory with pagination
      fetchBlogs({ subCategory: slug[1] }, pageNumber);
    } else if (slug.length === 3) {
      // Fetch blogs for the third level category with pagination
      fetchBlogs({ subSubCategory: slug[2] }, pageNumber);
    }
  }, [slug]);

  async function fetchBlogs(params, pageNumber) {
    const response = await axios.get("/api/blogslayer", {
      params: {
        ...params,
        pageNo: pageNumber,
      },
    });

    if (response.data) {
      console.log(response.data);
      setPosts(response.data.blogs);
      // setPageNo(pageNumber);
      setTotalPages(response.data.metaData.totalPages);
      setHasNextPage(response.data.metaData.hasNextPage);
    }
  }

  return (
    <>
      <Navbar SetSideBar={SetSideBar} sidebar={sidebar} />
      {sidebar ? (
        <Sidebar />
      ) : (
        <>
          <Category />
          <div className=" px-4">
            {/* <h1 className="text-center  text-lg font-semibold">
              The Latest News
            </h1> */}
            <BlogList posts={posts || []} />
            <Pagination
              pageNo={params.pageNo}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
            />
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default BlogCategory;
