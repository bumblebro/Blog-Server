import { SchemaType, GoogleGenerativeAI } from "@google/generative-ai";

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
let GenAPI = process.env.NEXT_PUBLIC_AI as string;

// const genAI = new GoogleGenerativeAI("AIzaSyCXDKoQVeO41DjXic40S9ONZwF8oiMFTww");
const genAI = new GoogleGenerativeAI(GenAPI);

// const apiKeys = [
//   "AIzaSyCXDKoQVeO41DjXic40S9ONZwF8oiMFTww",
//   "AIzaSyA2bW3jhFQMlSRZvRyXZCTLbYczeoJruzc",
// ];

// // Generate a random index
// const randomIndex = Math.floor(Math.random() * apiKeys.length);

// // Select the random API key
// const selectedApiKey = apiKeys[2];

// const genAI = new GoogleGenerativeAI(selectedApiKey);

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

    //   NEWWWWWW  const prompt = `
    //     Generate a well-researched, engaging, and structured blog post (around 1300 words) with the title "${title}". The blog should be written in a clear, informative, and conversational tone. Ensure the content is:

    // Human Written
    // 100% Unique
    // SEO Optimized
    // Plagiarism Free
    // Relevant to the title
    // The structure of the blog should be in a continuous flow, with titles, descriptions, and queries placed where appropriate. For each section:

    // Author and Quote:

    // Start with the author's name (generate a random name).
    // Include a relevant quote from the author that reflects the theme of the blog and sets the tone.
    // Blog Content:

    // After the author's quote, follow a structured content flow with alternating sections for the title, description, and image query.
    // The title should be clear and descriptive, introducing the section. If no title is necessary, provide null.
    // The description should be thorough and valuable, without repeating the title. Ensure it stays relevant to the section and avoids filler content.
    // The query should provide an appropriate image query that complements the section's content. If no image is necessary, set the query to null.
    // Conclusion:

    // Summarize the key points of the blog in a concluding section. Reinforce the main takeaways, and offer final thoughts or a call to action.
    // Follow the same flow of title, description, and query for the conclusion.
    // SEO Information:

    // metaDescription: A brief summary of the blog’s content, to be used as the meta description tag.
    // ogTitle: The Open Graph title, used for sharing the blog on social media.
    // ogDescription: The Open Graph description, summarizing the content for social sharing.
    // Primary Keywords: The most important keywords or phrases relevant to the blog’s topic.
    // Secondary Keywords: Related or supporting keywords to assist with search engine rankings.
    // The response should be formatted as an object with two main fields:

    // seo: An object containing all the SEO-related fields.
    // content: An array of objects where each object includes the title, description, and query for each section.
    // The blog should be structured logically, flowing naturally from section to section. Provide substantial, fact-based information, avoid placeholders or filler, and maintain an engaging, conversational tone throughout.

    //     `;

    //  NEW 1   const prompt = `
    // Generate a well-researched, engaging, and structured blog post (around 1300 words) with the title "${title}". The blog should be written in a clear, informative, and conversational tone. Ensure the content is:

    // Human Written
    // 100% Unique
    // SEO Optimized
    // Plagiarism Free
    // Relevant to the title
    // The structure of the blog should be in a continuous flow, with titles, descriptions, and queries placed where appropriate. For each section:

    // Author and Quote:

    // Start with the author's name (generate a random name).
    // Include a relevant quote from the author that reflects the theme of the blog and sets the tone.
    // Blog Content:

    // After the author's quote, follow a structured content flow with alternating sections for the title, description, and image query.
    // The title should be clear and descriptive, introducing the section. If no title is necessary, provide null.
    // The description should be thorough and valuable, without repeating the title or image query. Ensure it stays relevant to the section and avoids filler content.
    // The query should provide an appropriate image query that complements the section's content. If no image is necessary, set the query to null.
    // Conclusion:

    // Summarize the key points of the blog in a concluding section. Reinforce the main takeaways, and offer final thoughts or a call to action.
    // Follow the same flow of title, description, and query for the conclusion.
    // SEO Information:

    // metaDescription: A brief summary of the blog’s content, to be used as the meta description tag.
    // ogTitle: The Open Graph title, used for sharing the blog on social media.
    // ogDescription: The Open Graph description, summarizing the content for social sharing.
    // Primary Keywords: The most important keywords or phrases relevant to the blog’s topic.
    // Secondary Keywords: Related or supporting keywords to assist with search engine rankings.
    // The response should be formatted as an object with two main fields:

    // seo: An object containing all the SEO-related fields.
    // content: An array of objects where each object includes the title, description, and query for each section.
    // The blog should be structured logically, flowing naturally from section to section. Provide substantial, fact-based information, avoid placeholders or filler, and maintain an engaging, conversational tone throughout.
    // `;

    //  const prompt = `
    //   Generate a well-researched, engaging, and structured blog post (around 1300 words) with the title "${title}". The blog should be written in a clear, informative, and conversational tone. Ensure the content is:

    //   - Human Written
    //   - 100% Unique
    //   - SEO Optimized
    //   - Plagiarism Free
    //   - Relevant to the title

    //   The structure of the blog should be strictly organized as follows:

    //   1. **Author and Quote:**

    //      - Start with the author's name (generate a random name).
    //      - Include a relevant quote from the author that reflects the theme of the blog and sets the tone.

    //   2. **Blog Content:**

    //      - **Title Section:** Provide a clear and descriptive title for this section. If no title is necessary, explicitly set this to "null".
    //      - **Description Section:** Provide a thorough and valuable description for this section. Ensure that the description does not include the title or any image query. The description should stay relevant to the section's content and avoid filler content.
    //      - **Image Query Section:** Provide an appropriate image query that complements the section's content. If no image is necessary, explicitly set this to "null".

    //      Follow the above structure strictly for each section of the blog. Do not combine the title, description, or image query fields into a single field.

    //   3. **Conclusion:**

    //      - Summarize the key points of the blog in a concluding section. Reinforce the main takeaways and offer final thoughts or a call to action.
    //      - Follow the same flow of title, description, and query as described above for the conclusion section.

    //   4. **SEO Information:**

    //      - **metaDescription:** A brief summary of the blog’s content to be used as the meta description tag.
    //      - **ogTitle:** The Open Graph title, used for sharing the blog on social media.
    //      - **ogDescription:** The Open Graph description, summarizing the content for social sharing.
    //      - **Primary Keywords:** The most important keywords or phrases relevant to the blog’s topic.
    //      - **Secondary Keywords:** Related or supporting keywords to assist with search engine rankings.

    //   The response should be formatted as an object with two main fields:

    //   - **seo:** An object containing all the SEO-related fields.
    //   - **content:** An array of objects where each object includes the title, description, and query for each section.

    //   Ensure that titles, descriptions, and image queries are not mixed or included in the wrong fields. Each field should be strictly adhered to as described above, and the blog should flow logically from section to section. Provide substantial, fact-based information, avoid placeholders or filler, and maintain an engaging, conversational tone throughout.
    //   `;

    // const prompt = `
    //     Generate a well-researched, engaging, and structured blog post (around 1300 words) with the title "${title}". The blog should be written in a clear, informative, conversational, and personal tone, similar to the style of storytelling in personal finance blogs. Ensure the content is:

    //     - Begin the blog with a relatable, personal anecdote or story that ties into the topic.
    //     - Maintain a conversational flow, making the reader feel as if they're being spoken to directly.
    //     - Use humor, informal language, and personal insights where appropriate.
    //     - Encourage reflection by posing questions to the reader and addressing them directly (e.g., "What does this mean for you?").
    //     - Balance the casual tone with useful, actionable advice.
    //     - Human Written
    //     - 100% Unique
    //     - SEO Optimized
    //     - Plagiarism Free
    //     - Relevant to the title

    //     The structure of the blog should follow this format:

    //     1. **Author and Quote:**
    //        - Generate a random author's name.
    //        - Include a relevant quote from the author that reflects the theme of the blog and sets the tone.

    //     2. **Page Title:**
    //        - The main title of the blog post.

    //     3. **Image Query:**
    //        - Generate a query for the main image that aligns with the blog content.

    //     4. **Blog Content:**
    //        - For each section, generate an object with the following fields:
    //          - **Description:** This field should provide detailed content about the section.
    //          - **Query:** This field should contain an image query related to the section content, or set to null if no image is required.

    //     5. **SEO Information:**
    //        - Include meta description, Open Graph title and description, primary keywords, and secondary keywords (optional).

    //     ### Example Output:

    //     {
    //   "author": "Jane Smith",
    //   "quote": "Mastering your finances isn't just about numbers—it's about creating a life that truly reflects your values.",
    //   "pageTitle": "How to Take Control of Your Finances and Build a Life You Love",
    //   "imageQuery": "person managing finances at home",
    //   "seo": {
    //     "metaDescription": "Discover how to manage your finances wisely and build a life that aligns with your values and goals.",
    //     "ogTitle": "How to Take Control of Your Finances and Build a Life You Love",
    //     "ogDescription": "Learn the key steps to take control of your finances and start building a life that reflects your personal goals and values.",
    //     "primaryKeywords": ["personal finance", "money management", "budgeting tips"],
    //     "secondaryKeywords": ["financial freedom", "value-based spending", "savings goals"]
    //   },
    //   "content": [
    //     {
    //       "description": "Growing up, my family didn’t take expensive vacations. In fact, I remember the times we squeezed into a tiny, two-bed motel room—four of us, in a space made for two. My parents were always looking for ways to stretch a dollar. Back then, I thought this was just how things were, but now, looking back, I realize it was my first lesson in personal finance. Managing money isn't just about earning more, it’s about getting the most value out of what you have.",
    //       "query": "family road trip in a small car"
    //     },
    //     {
    //       "description": Why Budgeting is the First Step: "Years later, when I started managing my own money, that lesson stuck with me. The first real step to financial freedom is learning how to budget. Just like my parents, who carefully planned every dollar, I realized that a budget doesn’t limit you—it actually gives you freedom. When you know where your money is going, you’re in control. You can start making decisions that support the life you want to live.",
    //       "query": "person creating a budget at a kitchen table"
    //     },
    //     {
    //       "description": "The Power of Value-Based Spending: Not long ago, I took a trip to Italy with a few friends. We didn’t hold back on experiences—fine dining, boat rides, and exploring beautiful towns. But here’s the thing: we planned for it. I cut back on things that didn’t matter to me, like fancy gadgets and expensive clothes, so I could spend more on what did—travel, memories, and experiences. This is what I call value-based spending, and it’s key to building your rich life.",
    //       "query": "person enjoying a luxurious vacation"
    //     },
    //     {
    //       "description": "Savings: Your Secret Weapon: I’ll admit, saving didn’t always come naturally to me. I used to think it was about depriving myself of the things I enjoyed. But then I learned how powerful savings can be. It’s not about what you can’t spend—it’s about what you’re saving for. Whether it's an emergency fund, a new home, or a dream vacation, every dollar saved gets you closer to the things that matter most.",
    //       "query": "person putting money in a savings jar"
    //     },
    //     {
    //       "description": "Investing in Your Future: Once you’ve mastered saving, the next step is investing. When I got my first paycheck, I spent most of it right away. But now, I see investing as planting seeds for the future. The earlier you start, the more time your money has to grow. Whether it's stocks, real estate, or retirement funds, investing is about building a future that gives you the freedom to live on your terms.",
    //       "query": "person investing in the stock market"
    //     },
    //     {
    //       "description": "Design Your Financial Plan: Now, here’s where it all comes together. Just like my parents did with our vacations, you can design a financial plan that reflects your values. It’s not about making more money—it's about making your money work for you. Maybe you want to travel, spend more time with family, or simply enjoy peace of mind knowing you have financial security. Whatever it is, start designing your plan today and take control of your financial future.",
    //       "query": "person planning finances on a notebook"
    //     },
    //     {
    //       "description": "Conclusion: Your Rich Life Awaits: Living a rich life isn’t about having the most money—it’s about living in alignment with what matters most to you. Whether it’s budgeting, saving, or investing, the key is to start taking small steps today. Just like those family road trips taught me the value of money, you can start applying these lessons to create a life filled with the things that bring you joy. Your rich life is waiting—start building it today.",
    //       "query": "person living a happy, fulfilled life"
    //     }
    //   ]
    // }

    //     `;

    const prompt = `
        Generate a well-researched, engaging, and structured blog post (around 1300 words) with the title "${title}". The blog should be written in a clear, informative, conversational, personal tone and style of storytelling. Ensure the content is:
    
        - Begin the blog with a relatable, personal anecdote or story that ties into the topic.
        - Maintain a conversational flow, making the reader feel as if they're being spoken to directly.
        - Use humor, informal language, and personal insights where appropriate.
        - Encourage reflection by posing questions to the reader and addressing them directly (e.g., "What does this mean for you?").
        - Balance the casual tone with useful, actionable advice.
        - Human Written
        - 100% Unique
        - SEO Optimized
        - Relevant to the title
        - Avoid words like "Remember", "Let's face it", "Embrace"
    
        The structure of the blog should follow this format:
    
        1. **Author and Quote:**
           - Generate a random author's name.
           - Include a relevant quote from the author that reflects the theme of the blog and sets the tone.
    
        2. **Page Title:**
           - The main title of the blog post.
    
        3. **Image Query:**
           - Generate a query for the main image that aligns with the blog content.
    
        4. **Blog Content:**
           - For each section, generate an object with the following fields:
             - **Description:** This field should provide detailed content about the section or set to null if no image is required. Use Markdown language for formatting, including headers (e.g., ##), bullet points, and bold text where appropriate. 
             - **Query:** This field should contain an image query related to the section content, or set to null if no image is required.
    
        5. **SEO Information:**
           - Include meta description, Open Graph title and description, primary keywords, and secondary keywords (optional).

        Make sure the content is thoroughly researched and provides value to readers. Avoid filler content or placeholders, and focus on delivering substantial, fact-based information.
    
        ### Example Output:
    
        {
          "author": "Jane Smith",
          "quote": "Mastering your finances isn't just about numbers—it's about creating a life that truly reflects your values.",
          "pageTitle": "How to Take Control of Your Finances and Build a Life You Love",
          "imageQuery": "person managing finances at home",
          "seo": {
            "metaDescription": "Discover how to manage your finances wisely and build a life that aligns with your values and goals.",
            "ogTitle": "How to Take Control of Your Finances and Build a Life You Love",
            "ogDescription": "Learn the key steps to take control of your finances and start building a life that reflects your personal goals and values.",
            "primaryKeywords": ["personal finance", "money management", "budgeting tips"],
            "secondaryKeywords": ["financial freedom", "value-based spending", "savings goals"]
          },
          "content": [
            {
              "description": "Growing up, my family didn’t take expensive vacations. In fact, I remember the times we squeezed into a tiny, two-bed motel room—four of us, in a space made for two. My parents were always looking for ways to stretch a dollar. Back then, I thought this was just how things were, but now, looking back, I realize it was my first lesson in personal finance. Managing money isn't just about earning more, it’s about getting the most value out of what you have.",
              "query": "family road trip in a small car"
            },
            {
              "description": "## Why Budgeting is the First Step\n\nYears later, when I started managing my own money, that lesson stuck with me. The first real step to financial freedom is learning how to budget. Just like my parents, who carefully planned every dollar, I realized that a budget doesn’t limit you—it actually gives you freedom. When you know where your money is going, you’re in control. You can start making decisions that support the life you want to live.",
              "query": "person creating a budget at a kitchen table"
            },
            {
              "description": "## The Power of Value-Based Spending\n\nNot long ago, I took a trip to Italy with a few friends. We didn’t hold back on experiences—fine dining, boat rides, and exploring beautiful towns. But here’s the thing: we planned for it. I cut back on things that didn’t matter to me, like fancy gadgets and expensive clothes, so I could spend more on what did—travel, memories, and experiences. This is what I call value-based spending, and it’s key to building your rich life.",
              "query": "person enjoying a luxurious vacation"
            },
            {
              "description": "## Savings: Your Secret Weapon\n\nI’ll admit, saving didn’t always come naturally to me. I used to think it was about depriving myself of the things I enjoyed. But then I learned how powerful savings can be. It’s not about what you can’t spend—it’s about what you’re saving for. Whether it's an emergency fund, a new home, or a dream vacation, every dollar saved gets you closer to the things that matter most.",
              "query": "person putting money in a savings jar"
            },
            {
              "description": "## Investing in Your Future\n\nOnce you’ve mastered saving, the next step is investing. When I got my first paycheck, I spent most of it right away. But now, I see investing as planting seeds for the future. The earlier you start, the more time your money has to grow. Whether it's stocks, real estate, or retirement funds, investing is about building a future that gives you the freedom to live on your terms.",
              "query": "person investing in the stock market"
            },
            {
              "description": "## Design Your Financial Plan\n\nNow, here’s where it all comes together. Just like my parents did with our vacations, you can design a financial plan that reflects your values. It’s not about making more money—it's about making your money work for you. Maybe you want to travel, spend more time with family, or simply enjoy peace of mind knowing you have financial security. Whatever it is, start designing your plan today and take control of your financial future.",
              "query": "person planning finances on a notebook"
            },
            {
              "description": "## Conclusion: Your Rich Life Awaits\n\nLiving a rich life isn’t about having the most money—it’s about living in alignment with what matters most to you. Whether it’s budgeting, saving, or investing, the key is to start taking small steps today. Just like those family road trips taught me the value of money, you can start applying these lessons to create a life filled with the things that bring you joy. Your rich life is waiting—start building it today.",
              "query": "person living a happy, fulfilled life"
            }
          ]
        }
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
              description: {
                type: SchemaType.STRING,
                description: "Description of the content into markdown format",
                nullable: true,
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

    //     const prompt = `
    // Generate a well-researched, engaging, and structured blog post (around 1300 words) with the title "${title}". The blog should be written in a clear, informative, conversational, and personal tone, style of storytelling. stricty avoid placeholders or filler blogs. Ensure the content is:

    //     - Begin the blog with a relatable, personal anecdote or story that ties into the topic.
    //     - Maintain a conversational flow, making the reader feel as if they're being spoken to directly.
    //     - Use humor, informal language, and personal insights where appropriate.
    //     - Encourage reflection by posing questions to the reader and addressing them directly (e.g., "What does this mean for you?").
    //     - Balance the casual tone with useful, actionable advice.
    //     - Human Written
    //     - 100% Unique
    //     - SEO Optimized
    //     - Plagiarism Free
    //     - Relevant to the title

    //     The structure of the blog should be strictly organized as follows:

    //     1. **Author and Quote:**
    //        - Generate a random author's name.
    //        - Include a relevant quote from the author that reflects the theme of the blog and sets the tone.

    //     2. **Page Title:**
    //        - The main title of the blog post.

    //     3. **Image Query:**
    //        - Generate a query for the main image that aligns with the blog content.

    //     4. **Blog Content:**
    //        - For each section, generate an object with the following fields:
    //          - **Title:** Provide a clear and descriptive title for this section(This field can be null if no title is necessary.)
    //          - **Description:** This field should provide detailed content about the section. The description should not include the title or any image query.
    //          - **Query:** This field should contain an image query related to the section content, or set to null if no image is required.

    //     5. **SEO Information:**

    //        - **metaDescription:** A brief summary of the blog’s content to be used as the meta description tag.
    //        - **ogTitle:** The Open Graph title, used for sharing the blog on social media.
    //        - **ogDescription:** The Open Graph description, summarizing the content for social sharing.
    //        - **Primary Keywords:** The most important keywords or phrases relevant to the blog’s topic.
    //        - **Secondary Keywords:** Related or supporting keywords to assist with search engine rankings.

    //     The response should be formatted as an object with two main fields:

    //     - **seo:** An object containing all the SEO-related fields.
    //     - **content:** An array of objects where each object includes the title, description, and query for each section.

    //     Ensure that titles, descriptions, and image queries are not mixed or included in the wrong fields. Each field should be strictly adhered to as described above, and the blog should flow logically from section to section. Provide substantial, fact-based information, avoid placeholders or filler, and maintain an engaging, conversational tone throughout.
    //     `;

    //     const schema = {
    //       description: "Schema for content with SEO and author information",
    //       type: SchemaType.OBJECT,
    //       properties: {
    //         author: {
    //           type: SchemaType.STRING,
    //           description: "Name of the author",
    //           nullable: false,
    //         },
    //         quote: {
    //           type: SchemaType.STRING,
    //           description: "Quote provided by the author",
    //           nullable: false,
    //         },
    //         pageTitle: {
    //           type: SchemaType.STRING,
    //           description: "Title of the page",
    //           nullable: false,
    //         },
    //         imageQuery: {
    //           type: SchemaType.STRING,
    //           description: "Query for the image",
    //           nullable: false,
    //         },
    //         seo: {
    //           type: SchemaType.OBJECT,
    //           description: "SEO related information",
    //           properties: {
    //             metaDescription: {
    //               type: SchemaType.STRING,
    //               description: "Meta description for SEO",
    //               nullable: false,
    //             },
    //             ogTitle: {
    //               type: SchemaType.STRING,
    //               description: "Open Graph title for social media",
    //               nullable: false,
    //             },
    //             ogDescription: {
    //               type: SchemaType.STRING,
    //               description: "Open Graph description for social media",
    //               nullable: false,
    //             },
    //             primaryKeywords: {
    //               type: SchemaType.ARRAY,
    //               description: "Primary keywords for SEO",
    //               items: {
    //                 type: SchemaType.STRING,
    //               },
    //               nullable: false,
    //             },
    //             secondaryKeywords: {
    //               type: SchemaType.ARRAY,
    //               description: "Secondary keywords for SEO",
    //               items: {
    //                 type: SchemaType.STRING,
    //               },
    //               nullable: true,
    //             },
    //           },
    //           required: ["metaDescription", "primaryKeywords"],
    //         },
    //         content: {
    //           type: SchemaType.ARRAY,
    //           description: "Array of content objects",
    //           items: {
    //             type: SchemaType.OBJECT,
    //             properties: {
    //               title: {
    //                 type: SchemaType.STRING,
    //                 description: "Title of the content",
    //                 nullable: true,
    //               },
    //               description: {
    //                 type: SchemaType.STRING,
    //                 description: "Description of the content into markdown format",
    //                 nullable: false,
    //               },
    //               query: {
    //                 type: SchemaType.STRING,
    //                 description: "Query related to the content",
    //                 nullable: true,
    //               },
    //             },
    //             required: ["description"],
    //           },
    //         },
    //       },
    //       required: [
    //         "author",
    //         "quote",
    //         "pageTitle",
    //         "imageQuery",
    //         "seo",
    //         "content",
    //       ],
    //     };

    //     const prompt = `
    // Generate a well-researched, engaging, and structured blog post (around 1300 words) with the title "${title}". The blog should be written in a clear, informative, conversational, and personal tone, style of storytelling. stricty avoid placeholders or filler blogs. Ensure the content is:

    //     - Begin the blog with a relatable, personal anecdote or story that ties into the topic.
    //     - Maintain a conversational flow, making the reader feel as if they're being spoken to directly.
    //     - Use humor, informal language, and personal insights where appropriate.
    //     - Encourage reflection by posing questions to the reader and addressing them directly (e.g., "What does this mean for you?").
    //     - Balance the casual tone with useful, actionable advice.
    //     - Human Written
    //     - 100% Unique
    //     - SEO Optimized
    //     - Plagiarism Free
    //     - Relevant to the title

    //     The structure of the blog should be strictly organized as follows:

    //     1. **Author and Quote:**
    //        - Generate a random author's name.
    //        - Include a relevant quote from the author that reflects the theme of the blog and sets the tone.

    //     2. **Page Title:**
    //        - The main title of the blog post.

    //     3. **Image Query:**
    //        - Generate a query for the main image that aligns with the blog content.

    //     4. **Blog Content:**
    //        - For each section, generate an object with the following fields:
    //          - **Description:** This field should provide detailed content about the section. The description should not include the title or any image query.
    //          - **Query:** This field should contain an image query related to the section content, or set to null if no image is required.

    //     5. **SEO Information:**

    //        - **metaDescription:** A brief summary of the blog’s content to be used as the meta description tag.
    //        - **ogTitle:** The Open Graph title, used for sharing the blog on social media.
    //        - **ogDescription:** The Open Graph description, summarizing the content for social sharing.
    //        - **Primary Keywords:** The most important keywords or phrases relevant to the blog’s topic.
    //        - **Secondary Keywords:** Related or supporting keywords to assist with search engine rankings.

    //     The response should be formatted as an object with two main fields:

    //     - **seo:** An object containing all the SEO-related fields.
    //     - **content:** An array of objects where each object includes the title, description, and query for each section.

    //     Ensure that descriptions, and image queries are not mixed or included in the wrong fields. Each field should be strictly adhered to as described above, and the blog should flow logically from section to section. Provide substantial, fact-based information, avoid placeholders or filler, and maintain an engaging, conversational tone throughout.
    //     `;

    //     const schema = {
    //       description: "Schema for content with SEO and author information",
    //       type: SchemaType.OBJECT,
    //       properties: {
    //         author: {
    //           type: SchemaType.STRING,
    //           description: "Name of the author",
    //           nullable: false,
    //         },
    //         quote: {
    //           type: SchemaType.STRING,
    //           description: "Quote provided by the author",
    //           nullable: false,
    //         },
    //         pageTitle: {
    //           type: SchemaType.STRING,
    //           description: "Title of the page",
    //           nullable: false,
    //         },
    //         imageQuery: {
    //           type: SchemaType.STRING,
    //           description: "Query for the image",
    //           nullable: false,
    //         },
    //         seo: {
    //           type: SchemaType.OBJECT,
    //           description: "SEO related information",
    //           properties: {
    //             metaDescription: {
    //               type: SchemaType.STRING,
    //               description: "Meta description for SEO",
    //               nullable: false,
    //             },
    //             ogTitle: {
    //               type: SchemaType.STRING,
    //               description: "Open Graph title for social media",
    //               nullable: false,
    //             },
    //             ogDescription: {
    //               type: SchemaType.STRING,
    //               description: "Open Graph description for social media",
    //               nullable: false,
    //             },
    //             primaryKeywords: {
    //               type: SchemaType.ARRAY,
    //               description: "Primary keywords for SEO",
    //               items: {
    //                 type: SchemaType.STRING,
    //               },
    //               nullable: false,
    //             },
    //             secondaryKeywords: {
    //               type: SchemaType.ARRAY,
    //               description: "Secondary keywords for SEO",
    //               items: {
    //                 type: SchemaType.STRING,
    //               },
    //               nullable: true,
    //             },
    //           },
    //           required: ["metaDescription", "primaryKeywords"],
    //         },
    //         content: {
    //           type: SchemaType.ARRAY,
    //           description: "Array of content objects",
    //           items: {
    //             type: SchemaType.OBJECT,
    //             properties: {
    //               description: {
    //                 type: SchemaType.STRING,
    //                 description: "Description of the content into markdown format",
    //                 nullable: false,
    //               },
    //               query: {
    //                 type: SchemaType.STRING,
    //                 description: "Query related to the content",
    //                 nullable: true,
    //               },
    //             },
    //             required: ["description"],
    //           },
    //         },
    //       },
    //       required: [
    //         "author",
    //         "quote",
    //         "pageTitle",
    //         "imageQuery",
    //         "seo",
    //         "content",
    //       ],
    //     };

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
