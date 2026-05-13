import "./globals.css";
import { Roboto } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  ORGANIZATION_JSONLD,
} from "@/lib/seo.config";

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C1B33",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Endüstriyel Yapı & İskele Sistemleri`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Endüstriyel Yapı & İskele Sistemleri`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Endüstriyel Yapı & İskele Sistemleri`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={roboto.variable}>
      <body
        style={{ margin: 0, fontFamily: "var(--font-roboto), system-ui, sans-serif" }}
      >
        <JsonLd data={ORGANIZATION_JSONLD} />

        <Navbar />

        <main style={{ minHeight: "80vh" }}>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
