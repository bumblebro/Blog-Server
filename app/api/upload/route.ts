import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

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
    const prompt = `Generate blog post about ${body?.title} which comes under category ${body?.section} and sub category ${body?.subSection}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = response.text();
    console.log(data);
    return Response.json(data);
  } catch (e) {
    console.log(e);
  }
}
