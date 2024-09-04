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

interface params {
  params: {
    slug: string[];
  };
}

async function BlogCategory({ params }: params) {
  let sidebar = false;
  let posts: Blogs[] = [];
  let relposts: Blogs[] = [];
  let totalPages = 1;
  let totalBlogs: number = 1;
  let hasNextPage = false;
  let pageNumber: number = 1;
  let currentPost: {
    id: string;
    author: string;
    title: string;
    imageurl: string;
    imagealt: string;
    quote: string;
    section: string;
    subsection: string;
    subsubsection: string;
    content: [];
    seo: {};
    creationDate: Date;
  } | null = null;
  let slugs: string[] = [];

  const handleChange = () => {
    sidebar = !sidebar;
  };

  let page = 1;

  let { slug } = params;
  let decodedslug = slug.map((item: string) => decodeURIComponent(item));
  console.log(`SLOGGGGGGGGG`, decodedslug);

  slugs = decodedslug;

  let pageIndex = decodedslug.indexOf("page");
  if (pageIndex !== -1 && pageIndex < decodedslug.length - 1) {
    // if (pageIndex !== -1 && decodedslug[decodedslug.length - 1] == "page") {
    pageNumber = parseInt(decodedslug[pageIndex + 1]);
    page = parseInt(decodedslug[pageIndex + 1]);
    decodedslug.splice(pageIndex, 2);
    slugs = decodedslug;
  }

  if (decodedslug.length === 0) {
  } else if (decodedslug.length === 1) {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer`,
      {
        params: {
          category: decodedslug[0],
          pageNo: page,
        },
      }
    );
    if (response.data) {
      posts = response.data.blogs;
      totalPages = response.data.metaData.totalPages;
      hasNextPage = response.data.metaData.hasNextPage;
      totalBlogs = response.data.metaData.totalBlogs;
    }
  } else if (decodedslug.length === 2) {
    console.log(`BINGO`, 2);
    let response = await axios.get( `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer`, {
      params: {
        subCategory: decodedslug[1],
        pageNo: page,
      },
    });
    if (response.data) {
      posts = response.data.blogs;
      totalPages = response.data.metaData.totalPages;
      hasNextPage = response.data.metaData.hasNextPage;
      totalBlogs = response.data.metaData.totalBlogs;
    }
  } else if (decodedslug.length === 3) {
    let response = await axios.get( `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer`, {
      params: {
        subSubCategory: decodedslug[2],
        pageNo: page,
      },
    });
    if (response.data) {
      posts = response.data.blogs;
      totalPages = response.data.metaData.totalPages;
      hasNextPage = response.data.metaData.hasNextPage;
      totalBlogs = response.data.metaData.totalBlogs;
    }
  } else if (decodedslug.length > 3) {
    let response = await axios.get( `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogpost`, {
      params: {
        title: decodedslug[decodedslug.length - 1],
      },
    });
    if (response.data) {
      currentPost = response.data;
    }
  }
  // ----------------------------

  if (currentPost?.subsubsection) {
    const response = await axios.get( `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer`, {
      params: {
        subsubsection: currentPost.subsubsection,
        pageNo: "1",
        pageSize: "10",
      },
    });
    if (response.data.blogs) {
      relposts = response.data.blogs;
    }
  } else if (currentPost?.subsection) {
    const response = await axios.get( `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer`, {
      params: {
        subsection: currentPost.subsection,
        pageNo: "1",
        pageSize: "10",
      },
    });
    if (response.data.blogs) {
      relposts = response.data.blogs;
    }
  } else if (currentPost?.section) {
    const response = await axios.get( `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer`, {
      params: {
        section: currentPost.section,
        pageNo: "1",
        pageSize: "10",
      },
    });
    if (response.data.blogs) {
      relposts = response.data.blogs;
    }
  }

  return (
    <>
      {currentPost ? (
        <>
          <CategoryPost decodedslug={slugs} totalBlogs={totalBlogs} />
          <BlogDisplay
            decodedslug={decodedslug}
            currentPost={currentPost || []}
            posts={relposts}
          />
        </>
      ) : (
        <>
          <Category decodedslug={slugs} totalBlogs={totalBlogs} />
          <BlogList posts={posts} />{" "}
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
