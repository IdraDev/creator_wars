import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Wars - YouTube edition",
  description:
    "Numerosi YouTubers messi a confronto. Chi ha più iscritti tra i due? Quanto li conosci?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
