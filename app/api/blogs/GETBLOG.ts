import { PrismaClient } from "@prisma/client";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const pageSize = 8;

export default async function GETBLOG({ pageNo }: { pageNo: string }) {
  console.log(`BOOOOOOOOOO`, pageNo);
  // const { searchParams } = new URL(req.url);
  const pageNum = parseInt(pageNo || "1");
  const take = pageSize;
  const skip = (pageNum - 1) * take;

  const blogs = await prisma.blogs.findMany({
    skip,
    take,
  });

  const totalBlogs = await prisma.blogs.count();
  return {
    blogs: blogs,
    metaData: {
      hasNextPage: take + skip < totalBlogs,
      totalPages: Math.ceil(totalBlogs / take),
    },
  };
}
