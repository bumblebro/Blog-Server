import { SchemaType, GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NextRequest } from "next/server";

// const promptForTitle = `
// Generate a 100 random, unique, non-repetitive title for a blog for "${body?.subSubSection}" which comes under "${body?.subSection}" which comes under "${body?.section}". The title should be based on one of the following type:
// - Listicles
// - Review Blogs
// - Comparison Blogs
// - How-To/Tutorial Blogs
// - Roundup Blogs
// - Buying Guides
// - Opinion Blogs

// Please ensure the title reflects the chosen format and provides a creative and captivating approach.

// Use the following JSON schema for the response:
//   {
//     "type": "array",
//     "items": {
//       "type": "object",
//       "properties": {
//         "title": { "type": "string", "nullable": true },
//       },
//       "required": ["title"]
//     }
//   }
// `;

// const prompt = `
// Generate an engaging brief (with total of around 1300 words) news article for the title "${title}". The article should be written in a clear, informative, and professional tone, with a focus on delivering current and relevant information.

// The structure of the article should be as follows:

// 1. **Introduction**: Start with a compelling opening paragraph that sets the context for the news story. This should include the main points and capture the reader's interest to encourage them to continue.

// 2. **List of Sections**: Break down the article into a series of numbered sections, each covering a distinct aspect of the news story. Each section should include:
//    - A title for the section (numbered if required).
//    - A detailed paragraph explaining the information, with relevant data, quotes, or background context into markdown format.
//    - A query for an image that complements the section, if applicable. If an image is not required, set the query field to null.

// 3. **Conclusion**: End with a brief conclusion that wraps up the article and provides any final insights or implications related to the news story.

// 4. **Author and Quote**: Generate a random author name for the article and include a related quote that could be attributed to the author. The quote should align with the article's theme and provide a thoughtful reflection or insightful comment on the news story.

// Additionally, include the following SEO-related fields:

// - "metaDescription": A brief description of the page content for the meta description tag.
// - "ogTitle": The Open Graph title, used when sharing the article on social media platforms.
// - "ogDescription": The Open Graph description, providing a summary of the page content for social media.
// - **Primary Keywords**: The main keywords or phrases that are most relevant to the article's content.
// - **Secondary Keywords**: Related keywords that support the primary keywords and help with ranking in search engines.

// The response should be structured as an object with two main fields:
// - "seo": An object containing all the SEO-related fields.
// - "content": An array of objects, where each object contains:
//    - "title": The title of the section.
//    - "description": The detailed paragraph explaining the news content into markdown format.
//    - "query": The image query related to the section's content (or null if not needed).

// Ensure that the overall article title is included as a headline at the top of the response.

// `;

const genAI = new GoogleGenerativeAI("AIzaSyCXDKoQVeO41DjXic40S9ONZwF8oiMFTww");
const prisma = new PrismaClient().$extends(withAccelerate());

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

    const promptForTitle = `I’m writing a blog post,
  Come up with 100 possible, unique, non-repetitive, click-bait title for a blog for "${body?.subSubSection}" which comes under "${body?.subSection}" which comes under "${body?.section}". The title should be based on one of the following type:
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
    const title = await titlelist[Math.floor(Math.random() * 100) + 1].title;

    const prompt = `
    You're an experienced writer with a skill for creating highly engaging blog posts that capture the attention of your audience and deliver value. 
    Write a 1,500 word (minimum) Human Written, Plagiarism Free, SEO Optimized Long-Form Article for the title "${title}". Use list formatting as much as possible, where appropriate. Structure the format of the article for maximum scannability and readability. 
    Gather inspiration from other successful articles on this topic to make sure we’re not leaving out any important points and sections. Use SEO best practices to ensure proper use of keywords in headings.
    
    The structure of the article should be as follows:
    
1. Introduction**: Start with a compelling opening paragraph that sets the context for the news story. This should include the main points and capture the reader's interest to encourage them to continue.

