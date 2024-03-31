import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const font = Nunito({ subsets: ["latin"], weight: ["700", "800", "900"] });

export const metadata: Metadata = {
  title: "Creator Wars - Home",
  description:
    "Numerosi creator e influencer messi a confronto. Chi ha più followers/iscritti tra i due? Quanto li conosci?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
