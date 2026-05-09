import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "slowquick",
  description: "바이브코딩, 사업, 개념정리, 일지",
};

const NAV = [
  { href: "/", label: "All" },
  { href: "/category/바이브코딩", label: "바이브코딩" },
  { href: "/category/사업", label: "사업" },
  { href: "/category/개념정리", label: "개념정리" },
  { href: "/category/일지", label: "일지" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 text-gray-900">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight">slowquick</Link>
            <nav className="flex gap-1">
              {NAV.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm px-3 py-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
