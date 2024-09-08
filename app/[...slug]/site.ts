import GenerateSlugs from "@/libs/GenerateSlugs";
import { subSections } from "@/libs/Section";
import { MetadataRoute } from "next";
import GETBLOGALL from "../api/blogsall/GETBLOGALL";
import { Blogs } from "@prisma/client";
import GETBLOG from "../api/blogs/GETBLOG";

export async function generateSitemaps() {
  try {
    const sluglayer = (await GenerateSlugs(subSections)).slice(0, 5);

    const response = await GETBLOGALL();

    const titlearray = response?.map((item: Blogs) => ({
      slug: [item.section, item.subsection, item.subsubsection, item.title],
    }));
    return [...sluglayer, ...titlearray];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function sitemap({
  slug,
}: {
  slug: string[];
}): Promise<MetadataRoute.Sitemap> {
  const response = await GETBLOG({ pageNo: "1" });
  const totalpage = response.metaData.totalPages;
  const blogslug: MetadataRoute.Sitemap = [];

  for (let i = 1; i <= totalpage; i++) {
    blogslug.push({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/blog/page/${i}`,
    });
  }

  const allblog = await GETBLOGALL();

  const titleslug: MetadataRoute.Sitemap = allblog?.map((item: Blogs) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${item.section}/${item.subsection}/${item.subsubsection}/${item.title}`,
  }));
  return [...titleslug, ...blogslug];
}
