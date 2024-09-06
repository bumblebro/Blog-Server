import { PrismaClient } from "@prisma/client";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const blogs = await prisma.blogs.findMany();
    return NextResponse.json({
      blogs: blogs,
    });
  } catch (error) {
    return NextResponse.json(
      { "something went wrong": error },
      { status: 500 }
    );
  }
}
