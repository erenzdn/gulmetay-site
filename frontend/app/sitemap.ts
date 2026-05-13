import type { MetadataRoute } from "next";
import { SITE_URL, STRAPI_URL } from "@/lib/seo.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  let projectPages: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/projects?fields[0]=slug&fields[1]=updatedAt&pagination[pageSize]=100`,
      { next: { revalidate: 3600 } }
    );
    const json = await res.json();
    const projects = json.data || [];

    projectPages = projects.map(
      (project: { slug: string; updatedAt: string }) => ({
        url: `${SITE_URL}/projects/${project.slug}`,
        lastModified: new Date(project.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })
    );
  } catch {
    // Strapi unavailable — return static pages only
  }

  return [...staticPages, ...projectPages];
}
