import { SchemaType, GoogleGenerativeAI } from "@google/generative-ai";
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
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
    //     const prompt = `Generate SEO optimised blog post about ${body?.title} which comes under category ${body?.section} and sub category ${body?.subSection} and Include the relevent query that would complement each paragraph or section send me 3 object using this JSON schema:
    //     { "type": "array",
    //     "items":{
    //     "type": "object",
    //     "properties": {
    //     "blog": { "type": "string" },
    //     "query":{ "type": "string" }
    //   }
    //  }

    // } `;

    const prompt = `Generate unique blog which provides value and which comes under category ${body?.section} and sub category ${body?.subSection} .the first object in the array should contain only the title of the blog and no description in element blog and image query in the query element (needed for the title). The response should be an array where each element contains an object with two fields: blog for the blog paragraph and query for the associated image query. If an image is not required for a specific paragraph, set the query field to null. The first element should include the first paragraph and its corresponding image query (if needed), and the second element should include the second paragraph with its image query (if needed), and so on. send maximum of 5 query other as null using this JSON schema:
     { "type": "array",
    "items":{
     "type": "object",
    "properties": {
    "blog": { "type": "string" },
     "query":{ "type": "string" }
   }
  }
 
 } `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    // console.log(response);
    const data = response.text();
    console.log(data);
    return Response.json(data);
  } catch (e) {
    console.log(e);
  }
}