2. List of Sections**: Break down the article into a series of numbered sections, each covering a distinct aspect of the news story. Each section should include:
   - A title for the section (numbered if required).
   - A detailed paragraph explaining the information, with relevant data, quotes, or background context into markdown format.
   - A query for an image that complements the section, if applicable. If an image is not required, set the query field to null.

3. Conclusion**: End with a brief conclusion that wraps up the article and provides any final insights or implications related to the news story.
    
    4. **Author and Quote**: Generate a random author name for the article and include a related quote that could be attributed to the author. The quote should align with the article's theme and provide a thoughtful reflection or insightful comment on the news story.
    
    Additionally, include the following SEO-related fields:
    
    - "metaDescription": A brief description of the page content for the meta description tag.
    - "ogTitle": The Open Graph title, used when sharing the article on social media platforms.
    - "ogDescription": The Open Graph description, providing a summary of the page content for social media.
    - **Primary Keywords**: The main keywords or phrases that are most relevant to the article's content.
    - **Secondary Keywords**: Related keywords that support the primary keywords and help with ranking in search engines.
    
    The response should be structured as an object with two main fields:
    - "seo": An object containing all the SEO-related fields.
    - "content": An array of objects, where each object contains:
       - "title": The title of the section.
       - "description": The detailed paragraph explaining the news content into markdown format.
       - "query": The image query related to the section's content (or null if not needed).
    
    Ensure that the overall article title is included as a headline at the top of the response.
    
    `;

    const schema = {
      description: "Schema for content with SEO and author information",
      type: SchemaType.OBJECT,
      properties: {
        author: {
          type: SchemaType.STRING,
          description: "Name of the author",
          nullable: false,
        },
        quote: {
          type: SchemaType.STRING,
          description: "Quote provided by the author",
          nullable: false,
        },
        pageTitle: {
          type: SchemaType.STRING,
          description: "Title of the page",
          nullable: false,
        },
        imageQuery: {
          type: SchemaType.STRING,
          description: "Query for the image",
          nullable: false,
        },
        seo: {
          type: SchemaType.OBJECT,
          description: "SEO related information",
          properties: {
            metaDescription: {
              type: SchemaType.STRING,
              description: "Meta description for SEO",
              nullable: false,
            },
            ogTitle: {
              type: SchemaType.STRING,
              description: "Open Graph title for social media",
              nullable: false,
            },
            ogDescription: {
              type: SchemaType.STRING,
              description: "Open Graph description for social media",
              nullable: false,
            },
            primaryKeywords: {
              type: SchemaType.ARRAY,
              description: "Primary keywords for SEO",
              items: {
                type: SchemaType.STRING,
              },
              nullable: false,
            },
            secondaryKeywords: {
              type: SchemaType.ARRAY,
              description: "Secondary keywords for SEO",
              items: {
                type: SchemaType.STRING,
              },
              nullable: true,
            },
          },
          required: ["metaDescription", "primaryKeywords"],
        },
        content: {
          type: SchemaType.ARRAY,
          description: "Array of content objects",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              title: {
                type: SchemaType.STRING,
                description: "Title of the content",
                nullable: false,
              },
              description: {
                type: SchemaType.STRING,
                description: "Description of the content into markdown format",
                nullable: false,
              },
              query: {
                type: SchemaType.STRING,
                description: "Query related to the content",
                nullable: true,
              },
            },
            required: ["description"],
          },
        },
      },
      required: [
        "author",
        "quote",
        "pageTitle",
        "imageQuery",
        "seo",
        "content",
      ],
    };

    const model2 = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const result = await model2.generateContent(prompt);
    const response1 = await result.response;
    // console.log(response);
    const data1 = response1.text();
    console.log(data1);
    console.log(title, body.section, body.subSection, body.subSubSection);
    return Response.json(data1);
  } catch (error) {
    Response.json(error);
  }
}
