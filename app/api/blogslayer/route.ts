import { Prisma, PrismaClient } from "@prisma/client";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const subSubCategory = searchParams.get("subSubCategory");
    const pageSize = parseInt(searchParams.get("pageSize") || "8");
    const pageNo = parseInt(searchParams.get("pageNo") || "1");
    const take = pageSize;
    const skip = (pageNo - 1) * take;

    const whereClause: Prisma.BlogsWhereInput = {};

    if (category) {
      whereClause.section = {
        contains: category,
        mode: "insensitive",
      };

    }

    if (subCategory) {
      whereClause.subsection = {
        contains: subCategory,
        mode: "insensitive",
      };
    }

    if (subSubCategory) {
      whereClause.subsubsection = {
        contains: subSubCategory,
        mode: "insensitive",
      };
    }

    const blogs = await prisma.blogs.findMany({
      skip, // Number of records to skip
      take, // Number of records to take
      where: whereClause,
    });

    const totalBlogs = await prisma.blogs.count({
      where: whereClause,
    });
    return NextResponse.json({
      blogs: blogs,
      metaData: {
        hasNextPage: take + skip < totalBlogs,
        totalPages: Math.ceil(totalBlogs / take),
        totalBlogs,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { "something went wrong": error },
      { status: 500 }
    );
  }
}
