"use client";

import BlogList from "@/components/bloglist/BlogList";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Paginationblog from "@/components/pagination/Paginationblog";
import Sidebar from "@/components/sidebar/Sidebar";
import { Blogs } from "@prisma/client";
import axios from "axios";
import { stringify } from "querystring";
import { useEffect, useState } from "react";

interface params {
  params: {
    pageNo: Number;
  };
}
function BlogPage({ params }: params) {
  const [sidebar, SetSideBar] = useState(false);
  const [posts, setPosts] = useState<Blogs[]>([]);
  // const [pageNo, setPageNo] = useState("1");
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    if (params.pageNo) {
      console.log(params.pageNo.toString());
      fetchposts(params.pageNo.toString());
    } else {
      fetchposts("1");
    }
  }, [params.pageNo]);

  const fetchposts = async (pageNumber: string) => {
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
          <div className="mt-32 md:mt-22 lg:mt-13">
            <h1 className="text-center  text-lg font-semibold tracking-wider">
              The Latest News
            </h1>
            <BlogList posts={posts || []} />
            <Paginationblog
              pageNo={params.pageNo.toString()}
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
