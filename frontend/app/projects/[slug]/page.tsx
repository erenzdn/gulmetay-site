import type { Metadata } from "next";
import { SITE_NAME, STRAPI_URL, SITE_URL, SITE_DESCRIPTION } from "@/lib/seo.config";
import JsonLd from "@/components/JsonLd";
import ProjectDetailClient from "./ProjectDetailClient";

async function fetchProject(slug: string) {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    return json.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) {
    return {
      title: `Proje Bulunamadı | ${SITE_NAME}`,
      description: SITE_DESCRIPTION,
    };
  }

  const descriptionText =
    project.description?.[0]?.children?.[0]?.text?.substring(0, 160) ||
    `${project.title} - Gülmetay İnşaat projesi`;

  const ogImages = project.mainImage
    ? [{ url: `${STRAPI_URL}${project.mainImage.url}`, width: 1200, height: 630 }]
    : [];

  return {
    title: `${project.title} | ${SITE_NAME} Projeleri`,
    description: descriptionText,
    keywords: [
      project.title,
      project.category?.name,
      "Gülmetay İnşaat",
      "inşaat projesi",
      "endüstriyel yapı",
    ].filter(Boolean),
    openGraph: {
      title: `${project.title} | ${SITE_NAME}`,
      description: descriptionText,
      url: `/projects/${slug}`,
      images: ogImages,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: descriptionText,
      images: ogImages.map((img) => img.url),
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await fetchProject(slug);

  const projectJsonLd = project
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description:
          project.description?.[0]?.children?.[0]?.text || "",
        image: project.mainImage
          ? `${STRAPI_URL}${project.mainImage.url}`
          : undefined,
        url: `${SITE_URL}/projects/${slug}`,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        ...(project.category?.name && {
          genre: project.category.name,
        }),
      }
    : null;

  return (
    <>
      {projectJsonLd && <JsonLd data={projectJsonLd} />}
      <ProjectDetailClient />
    </>
  );
}
