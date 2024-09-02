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

    const promptForTitle = `
  Generate a 50 random, unique, non-repetitive and engaging title for a blog for "${body?.subSubSection}" which comes under "${body?.subSection}" which comes under "${body?.section}". The title should be based on one of the following type:
  - Listicles
  - Review Blogs
  - Comparison Blogs
  - How-To/Tutorial Blogs
  - Roundup Blogs
  - Buying Guides
  - Opinion Blogs
  
  Please ensure the title reflects the chosen format and provides a creative and captivating approach.
  
  Use the following JSON schema for the response:
    {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string", "nullable": true },
        },
        "required": ["title"]
      }
    }
  `;

    const res = await model.generateContent(promptForTitle);
    const response = await res.response;
    const data = response.text();
    const titlelist = JSON.parse(data);
    const title = await titlelist[Math.floor(Math.random() * 50) + 1].title;

    const prompt = `
      Generate a engaging brief news article for the title "${title}" The article should be written in a clear, informative, and professional tone, with a focus on delivering current and relevant information.

      The structure of the article should be as follows:

      1. **Introduction**: Start with a compelling opening paragraph that sets the context for the news story. This should include the main points and capture the reader's interest to encourage them to continue.

      2. **List of Sections**: Break down the article into a series of numbered sections, each covering a distinct aspect of the news story. Each section should include:
         - A title for the section (numbered if required).
         - A detailed paragraph explaining the information, with relevant data, quotes, or background context.
         - A query for an image that complements the section, if applicable. If an image is not required, set the query field to null.

      3. **Conclusion**: End with a brief conclusion that wraps up the article and provides any final insights or implications related to the news story.

      The response should be structured as an array of objects, where each object contains:
      - "title": The title of the section (title of the news article writen here at first)
      - "description": The detailed paragraph explaining the news content.
      - "query": The image query related to the section's content (or null if not needed).

      Ensure that the overall article title is included as a headline at the top of the response.

      Use the following JSON schema for the response:
      {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "title": { "type": "string", "nullable": true },
            "description": { "type": "string" },
            "query": { "type": "string", "nullable": true }
          },
          "required": ["description"]
        }
      }
    `;

    const result = await model.generateContent(prompt);
    const response1 = await result.response;
    // console.log(response);
    const data1 = response1.text();
    console.log(data1);
    console.log(title, body.section, body.subSection, body.subSubSection);
    return Response.json(data1);
  } catch (e) {
    console.log(e);
  }
}
