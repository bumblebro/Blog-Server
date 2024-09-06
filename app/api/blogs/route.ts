import { PrismaClient } from "@prisma/client";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const pageSize = 12;
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageNo = parseInt(searchParams.get("pageNo") || "1");
    const take = pageSize;
    const skip = (pageNo - 1) * take;

    const blogs = await prisma.blogs.findMany({
      skip,
      take,
    });

    const totalBlogs = await prisma.blogs.count();
    return NextResponse.json({
      blogs: blogs,
      metaData: {
        hasNextPage: take + skip < totalBlogs,
        totalPages: Math.ceil(totalBlogs / take),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { "something went wrong": error },
      { status: 500 }
    );
  }
}
