import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const blogs = await prisma.blogs.findUnique({
      where: { title: title },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(error);
  }
}
