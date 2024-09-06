import { PrismaClient } from "@prisma/client";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const pageSize = 12;
export async function GET() {
  try {
    const blogs = await prisma.blogs.findMany();

    console.log({
      blogs: blogs,
    });
    return NextResponse.json({
      blogs: blogs,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { "something went wrong": error },
      { status: 500 }
    );
  }
}
