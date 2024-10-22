import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Wars - Twitch edition",
  description:
    "Numerosi Streamer messi a confronto. Chi ha più followers tra i due? Quanto li conosci?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
