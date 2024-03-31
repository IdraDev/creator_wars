import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Wars - Chi ha più followers su Instagram?",
  description:
    "Numerosi influencer messi a confronto. Chi ha più followers tra i due? Quanto li conosci?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
