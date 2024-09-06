import BlogDisplay from "@/components/BlogDisplay/BlogDisplay";
import BlogList from "@/components/bloglist/BlogList";
import Category from "@/components/category/Category";
import CategoryPost from "@/components/category/CategoryPost";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Paginationbloglist from "@/components/pagination/Paginationbloglist";
import Sidebar from "@/components/sidebar/Sidebar";
import Delay from "@/libs/Delay";
import { Blogs } from "@prisma/client";
import { Metadata } from "next";
import { useEffect, useState } from "react";

interface params {
  params: {
    slug: string[];
  };
}

interface JsonValue {
  [key: string]: any;
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogsall`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { blogs } = await response.json(); // Parse the JSON response

    return blogs?.map((item: Blogs) => ({
      slug: [
        item.section,
        item.subsection,
        item.subsubsection,
        encodeURIComponent(item.title),
      ],
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function generateMetadata({ params }: params): Promise<Metadata> {
  // await Delay();
  let pageNumber: number = 1;
  let slugs: string[] = [];

  let { slug } = params;
  let decodedslug = slug.map((item: string) => decodeURIComponent(item));
  let pageIndex = decodedslug.indexOf("page");
  let page = 1;
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
    content: JsonValue[];
    seo: JsonValue;
    creationDate: Date;
  } | null = null;

  if (pageIndex !== -1 && pageIndex < decodedslug.length - 1) {
    // if (pageIndex !== -1 && decodedslug[decodedslug.length - 1] == "page") {
    pageNumber = parseInt(decodedslug[pageIndex + 1]);
    page = parseInt(decodedslug[pageIndex + 1]);
    decodedslug.splice(pageIndex, 2);
    slugs = decodedslug;
  }

  if (decodedslug.length > 3) {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogpost?title=${
        decodedslug[decodedslug.length - 1]
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      currentPost = await response.json();
    }
  }
  return {
    title: currentPost?.title,
    description: currentPost?.seo?.ogDescription,
    openGraph: {
      images: [
        {
          url: currentPost?.imageurl || "",
        },
      ],
    },
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
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer?category=${decodedslug[0]}&pageNo=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    if (res.ok) {
      posts = response.blogs;
      totalPages = response.metaData.totalPages;
      hasNextPage = response.metaData.hasNextPage;
      totalBlogs = response.metaData.totalBlogs;
    }
  } else if (decodedslug.length === 2) {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer?subCategory=${decodedslug[1]}&pageNo=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    if (res.ok) {
      posts = response.blogs;
      totalPages = response.metaData.totalPages;
      hasNextPage = response.metaData.hasNextPage;
      totalBlogs = response.metaData.totalBlogs;
    }
  } else if (decodedslug.length === 3) {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer?subSubCategory=${decodedslug[2]}&pageNo=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();

    if (res.ok) {
      posts = response.blogs;
      totalPages = response.metaData.totalPages;
      hasNextPage = response.metaData.hasNextPage;
      totalBlogs = response.metaData.totalBlogs;
    }
  } else if (decodedslug.length > 3) {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogpost?title=${
        decodedslug[decodedslug.length - 1]
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();

    if (res.ok) {
      currentPost = response;
    }
  }
  // ----------------------------

  if (currentPost?.subsubsection) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer?subsubsection=${
        currentPost.subsubsection
      }&pageNo=${"1"}&pageSize=${"20"}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();

    if (res.ok) {
      relposts = response.blogs;
    }
  } else if (currentPost?.subsection) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer?subsection=${
        currentPost.subsection
      }&pageNo=${"1"}&pageSize=${"20"}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();

    if (res.ok) {
      relposts = response.blogs;
    }
  } else if (currentPost?.section) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogslayer?section=${
        currentPost.section
      }&pageNo=${"1"}&pageSize=${"20"}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();

    if (res.ok) {
      relposts = response.blogs;
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
    </>
  );
}

export default BlogCategory;
