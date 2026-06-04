import type { Metadata, Viewport } from 'next';
import { DM_Sans, EB_Garamond } from 'next/font/google';
import { seo } from '@/data/profile';
import GrainShader from '@/components/GrainShader';
import Nav from '@/components/Nav';
import '@/styles/globals.css';

const garamond = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-garamond',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.ogDescription,
    url: seo.siteUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: seo.title,
    description: seo.ogDescription,
  },
};

export const viewport: Viewport = {
  themeColor: '#F5F0E8',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${garamond.variable} ${dmSans.variable}`}>
        <noscript>{seo.noscript}</noscript>
        <Nav />
        <main className="site-main">{children}</main>
        <GrainShader />
      </body>
    </html>
  );
}
