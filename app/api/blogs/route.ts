import { PrismaClient } from "@prisma/client";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const pageSize = 24;
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageNo = parseInt(searchParams.get("pageNo") || "1");
    console.log("paaaaaaage", pageNo);
    const take = pageSize;
    const skip = (pageNo - 1) * take;

    const blogs = await prisma.blogs.findMany({
      skip,
      take,
    });

    const totalBlogs = await prisma.blogs.count();
    console.log({
      blogs: blogs,
      metaData: {
        hasNextPage: take + skip < totalBlogs,
        totalPages: Math.ceil(totalBlogs / take),
      },
    });
    return NextResponse.json({
      blogs: blogs,
      metaData: {
        hasNextPage: take + skip < totalBlogs,
        totalPages: Math.ceil(totalBlogs / take),
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { "something went wrong": error },
      { status: 500 }
    );
  }
}
