import { PrismaClient } from "@prisma/client";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const pageSize = 8;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const subSubCategory = searchParams.get("subSubCategory");

    console.log(searchParams);
    const pageNo = parseInt(searchParams.get("pageNo") || "1");
    console.log("paaaaaaage", pageNo);
    const take = pageSize;
    const skip = (pageNo - 1) * take;
    console.log(skip);

    const whereClause = {};

    if (category) {
      whereClause.section = {
        contains: category,
        mode: "insensitive",
      };

      console.log(whereClause);
    }

    if (subCategory) {
      whereClause.subsection = {
        contains: subCategory,
        mode: "insensitive",
      };
      console.log(whereClause);
    }

    if (subSubCategory) {
      whereClause.subsubsection = {
        contains: subSubCategory,
        mode: "insensitive",
      };
      console.log(whereClause);
    }

    const blogs = await prisma.blogs.findMany({
      skip, // Number of records to skip
      take, // Number of records to take
      where: whereClause,
    });

    const totalBlogs = await prisma.blogs.count({
      where: whereClause,
    });
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
        totalBlogs,
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
