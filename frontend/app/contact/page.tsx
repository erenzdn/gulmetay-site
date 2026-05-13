import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo.config";
import ContactClient from "./ContactClient";

export const metadata: Metadata = createMetadata({
  title: "İletişim",
  description:
    "Gülmetay İnşaat ile iletişime geçin. Başakşehir, İstanbul merkezli ofisimizi ziyaret edin veya ücretsiz proje danışmanlığı için formu doldurun.",
  keywords: [
    "Gülmetay İnşaat iletişim",
    "inşaat firması iletişim",
    "Başakşehir inşaat",
    "ücretsiz proje danışmanlığı",
    "İstanbul inşaat teklif",
  ],
  openGraph: {
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
});

export default function ContactPage() {
  return <ContactClient />;
}
