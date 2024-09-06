import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function GETBLOGPOST({ title }: { title: string }) {
  // const { searchParams } = new URL(req.url);
  const titlename = title || undefined;
  const blogs = await prisma.blogs.findUnique({
    where: { title: titlename },
  });
  return blogs ;
}
