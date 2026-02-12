import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google"; // Official Google Fonts
import "@/styles/globals.css";
// Import KaTeX CSS globally for proper math rendering
import "katex/dist/katex.min.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asci Labs",
  description: "Asci Labs is the place where I experiment with things. Usually about STEM subjects.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Asci Labs",
    description: "Explorations in code, physics, and design.",
    siteName: "Asci Labs",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className={inter.className}>
        <div className="container">
          <Header />
          <main>{children}</main>
          <footer>
            &copy; {new Date().getFullYear()} My Blog. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
