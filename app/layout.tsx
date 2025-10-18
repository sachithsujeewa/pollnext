import type { Metadata } from "next";
import "./globals.css";
import "@material-icons/font/css/baseline.css";

export const metadata: Metadata = {
  title: "ASK AKD",
  description: "Ask questions and engage with the community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

