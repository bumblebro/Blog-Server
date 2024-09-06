import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GETBLOGALL() {
  const blogs = await prisma.blogs.findMany();
  return blogs;
}
