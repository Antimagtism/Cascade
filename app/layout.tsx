import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cascade",
  description: "Cascade v1.0 by Antimagtism: A powerful, simple, and intuitive tool for creating and developing web application with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        </body>
    </html>
  );
}
