import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";
import { manrope, spaceGrotesk } from "./fonts";
import ClientSideProvider from "../providers/ClientProviders";

export const metadata: Metadata = {
  title: "MyChessAccuracy | Overall Accuracy & Top 3 Rivals",
  description:
    "See your overall accuracy and identify your biggest rivals by analyzing your chess games—for free. No sign-up required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.className} ${spaceGrotesk.variable} bg-surface text-onSurface antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <div id="modal_root"></div>
        <ClientSideProvider>{children}</ClientSideProvider>
        <Analytics />
      </body>
    </html>
  );
}
