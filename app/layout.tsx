import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
  { href: "/notes", label: "말하기" },
];

const B_BG = '#0b0907';
const B_SURFACE = '#1a1612';
const B_INK = '#fbf4e1';
const B_INK_DIM = '#b9a988';
const B_LINE = 'rgba(251, 244, 225, 0.14)';
const B_TAN = '#f0b878';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body { background: ${B_BG}; color: ${B_INK}; font-family: 'IBM Plex Sans KR', system-ui, sans-serif; margin: 0; }
          .nav-link { color: ${B_INK_DIM}; text-decoration: none; font-size: 12px; padding: 5px 12px; border-radius: 4px; transition: color 0.15s, background 0.15s; }
          .nav-link:hover { color: ${B_INK}; background: rgba(251, 244, 225, 0.06); }
        `}</style>
      </head>
      <body>
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: B_SURFACE,
          borderBottom: `1px solid ${B_LINE}`,
        }}>
          <div style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: '0 24px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Link href="/" style={{
              fontFamily: "'Gowun Batang', Georgia, serif",
              fontSize: '18px',
              fontWeight: 400,
              letterSpacing: '-0.5px',
              color: B_INK,
              textDecoration: 'none',
            }}>
              slow<span style={{ color: B_TAN }}>quick</span>
            </Link>
            <nav style={{ display: 'flex', gap: '2px' }}>
              {NAV.map(({ href, label }) => (
                <Link key={href} href={href} className="nav-link">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
