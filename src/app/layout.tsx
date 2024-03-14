import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import ReactQueryWrapper from "@/components/react-query-wrapper";
import MainLayout from "@/components/layouts/main-layout";
import SessionWrapper from "@/components/SessionWrapper";

const lato = Lato({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "WatchListify",
  description: "Watch Anime and Drama online for free at WatchListify.site",
  metadataBase: new URL(process.env.APP_URL as string),
  openGraph: {
    title: `Watch Anime and Drama online for free at WatchListify.site`,
    type: "website",
    images: "/images/logo.png",
    description: `The best website to watch anime and drama for free at WatchListify.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={lato.className}>
          <ReactQueryWrapper>
            <MainLayout>{children}</MainLayout>
          </ReactQueryWrapper>
        </body>
      </html>
    </SessionWrapper>
  );
}
