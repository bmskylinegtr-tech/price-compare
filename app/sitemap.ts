import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/sheets";
import { SITE_URL } from "@/lib/utils";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    ...products.map((p) => ({ url: `${SITE_URL}/compare/${p.slug}`, changeFrequency: "daily" as const, priority: 0.8 })),
  ];
}