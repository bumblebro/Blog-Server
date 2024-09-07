import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default async function GETBLOGALL() {
  const blogs = await prisma.blogs.findMany({ cacheStrategy: { ttl: 60 } });
  return blogs;
}
