import { useEffect, useState } from "react";
import { Blogs } from "@prisma/client";
import BlogList from "@/components/bloglist/BlogList";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/Footer";
import Paginationblog from "@/components/pagination/Paginationblog";
import GETBLOG from "../api/blogs/GETBLOG";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
    description:
      "Enjoy access to the complete Word of Many's archived articles—every post and every page we have ever published.",
  };
}

async function Blog({ searchParams }: { searchParams: { pageNo: string } }) {
  let sidebar = false;
  let posts: Blogs[] = [];
  let pageNo = "1";
  let totalPages = 1;
  let hasNextPage = false;

  if (searchParams.pageNo) {
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs?pageNo=${searchParams.pageNo}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    const response = await GETBLOG({ pageNo: searchParams.pageNo });

    // const response = await res.json();
    if (response) {
      posts = response.blogs;
      pageNo = searchParams.pageNo;
      totalPages = response.metaData.totalPages;
      hasNextPage = response.metaData.hasNextPage;
    }
  } else {
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs?pageNo=${"1"}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const response = await res.json();
    const response = await GETBLOG({ pageNo: "1" });

    if (response) {
      posts = response.blogs;
      pageNo = "1";
      totalPages = response.metaData.totalPages;
      hasNextPage = response.metaData.hasNextPage;
    }
  }

  return (
    <>
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
    </>
  );
}

export default Blog;
