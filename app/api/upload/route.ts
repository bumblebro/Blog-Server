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

    //   const prompt = `
    //   Generate a engaging brief news article for the title "${title}" The article should be written in a clear, informative, and professional tone, with a focus on delivering current and relevant information.

    //   The structure of the article should be as follows:

    //   1. **Introduction**: Start with a compelling opening paragraph that sets the context for the news story. This should include the main points and capture the reader's interest to encourage them to continue.

    //   2. **List of Sections**: Break down the article into a series of numbered sections, each covering a distinct aspect of the news story. Each section should include:
    //      - A title for the section (numbered if required).
    //      - A detailed paragraph explaining the information, with relevant data, quotes, or background context.
    //      - A query for an image that complements the section, if applicable. If an image is not required, set the query field to null.

    //   3. **Conclusion**: End with a brief conclusion that wraps up the article and provides any final insights or implications related to the news story.

    //   The response should be structured as an array of objects, where each object contains:
    //   - "title": The title of the section (title of the news article writen here at first)
    //   - "description": The detailed paragraph explaining the news content.
    //   - "query": The image query related to the section's content (or null if not needed).

    //   Ensure that the overall article title is included as a headline at the top of the response.

    //   Use the following JSON schema for the response:
    //   {
    //     "type": "array",
    //     "items": {
    //       "type": "object",
    //       "properties": {
    //         "title": { "type": "string", "nullable": true },
    //         "description": { "type": "string" },
    //         "query": { "type": "string", "nullable": true }
    //       },
    //       "required": ["description"]
    //     }
    //   }
    // `;

    //   const prompt = `
    //   Generate an engaging brief news article for the title "${title}". The article should be written in a clear, informative, and professional tone, with a focus on delivering current and relevant information.

    //   The structure of the article should be as follows:

    //   1. **Introduction**: Start with a compelling opening paragraph that sets the context for the news story. This should include the main points and capture the reader's interest to encourage them to continue.

    //   2. **List of Sections**: Break down the article into a series of numbered sections, each covering a distinct aspect of the news story. Each section should include:
    //      - A title for the section (numbered if required).
    //      - A detailed paragraph explaining the information, with relevant data, quotes, or background context.
    //      - A query for an image that complements the section, if applicable. If an image is not required, set the query field to null.

    //   3. **Conclusion**: End with a brief conclusion that wraps up the article and provides any final insights or implications related to the news story.

    //   4. **Author**: Generate a random author name for the article.

    //   Additionally, include the following SEO-related fields:

    //   - "pageTitle": The title of the page to be used in the HTML <title> tag (different from the article title if necessary).
    //   - "metaDescription": A brief description of the page content for the meta description tag.
    //   - "ogTitle": The Open Graph title, used when sharing the article on social media platforms.
    //   - "ogDescription": The Open Graph description, providing a summary of the page content for social media.

    //   The response should be structured as an object with two main fields:
    //   - "seo": An object containing all the SEO-related fields.
    //   - "content": An array of objects, where each object contains:
    //      - "title": The title of the section (title of the news article written here at first).
    //      - "description": The detailed paragraph explaining the news content.
    //      - "query": The image query related to the section's content (or null if not needed).

    //   Ensure that the overall article title is included as a headline at the top of the response.

    //   Use the following JSON schema for the response:
    //   {
    //     "type": "object",
    //     "properties": {
    //       "author": { "type": "string" },
    //       "seo": {
    //         "type": "object",
    //         "properties": {
    //           "pageTitle": { "type": "string" },
    //           "metaDescription": { "type": "string" },
    //           "ogTitle": { "type": "string" },
    //           "ogDescription": { "type": "string" },
    //         },
    //         "required": ["pageTitle", "metaDescription"]
    //       },
    //       "content": {
    //         "type": "array",
    //         "items": {
    //           "type": "object",
    //           "properties": {
    //             "title": { "type": "string", "nullable": true },
    //             "description": { "type": "string" },
    //             "query": { "type": "string", "nullable": true }
    //           },
    //           "required": ["description"]
    //         }
    //       }
    //     },
    //     "required": ["author", "seo", "content"]
    //   }
    // `;

    // const prompt = `
    // Generate an engaging brief news article for the title "${title}". The article should be written in a clear, informative, and professional tone, with a focus on delivering current and relevant information.

    // The structure of the article should be as follows:

    // 1. **Introduction**: Start with a compelling opening paragraph that sets the context for the news story. This should include the main points and capture the reader's interest to encourage them to continue.

    // 2. **List of Sections**: Break down the article into a series of numbered sections, each covering a distinct aspect of the news story. Each section should include:
    //    - A title for the section (numbered if required).
    //    - A detailed paragraph explaining the information, with relevant data, quotes, or background context.
    //    - A query for an image that complements the section, if applicable. If an image is not required, set the query field to null.

    // 3. **Conclusion**: End with a brief conclusion that wraps up the article and provides any final insights or implications related to the news story.

    // 4. **Author**: Generate a random author name for the article.

    // Additionally, include the following SEO-related fields:

    // - "pageTitle": The title of the page to be used in the HTML <title> tag (different from the article title if necessary).
    // - "metaDescription": A brief description of the page content for the meta description tag.
    // - "ogTitle": The Open Graph title, used when sharing the article on social media platforms.
    // - "ogDescription": The Open Graph description, providing a summary of the page content for social media.
    // - "imageQuery": A query for an image that complements the overall title of the article.

    // The response should be structured as an object with two main fields:
    // - "seo": An object containing all the SEO-related fields.
    // - "content": An array of objects, where each object contains:
    //    - "title": The title of the section.
    //    - "description": The detailed paragraph explaining the news content.
    //    - "query": The image query related to the section's content (or null if not needed).

    // Ensure that the overall article title is included as a headline at the top of the response.

    // Use the following JSON schema for the response:
    // {
    //   "type": "object",
    //   "properties": {
    //     "author": { "type": "string" },
    //     "seo": {
    //       "type": "object",
    //       "properties": {
    //         "pageTitle": { "type": "string" },
    //         "metaDescription": { "type": "string" },
    //         "ogTitle": { "type": "string" },
    //         "ogDescription": { "type": "string" },
    //         "imageQuery": { "type": "string", "nullable": true }
    //       },
    //       "required": ["pageTitle", "metaDescription", "imageQuery"]
    //     },
    //     "content": {
    //       "type": "array",
    //       "items": {
    //         "type": "object",
    //         "properties": {
    //           "title": { "type": "string" },
    //           "description": { "type": "string" },
    //           "query": { "type": "string", "nullable": true }
    //         },
    //         "required": ["description"]
    //       }
    //     }
    //   },
    //   "required": ["author", "seo", "content"]
    // }
    // `;

    // const prompt = `
    // Generate an engaging brief news article for the title "${title}". The article should be written in a clear, informative, and professional tone, with a focus on delivering current and relevant information.

    // The structure of the article should be as follows:

    // 1. **Introduction**: Start with a compelling opening paragraph that sets the context for the news story. This should include the main points and capture the reader's interest to encourage them to continue.

    // 2. **List of Sections**: Break down the article into a series of numbered sections, each covering a distinct aspect of the news story. Each section should include:
    //    - A title for the section (numbered if required).
    //    - A detailed paragraph explaining the information, with relevant data, quotes, or background context.
    //    - A query for an image that complements the section, if applicable. If an image is not required, set the query field to null.

    // 3. **Conclusion**: End with a brief conclusion that wraps up the article and provides any final insights or implications related to the news story.

    // 4. **Author and Quote**: Generate a random author name for the article and include a related quote that could be attributed to the author. The quote should align with the article's theme and provide a thoughtful reflection or insightful comment on the news story.

    // Additionally, include the following SEO-related fields:

    // - "pageTitle": The title of the page to be used in the HTML <title> tag (different from the article title if necessary).
    // - "metaDescription": A brief description of the page content for the meta description tag.
    // - "ogTitle": The Open Graph title, used when sharing the article on social media platforms.
    // - "ogDescription": The Open Graph description, providing a summary of the page content for social media.
    // - "imageQuery": A query for an image that complements the overall title of the article.

    // The response should be structured as an object with two main fields:
    // - "seo": An object containing all the SEO-related fields.
    // - "content": An array of objects, where each object contains:
    //    - "title": The title of the section.
    //    - "description": The detailed paragraph explaining the news content.
    //    - "query": The image query related to the section's content (or null if not needed).

    // Ensure that the overall article title is included as a headline at the top of the response.

    // Use the following JSON schema for the response:
    // {
    //   "type": "object",
    //   "properties": {
    //     "author": { "type": "string" },
    //     "quote": { "type": "string" },
    //     "seo": {
    //       "type": "object",
    //       "properties": {
    //         "pageTitle": { "type": "string" },
    //         "metaDescription": { "type": "string" },
    //         "ogTitle": { "type": "string" },
    //         "ogDescription": { "type": "string" },
    //         "imageQuery": { "type": "string", "nullable": true }
    //       },
    //       "required": ["pageTitle", "metaDescription", "imageQuery"]
    //     },
    //     "content": {
    //       "type": "array",
    //       "items": {
    //         "type": "object",
    //         "properties": {
    //           "title": { "type": "string" },
    //           "description": { "type": "string" },
    //           "query": { "type": "string", "nullable": true }
    //         },
    //         "required": ["description"]
    //       }
    //     }
    //   },
    //   "required": ["author", "quote", "seo", "content"]
    // }
    // `;

    const promptForTitle = `
  Generate a 100 random, unique, non-repetitive and engaging title for a blog for "${body?.subSubSection}" which comes under "${body?.subSection}" which comes under "${body?.section}". The title should be based on one of the following type:
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
    Generate an engaging brief (with total of around 1300 words) news article for the title "${title}". The article should be written in a clear, informative, and professional tone, with a focus on delivering current and relevant information.
    
    The structure of the article should be as follows:
    
    1. **Introduction**: Start with a compelling opening paragraph that sets the context for the news story. This should include the main points and capture the reader's interest to encourage them to continue.
    
    2. **List of Sections**: Break down the article into a series of numbered sections, each covering a distinct aspect of the news story. Each section should include:
       - A title for the section (numbered if required).
       - A detailed paragraph explaining the information, with relevant data, quotes, or background context.
       - A query for an image that complements the section, if applicable. If an image is not required, set the query field to null.
    
    3. **Conclusion**: End with a brief conclusion that wraps up the article and provides any final insights or implications related to the news story.
    
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
       - "description": The detailed paragraph explaining the news content(never send markdown language).
       - "query": The image query related to the section's content (or null if not needed).
    
    Ensure that the overall article title is included as a headline at the top of the response.
    
    Use the following JSON schema for the response:
    {
      "type": "object",
      "properties": {
        "author": { "type": "string" },
        "quote": { "type": "string" },
        "pageTitle": { "type": "string" },
        "imageQuery": { "type": "string", "nullable": true },
        "seo": {
          "type": "object",
          "properties": {
            "metaDescription": { "type": "string" },
            "ogTitle": { "type": "string" },
            "ogDescription": { "type": "string" },
            "primaryKeywords": { "type": "array", "items": { "type": "string" } },
            "secondaryKeywords": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["metaDescription", "primaryKeywords"]
        },
        "content": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": { "type": "string" },
              "description": { "type": "string" },
              "query": { "type": "string", "nullable": true }
            },
            "required": ["description"]
          }
        }
      },
      "required": ["author", "quote", "pageTitle", "imageQuery", "seo", "content"]
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
