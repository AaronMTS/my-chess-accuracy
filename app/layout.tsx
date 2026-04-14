import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "./fonts";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MyChessAccuracy",
  description: "View the overall accuracy of your chess games and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.className} bg-surface text-onSurface antialiased`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
