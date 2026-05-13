import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo.config";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = createMetadata({
  title: "Projelerimiz",
  description:
    "Gülmetay İnşaat tarafından tamamlanan ve devam eden endüstriyel yapı, konut ve kentsel dönüşüm projeleri. 1994'ten beri mühendislik çözümleri.",
  keywords: [
    "Gülmetay İnşaat projeleri",
    "tamamlanan inşaat projeleri",
    "endüstriyel yapı projeleri İstanbul",
    "konut projeleri",
    "kentsel dönüşüm projeleri",
  ],
  openGraph: {
    url: "/projects",
  },
  alternates: {
    canonical: "/projects",
  },
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}
