import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Gülmetay İnşaat",
  description: "Modern inşaat ve konut projeleri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>
        
        {/* Üst Menü */}
        <Navbar />

        {/* Sayfa İçerikleri */}
        <main style={{ minHeight: "80vh" }}>
          {children}
        </main>

        {/* Alt Bilgi */}
        <Footer />
        
      </body>
    </html>
  );
}