import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/upload"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_API_URL}/sitemap.xml`,
  };
}
