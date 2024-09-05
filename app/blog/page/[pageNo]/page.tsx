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
async function BlogPage({ params }: params) {
  let sidebar = false;
  let posts: Blogs[] = [];
  // const [pageNo, setPageNo] = useState("1");
  let totalPages = 1;
  let hasNextPage = false;

  if (params.pageNo) {
    const response = await axios.get( `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs`, {
      params: {
        pageNo: params.pageNo.toString(),
      },
    });
    if (response.data) {
      posts = response.data.blogs;
      // setPageNo(pageNumber);
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
      // setPageNo(pageNumber);
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
    </>
  );
}

export default BlogPage;
