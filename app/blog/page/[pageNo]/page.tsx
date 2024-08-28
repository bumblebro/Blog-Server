"use client";

import BlogList from "@/components/bloglist/BlogList";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Pagination from "@/components/pagination/Pagination";
import Sidebar from "@/components/sidebar/Sidebar";
import { Blogs } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

function BlogPage({ params }) {
  const [sidebar, SetSideBar] = useState(false);
  const [posts, setPosts] = useState<Blogs[]>([]);
  // const [pageNo, setPageNo] = useState("1");
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    if (params.pageNo) {
      console.log(params.pageNo);
      fetchposts(params.pageNo);
    } else {
      fetchposts("1");
    }
  }, [params.pageNo]);

  const fetchposts = async (pageNumber) => {
    const response = await axios.get("/api/blogs", {
      params: {
        pageNo: pageNumber,
      },
    });
    if (response.data) {
      setPosts(response.data.blogs);
      // setPageNo(pageNumber);
      setTotalPages(response.data.metaData.totalPages);
      setHasNextPage(response.data.metaData.hasNextPage);
    }
  };

  return (
    <>
      <Navbar SetSideBar={SetSideBar} sidebar={sidebar} />
      {sidebar ? (
        <Sidebar />
      ) : (
        <>
          <div className="mt-28 px-4">
            <h1 className="text-center  text-lg font-semibold tracking-wider">
              The Latest News
            </h1>
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

export default BlogPage;
