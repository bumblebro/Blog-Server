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

    // const prompt = `
    //   Generate a unique and engaging blog post ${body?.title} under the category "${body?.section}" and sub-category "${body?.subSection}". The blog should be written in an informal and conversational tone, with a mix of humor and insightful tips.

    //   The structure of the blog should be as follows:

    //   1. **Introduction**: Start with a catchy opening paragraph that sets the tone and context for the blog. This should include the main idea of the post and entice the reader to continue.

    //   2. **List of Tips or Sections**: Break down the blog into a series of numbered sections, each offering a distinct tip or piece of advice. Each section should include:
    //      - A title for the section (numbered if required).
    //      - A detailed paragraph explaining the tip, with a blend of informative content and light humor.
    //      - A query for an image that complements the tip, if applicable. If an image is not required, set the query field to null.

    //   3. **Conclusion**: End with a brief conclusion that wraps up the blog and leaves the reader with a final thought or call to action.

    //   The response should be structured as an array of objects, where each object contains:
    //   - "title": The title of the section.
    //   - "description": The detailed paragraph.
    //   - "query": The image query related to the section's content (or null if not needed).

    //   Use the following JSON schema for the response:
    //   {
    //     "type": "array",
    //     "items": {
    //       "type": "object",
    //       "properties": {
    //         "title": { "type": "string" },
    //         "description": { "type": "string" },
    //         "query": { "type": "string", "nullable": true }
    //       },
    //       "required": ["title", "description"]
    //     }
    //   }
    // `;

    const prompt = `
    Generate a unique and engaging blog post ${body?.title} under the category "${body?.section}" and sub-category "${body?.subSection}" and sub of sub-category "${body?.subSubSection}".
    The structure of the blog should be as follows:

    1.  Start with a catchy opening paragraph that sets the tone and context for the blog. This should include the main idea of the post and entice the reader to continue.

    2. **List of Tips or Sections**: Break down the blog into a series of numbered sections, each offering a distinct tip or piece of advice. Each section should include:
       - A title for the section (numbered if required).
       - A detailed paragraph explaining the tip, with a blend of informative content and light humor.
       - A query for an image that complements the tip, if applicable. If an image is not required, set the query field to null.

    3. **Conclusion**: End with a brief conclusion that wraps up the blog and leaves the reader with a final thought or call to action.

    The response should be structured as an array of objects, where each object contains:
    - "title": The title of the section.
    - "description": The detailed paragraph.
    - "query": The image query related to the section's content (or null if not needed).

    Use the following JSON schema for the response:
    {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "description": { "type": "string" },
          "query": { "type": "string", "nullable": true }
        },
        "required": ["title", "description"]
      }
    }
  `;

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
