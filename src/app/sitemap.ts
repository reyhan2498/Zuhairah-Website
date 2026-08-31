import type { MetadataRoute } from "next";

const BASE_URL = "https://zuhairah.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // If you add more products later, add a matching entry here.
    {
      url: `${BASE_URL}/products/pro-performance-fit-hijab`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/breathelite-longline-active-tunic`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
