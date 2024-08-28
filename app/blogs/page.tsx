"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Blogs } from "@prisma/client";
import Pagination from "@/components/pagination/Pagination";
import BlogList from "@/components/bloglist/BlogList";
import Navbar from "@/components/navbar/Navbar";

function LatestPost({ searchParams }: { searchParams: { pageNo: string } }) {
  const [posts, setPosts] = useState<Blogs[]>([]);
  const [pageNo, setPageNo] = useState("1");
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    if (searchParams.pageNo) {
      fetchposts(searchParams.pageNo);
    } else {
      fetchposts("1");
    }
  }, [searchParams]);

  const fetchposts = async (pageNumber: string) => {
    const response = await axios.get("/api/blogs", {
      params: {
        pageNo: pageNumber,
      },
    });
    if (response.data) {
      setPosts(response.data.blogs);
      setPageNo(pageNumber);
      setTotalPages(response.data.metaData.totalPages);
      setHasNextPage(response.data.metaData.hasNextPage);
    }
  };

  return (
    <>
      <div className="mt-28 px-4">
        <h1 className="text-center  text-lg font-semibold">The Latest News</h1>
        <BlogList posts={posts || []} />
        <Pagination
          pageNo={pageNo}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
        />
      </div>
    </>
  );
}

export default LatestPost;
