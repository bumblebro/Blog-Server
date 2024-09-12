import { SchemaType, GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

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

export default async function UPLOAD({
  section,
  subSection,
  subSubSection,
}: {
  section: string;
  subSection: string;
  subSubSection: string;
}) {
  try {
    // const body = await req.json();
    console.log("Start");
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    //   const promptForTitle = `I’m writing a blog post,
    // Come up with 100 possible, unique, non-repetitive, click-bait title for a blog for "${body?.subSubSection}" which comes under "${body?.subSection}" which comes under "${body?.section}". The title should be based on one of the following type:
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

    //     const promptForTitle = `
    // I'm writing a blog post. Come up with 100 possible, unique, non-repetitive, and click-bait titles for a blog under the sub-subsection "${body?.subSubSection}", which falls under the subsection "${body?.subSection}" and section "${body?.section}".

    // Each title should be based on one of the following blog formats:
    //   - Listicles
    //   - Review Blogs
    //   - Comparison Blogs
    //   - How-To/Tutorial Blogs
    //   - Roundup Blogs
    //   - Buying Guides
    //   - Opinion Blogs

    // Please ensure the titles are:
    // - Creative and captivating, making the reader want to click.
    // - Reflecting the specific blog format chosen (e.g., "How-To", "Review", "Comparison", etc.).
    // - Clearly associated with the topic hierarchy: ${body?.section}, ${body?.subSection}, and ${body?.subSubSection}.

    // The response should be structured according to the following JSON schema:

    // {
    //   "type": "array",
    //   "items": {
    //     "type": "object",
    //     "properties": {
    //       "title": { "type": "string", "nullable": false }
    //     },
    //     "required": ["title"]
    //   }
    // }
    // `;

    const promptForTitle = `
Generate 100 possible, unique, non-repetitive, and captivating click-bait titles for a blog under the sub-subsection "${subSubSection}", which falls under the subsection "${subSection}" and section "${section}". 

Each title should follow one of these blog formats:
  - Listicles (e.g., "10 Best... ")
  - Review Blogs (e.g., "In-Depth Review of...")
  - Comparison Blogs (e.g., "Product A vs. Product B: Which Is Better?")
  - How-To/Tutorial Blogs (e.g., "How to...")
  - Roundup Blogs (e.g., "Top 5...")
  - Buying Guides (e.g., "Ultimate Buying Guide for...")
  - Opinion Blogs (e.g., "Why I Think...")

The titles must be:
- Creative, captivating, and designed to make the reader want to click.
- Reflective of the specific blog format chosen.
- Clearly associated with the following topic hierarchy: 
  - Section: ${section}
  - Subsection: ${subSection}
  - Sub-subsection: ${subSubSection}

Ensure that the titles:
- Vary across different blog formats.
- Are meaningful and relevant to the topic, avoiding repetition or placeholder titles.
- Include a mix of popular and engaging title strategies (e.g., numbers, questions, controversial opinions, etc.).

The response should be structured as a JSON array of objects with the following schema:

{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "title": { "type": "string", "nullable": false }
    },
    "required": ["title"]
  }
}
`;

    //     const promptForTitle = `
    // I'm writing a blog post. Generate 100 possible, unique, non-repetitive, and click-bait titles for a blog under the sub-subsection "${body?.subSubSection}", which is part of the subsection "${body?.subSection}" and section "${body?.section}".

    // Each title should align with one of the following blog formats:
    //   - Listicles
    //   - Review Blogs
    //   - Comparison Blogs
    //   - How-To/Tutorial Blogs
    //   - Roundup Blogs
    //   - Buying Guides
    //   - Opinion Blogs

    // The generated titles should:
    // - Be Human Written (natural, engaging language).
    // - 100% Unique (original titles with no plagiarism).
    // - SEO Optimized (include keywords that will help improve search engine ranking).
    // - Plagiarism Free (no copied or repetitive content).
    // - Creative, compelling, and tailored to the blog format (e.g., "How-To", "Review", "Listicle").

    // Ensure each title has a creative and captivating approach that reflects the selected blog format while addressing the theme of "${body?.section}, ${body?.subSection}, ${body?.subSubSection}."

    // The response should be structured as per the following JSON schema:

    // {
    //   "type": "array",
    //   "items": {
    //     "type": "object",
    //     "properties": {
    //       "title": { "type": "string", "nullable": false }
    //     },
    //     "required": ["title"]
    //   }
    // }
    // `;

    const res = await model.generateContent(promptForTitle);
    const response = await res.response;
    const data = response.text();
    const titlelist = JSON.parse(data);
    const title = await titlelist[Math.floor(Math.random() * 100) + 1].title;

    //     const prompt = `
    //     Write a 1,500 word (minimum) Human Written, Plagiarism Free, SEO Optimized Long-Form Article for the title "${title}". Structure the format of the article for maximum scannability and readability. Gather inspiration from other successful articles on this topic to make sure we’re not leaving out any important points and sections. Use SEO best practices to ensure proper use of keywords in headings.

    //     The structure of the article should be as follows:

    // 1. Introduction**: Start with a compelling opening paragraph that sets the context for the news story. This should include the main points and capture the reader's interest to encourage them to continue.

    // 2. List of Sections**: Break down the article into a series of numbered sections, each covering a distinct aspect of the news story. Each section should include:
    //    - A title for the section (numbered if required).
    //    - A detailed paragraph explaining the information, with relevant data, quotes, or background context into markdown format.
    //    - A query for an image that complements the section, if applicable. If an image is not required, set the query field to null.

    // 3. Conclusion**: End with a brief conclusion that wraps up the article and provides any final insights or implications related to the news story.

    //     4. **Author and Quote**: Generate a random author name for the article and include a related quote that could be attributed to the author. The quote should align with the article's theme and provide a thoughtful reflection or insightful comment on the news story.

    //     Additionally, include the following SEO-related fields:

    //     - "metaDescription": A brief description of the page content for the meta description tag.
    //     - "ogTitle": The Open Graph title, used when sharing the article on social media platforms.
    //     - "ogDescription": The Open Graph description, providing a summary of the page content for social media.
    //     - **Primary Keywords**: The main keywords or phrases that are most relevant to the article's content.
    //     - **Secondary Keywords**: Related keywords that support the primary keywords and help with ranking in search engines.

    //     The response should be structured as an object with two main fields:
    //     - "seo": An object containing all the SEO-related fields.
    //     - "content": An array of objects, where each object contains:
    //        - "title": The title of the section.
    //        - "description": The detailed paragraph explaining the news content into markdown format.
    //        - "query": The image query related to the section's content (or null if not needed).

    //     Ensure that the overall article title is included as a headline at the top of the response.

    //     `;

    //     const prompt = `
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
    //    - "query": The query for an image that complements the section, if applicable. If an image is not required, set the query field to null.

    // Ensure that the overall article title is included as a headline at the top of the response.

    // `;

    // const prompt = `
    // Generate an engaging news article (around 1300 words) with the title "${title}". The article should be written in a clear, informative, and professional tone, focusing on delivering current and relevant information.

    // The structure of the article should be as follows:

    // 1. **Author and Quote**:
    //    - Generate a random author name for the article.
    //    - Include a relevant quote from the author that aligns with the theme of the article. The quote should provide a thoughtful reflection or insightful comment on the news story.

    // 2. **SEO Information**:
    //    - "metaDescription": A brief description of the page content for the meta description tag.
    //    - "ogTitle": The Open Graph title, used when sharing the article on social media platforms.
    //    - "ogDescription": The Open Graph description, providing a summary of the page content for social media.
    //    - **Primary Keywords**: The main keywords or phrases that are most relevant to the article’s content.
    //    - **Secondary Keywords**: Related keywords that support the primary keywords and help with ranking in search engines.

    // 3. **Content**:
    //    - The article content should be structured into an array of sections, each containing:
    //      - "title": The title of the section.
    //      - "description": A detailed paragraph explaining the news content in markdown format.
    //      - "query": An image query that complements the section. If no image is needed, set the query field to null.

    // The response should be structured as an object with two main fields:
    // - **seo**: An object containing all the SEO-related fields.
    // - **content**: An array of objects where each object contains the title, description, and query for the section if needed only.
    // `;

    //     const prompt = `
    // Generate an engaging and well-structured news article (around 1300 words) with the title "${title}". The article must be written in a clear, informative, and professional tone. Ensure the content is:

    // - Human Written
    // - 100% Unique
    // - SEO Optimized
    // - Plagiarism Free

    // The structure of the article should be as follows:

    // 1. **Author and Quote**:
    //    - Generate a random author name for the article.
    //    - Include a relevant quote from the author that aligns with the theme of the article. The quote should provide a thoughtful reflection or insightful comment on the news story.

    // 2. **SEO Information**:
    //    - "metaDescription": A brief description of the page content for the meta description tag.
    //    - "ogTitle": The Open Graph title, used when sharing the article on social media platforms.
    //    - "ogDescription": The Open Graph description, providing a summary of the page content for social media.
    //    - **Primary Keywords**: The main keywords or phrases that are most relevant to the article’s content.
    //    - **Secondary Keywords**: Related keywords that support the primary keywords and help with ranking in search engines.

    // 3. **Content**:
    //    - The article content should be structured into an array of sections, each containing:
    //      - "title": The title of the section.
    //      - "description": A detailed paragraph explaining the news content in markdown format.
    //      - "query": An image query that complements the section. If no image is needed, set the query field to null.

    // Ensure that the article is well-researched, engaging, free of plagiarism, and optimized for SEO. The language should appear as if it were written by a human, ensuring natural flow and readability.

    // The response should be structured as an object with two main fields:
    // - **seo**: An object containing all the SEO-related fields.
    // - **content**: An array of objects where each object contains the title, description, and query for the section.
    // `;

    // const prompt = `
    // Generate a well-researched, engaging, and structured news article (around 1300 words) with the title "${title}". The article must be written in a clear, informative, and professional tone. Ensure the content is:

    // - Human Written
    // - 100% Unique
    // - SEO Optimized
    // - Plagiarism Free
    // - Relevant to the title

    // The structure of the article should be as follows:

    // 1. **Author and Quote**:
    //    - Generate a random author name for the article.
    //    - Include a relevant quote from the author that aligns with the theme of the article. The quote should provide a thoughtful reflection or insightful comment on the news story.

    // 2. **Conclusion**:
    //    - Provide a well-written conclusion that summarizes the key points of the article. This section should reinforce the main argument or information and offer final thoughts on the news story.

    // 3. **SEO Information**:
    //    - "metaDescription": A brief description of the page content for the meta description tag.
    //    - "ogTitle": The Open Graph title, used when sharing the article on social media platforms.
    //    - "ogDescription": The Open Graph description, providing a summary of the page content for social media.
    //    - **Primary Keywords**: The main keywords or phrases that are most relevant to the article’s content.
    //    - **Secondary Keywords**: Related keywords that support the primary keywords and help with ranking in search engines.

    // 4. **Content**:
    //    - The article content should be broken down into sections, each with the following structure:
    //      - "title": The title of the section.
    //      - "description": A detailed, meaningful paragraph that thoroughly explains the content for that section. The content should be informative and directly relevant to the section title, avoiding any placeholder or generic text.
    //      - "query": An image query that complements the section. If no image is needed, set the query field to null.

    // Make sure the content is thoroughly researched and provides value to readers. Avoid filler content or placeholders, and focus on delivering substantial, fact-based information in every section.

    // The response should be structured as an object with two main fields:
    // - **seo**: An object containing all the SEO-related fields.
    // - **content**: An array of objects where each object contains the title, description, and query for the section.
    // `;

    const prompt = `
    Generate a well-researched, engaging, and structured blog post (around 1300 words) with the title "${title}". The blog should be written in a clear, informative, and conversational tone. Ensure the content is:
    
    - Human Written
    - 100% Unique
    - SEO Optimized
    - Plagiarism Free
    - Relevant to the title
    
    The structure of the blog should be as follows:
    
    1. **Author and Quote**:
       - Generate a random author name for the blog.
       - Include a relevant quote from the author that aligns with the theme of the blog. The quote should provide a thoughtful reflection or insightful comment on the blog’s topic.
    
    2. **Content**:
       - The blog content should be broken down into sections, each with the following structure:
         - "title": The title of the section.
         - "description": A detailed, meaningful paragraph that thoroughly explains the content for that section. Ensure the "description" provides valuable information and is directly relevant to the section title. The title of the section should not be repeated in the description.
         - "query": An image query that complements the section. If no image is needed, set the query field to null.
    
    3. **Conclusion**:
       - Provide a well-written conclusion that summarizes the key points of the blog. This section should reinforce the main message or takeaways and offer final thoughts or a call to action for the reader.
    
    4. **SEO Information**:
       - "metaDescription": A brief description of the page content for the meta description tag.
       - "ogTitle": The Open Graph title, used when sharing the blog on social media platforms.
       - "ogDescription": The Open Graph description, providing a summary of the page content for social media.
       - **Primary Keywords**: The main keywords or phrases that are most relevant to the blog’s content.
       - **Secondary Keywords**: Related keywords that support the primary keywords and help with ranking in search engines.
    
    Ensure that the blog provides value to the reader and maintains an engaging, conversational tone throughout. Avoid filler content or placeholders, and focus on delivering substantial, fact-based information in every section.
    
    The response should be structured as an object with two main fields:
    - **seo**: An object containing all the SEO-related fields.
    - **content**: An array of objects where each object contains the title, description, and query for the section.
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
    console.log(title, section, subSection, subSubSection);
    return data1;
  } catch (error) {
    return error;
  }
}
