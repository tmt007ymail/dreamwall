import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dreamwall — Make the company visible",
  description:
    "Write one founder dream. We turn it into a short film on a public wall the world can feel.",
  openGraph: {
    title: "Dreamwall",
    description:
      "Make the company visible before the logo exists. Write one sentence. Premiere it.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
