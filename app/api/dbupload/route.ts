import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const newBlog = await prisma.blogs.create({
    data: body,
  });
  console.log("Created blog:", newBlog);
  return Response.json(newBlog);
}
