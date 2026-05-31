import type { Metadata } from "next";
import "./globals.css";
import { manrope, spaceGrotesk } from "./fonts";
import ClientSideProvider from "../providers/ClientProviders";

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
      className={`${manrope.className} ${spaceGrotesk.variable} bg-surface text-onSurface antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <div id="modal_root"></div>
        <ClientSideProvider>{children}</ClientSideProvider>
      </body>
    </html>
  );
}
