import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo.config";
import AboutClient from "./AboutClient";

export const metadata: Metadata = createMetadata({
  title: "Hakkımızda",
  description:
    "Gülmetay İnşaat — 1994'ten beri endüstriyel yapı, iskele sistemleri ve mühendislik çözümlerinde 30 yılı aşkın tecrübe.",
  keywords: [
    "Gülmetay İnşaat hakkında",
    "inşaat firması tarihçe",
    "endüstriyel yapı tecrübesi",
    "iskele sistemleri uzmanı",
    "İstanbul inşaat firması",
  ],
  openGraph: {
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
});

export default function AboutPage() {
  return <AboutClient />;
}
