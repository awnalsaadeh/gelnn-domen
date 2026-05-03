import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "نور - منهج غلين دومان",
  description: "نظام تعليمي للأطفال المبكرين باستخدام منهج غلين دومان",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#D4780A" />
      </head>
      <body className="font-arabic warm-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
