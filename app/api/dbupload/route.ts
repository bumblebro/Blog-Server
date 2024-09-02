import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const newBlog = await prisma.blogs.create({
      data: body,
    });
    console.log("Created blog:", newBlog);
    return Response.json(newBlog);
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
