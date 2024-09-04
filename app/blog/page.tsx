import axios from "axios";
import { useEffect, useState } from "react";
import { Blogs } from "@prisma/client";
import BlogList from "@/components/bloglist/BlogList";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/Footer";
import Paginationblog from "@/components/pagination/Paginationblog";

async function Blog({ searchParams }: { searchParams: { pageNo: string } }) {
  let sidebar = false;
  let posts: Blogs[] = [];
  let pageNo = "1";
  let totalPages = 1;
  let hasNextPage = false;

  if (searchParams.pageNo) {
    const response = await axios.get( `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs`, {
      params: {
        pageNo: searchParams.pageNo,
      },
    });
    if (response.data) {
      posts = response.data.blogs;
      pageNo = searchParams.pageNo;
      totalPages = response.data.metaData.totalPages;
      hasNextPage = response.data.metaData.hasNextPage;
    }
  } else {
    const response = await axios.get( `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs`, {
      params: {
        pageNo: "1",
      },
    });
    if (response.data) {
      posts = response.data.blogs;
      pageNo = "1";
      totalPages = response.data.metaData.totalPages;
      hasNextPage = response.data.metaData.hasNextPage;
    }
  }

  return (
    <>
      {/* <Navbar SetSideBar={SetSideBar} sidebar={sidebar} /> */}
      {sidebar ? (
        <Sidebar />
      ) : (
        <>
          <div className="mt-28 px-4">
            <h1 className="text-center  text-lg font-semibold ">
              The Latest News
            </h1>
            <BlogList posts={posts || []} />
            <Paginationblog
              pageNo={pageNo}
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

export default Blog;
