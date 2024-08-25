import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { title } from "process";
const genAI = new GoogleGenerativeAI("AIzaSyCXDKoQVeO41DjXic40S9ONZwF8oiMFTww");
const client = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Start");

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const prompt = body.question;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = response.text();
    const blog = await client.blogs.create({
      data: {
        title: "Test2",
        body: data,
      },
    });
    console.log(blog);
    return Response.json(data);
  } catch (e) {
    console.log(e);
  }
}

export async function GET() {
  const blog = await client.blogs.findFirst({
    where: {
      title: "Test2",
    },
  });
  console.log(blog);
  return Response.json(blog?.body);
}
