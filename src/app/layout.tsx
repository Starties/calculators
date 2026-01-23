import type { Metadata } from "next";
import { Inter } from "next/font/google"; // <-- This imports the font
import "./globals.css";
import Navbar from "@/app/components/navbar"; // <-- This imports your new Navbar

// This configures the font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calc_Hub // Secure Math",
  description: "Private, client-side calculator suite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}