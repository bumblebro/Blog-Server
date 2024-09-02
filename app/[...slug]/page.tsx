"use client";

import BlogDisplay from "@/components/BlogDisplay/BlogDisplay";
import BlogList from "@/components/bloglist/BlogList";
import Category from "@/components/category/Category";
import CategoryPost from "@/components/category/CategoryPost";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Paginationbloglist from "@/components/pagination/Paginationbloglist";
import Sidebar from "@/components/sidebar/Sidebar";
import { Blogs } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

function BlogCategory({ params }) {
  const [sidebar, SetSideBar] = useState(false);
  const [posts, setPosts] = useState<Blogs[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [currentPost, setCurrentPost] = useState<Blogs | null>(null);
  const [slugs, SetSlugs] = useState([]);

  let page = 1;

  const { slug } = params;
  const decodedslug = slug.map((item) => decodeURIComponent(item));

  useEffect(() => {
    SetSlugs(decodedslug);
    async function run() {
      const pageIndex = decodedslug.indexOf("page");
      console.log("OUTPUTTTTTTTT", decodedslug);
      console.log("OUTPUTTTTTTTT", pageIndex);
      console.log(pageIndex < decodedslug.length - 1);
      console.log("before");
      console.log(decodedslug);
      if (pageIndex !== -1 && pageIndex < decodedslug.length - 1) {
        // if (pageIndex !== -1 && decodedslug[decodedslug.length - 1] == "page") {
        setPageNumber(parseInt(decodedslug[pageIndex + 1]));
        page = parseInt(decodedslug[pageIndex + 1]);
        decodedslug.splice(pageIndex, 2);
        SetSlugs(decodedslug);
      }
      console.log("after");
      console.log(decodedslug);

      if (decodedslug.length === 0) {
      } else if (decodedslug.length === 1) {
        fetchBlogs({ category: decodedslug[0] });
      } else if (decodedslug.length === 2) {
        fetchBlogs({ subCategory: decodedslug[1] });
      } else if (decodedslug.length === 3) {
        fetchBlogs({ subSubCategory: decodedslug[2] });
      } else if (decodedslug.length > 3) {
        fetchBlogPost(decodedslug[decodedslug.length - 1]);
      }
    }
    run();
  }, [params]);

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

  async function fetchBlogPost(params) {
    try {
      const response = await axios.get("/api/blogpost", {
        params: {
          title: params,
        },
      });

      if (response.data) {
        setCurrentPost(response.data);
      }
    } catch (error) {
      console.log("Error getting perticular blog", error);
    }
  }

  return (
    <>
      <Navbar SetSideBar={SetSideBar} sidebar={sidebar} />
      {sidebar ? (
        <Sidebar />
      ) : (
        <>
          {currentPost ? (
            <>
              <CategoryPost decodedslug={slugs} totalBlogs={totalBlogs} />
              <BlogDisplay
                decodedslug={decodedslug}
                currentPost={currentPost || []}
              />
            </>
          ) : (
            <>
              <Category decodedslug={slugs} totalBlogs={totalBlogs} />
              <BlogList decodedslug={decodedslug} posts={posts || []} />
            </>
          )}
          <Paginationbloglist
            pageNo={pageNumber}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            slug={slugs}
          />
        </>
      )}
      <Footer />
    </>
  );
}

export default BlogCategory;
