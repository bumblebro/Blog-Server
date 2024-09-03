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

  let page = 1;

  let { slug } = params;
  let decodedslug = slug.map((item: string) => decodeURIComponent(item));

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
    let response = await axios.get("http://localhost:3000/api/blogslayer", {
      params: {
        category: decodedslug[0],
        pageNo: page,
      },
    });
    console.log("Category Blog", response.data);

    if (response.data) {
      posts: response.data.blogs;
      totalPages = response.data.metaData.totalPages;
      hasNextPage = response.data.metaData.hasNextPage;
      totalBlogs = response.data.metaData.totalBlogs;
    }
  } else if (decodedslug.length === 2) {
    let response = await axios.get("http://localhost:3000/api/blogslayer", {
      params: {
        subCategory: decodedslug[1],
        pageNo: page,
      },
    });
    console.log("Category Blog", response.data);

    if (response.data) {
      posts: response.data.blogs;
      totalPages = response.data.metaData.totalPages;
      hasNextPage = response.data.metaData.hasNextPage;
      totalBlogs = response.data.metaData.totalBlogs;
    }
  } else if (decodedslug.length === 3) {
    let response = await axios.get("http://localhost:3000/api/blogslayer", {
      params: {
        subSubCategory: decodedslug[2],
        pageNo: page,
      },
    });
    console.log("Category Blog", response.data);

    if (response.data) {
      posts: response.data.blogs;
      totalPages = response.data.metaData.totalPages;
      hasNextPage = response.data.metaData.hasNextPage;
      totalBlogs = response.data.metaData.totalBlogs;
    }
  } else if (decodedslug.length > 3) {
    let response = await axios.get("http://localhost:3000/api/blogpost", {
      params: {
        title: decodedslug[decodedslug.length - 1],
      },
    });
    console.log(`res`, response);
    if (response.data) {
      currentPost = response.data;
    }
  }

  console.log(`runinggggg`, currentPost);
  console.log(`weewcwecwecPPPPPPPP`, currentPost?.subsubsection);
  // ----------------------------

  if (currentPost?.subsubsection) {
    const response = await axios.get("http://localhost:3000/api/blogslayer", {
      params: {
        subsubsection: currentPost.subsubsection,
        pageNo: "1",
        pageSize: "10",
      },
    });
    if (response.data.blogs) {
      console.log(`RRRRRRRRR`, response.data.blogs);
      relposts = response.data.blogs;
    }
  } else if (currentPost?.subsection) {
    const response = await axios.get("http://localhost:3000/api/blogslayer", {
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
    const response = await axios.get("http://localhost:3000/api/blogslayer", {
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
      {/* <Navbar SetSideBar={SetSideBar} sidebar={sidebar} /> */}
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
                posts={relposts}
              />
            </>
          ) : (
            <>
              <Category decodedslug={slugs} totalBlogs={totalBlogs} />
              <BlogList posts={posts} />
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
