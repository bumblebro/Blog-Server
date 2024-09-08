import BlogList from "@/components/bloglist/BlogList";
import Category from "@/components/category/Category";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Paginationblog from "@/components/pagination/Paginationblog";
import Sidebar from "@/components/sidebar/Sidebar";
import { Blogs } from "@prisma/client";
import GETBLOG from "./api/blogs/GETBLOG";
import FeaturedPost from "@/components/featuredPost/FeaturedPost";

async function Home({ searchParams }: { searchParams: { pageNo: string } }) {
  let sidebar = false;
  let posts: Blogs[] = [];
  let pageNo = "1";
  let totalPages = 1;
  let hasNextPage = false;

  // if (searchParams.pageNo) {
  // let res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs?pageNo=${searchParams.pageNo}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const response = await res.json();
  //   const response = await GETBLOG({
  //     pageNo: searchParams.pageNo,
  //   });
  //   if (response) {
  //     posts = response.blogs;
  //     pageNo = searchParams.pageNo;
  //     totalPages = response.metaData.totalPages;
  //     hasNextPage = response.metaData.hasNextPage;
  //   }
  // } else {
  // let res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs?${"1"}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const response = await res.json();

  // if (res.ok) {
  //   posts = response.blogs;
  //   pageNo = "1";
  //   totalPages = response.metaData.totalPages;
  //   hasNextPage = response.metaData.hasNextPage;
  // }
  const response = await GETBLOG({ pageNo: "1" });
  if (response) {
    posts = response.blogs;
    pageNo = "1";
    totalPages = response.metaData.totalPages;
    hasNextPage = response.metaData.hasNextPage;
  }
  // }

  return (
    <>
      {/* <Navbar SetSideBar={SetSideBar} sidebar={sidebar} /> */}
      {sidebar ? (
        <Sidebar />
      ) : (
        <>
          <FeaturedPost posts={posts || []} />
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
        </>
      )}
    </>
  );
}

export default Home;
