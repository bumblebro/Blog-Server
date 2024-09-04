import BlogList from "@/components/bloglist/BlogList";
import Category from "@/components/category/Category";
import Footer from "@/components/footer/Footer";
import FeaturedPost from "@/components/homepage/FeaturedPost";
import Navbar from "@/components/navbar/Navbar";
import Paginationblog from "@/components/pagination/Paginationblog";
import Sidebar from "@/components/sidebar/Sidebar";
import { Blogs } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

async function Home({ searchParams }: { searchParams: { pageNo: string } }) {
  let sidebar = false;
  let posts: Blogs[] = [];
  let pageNo = "1";
  let totalPages = 1;
  let hasNextPage = false;

  if (searchParams.pageNo) {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs`,
      {
        params: {
          pageNo: searchParams.pageNo,
        },
      }
    );
    console.log(response.data.blogs);
    if (response.data) {
      posts = response.data.blogs;
      pageNo = searchParams.pageNo;
      totalPages = response.data.metaData.totalPages;
      hasNextPage = response.data.metaData.hasNextPage;
    }
  } else {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs`,
      {
        params: {
          pageNo: "1",
        },
      }
    );
    console.log(response.data.blogs);
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
          <FeaturedPost />
          <div className="mt-32 md:mt-10 lg:mt-8 ">
            <h1 className="text-center  text-lg font-semibold tracking-wider">
              The Latest News
            </h1>
            <BlogList posts={posts || []} />
            <Paginationblog
              pageNo={pageNo}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
            />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
