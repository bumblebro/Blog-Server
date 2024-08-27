import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const response = await prisma.blogs.findMany();
  console.log(response);

  return Response.json({ data: response });
}
