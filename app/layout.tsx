import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://asgorithm.com"),
  title: "Asgorithm Technologies: We engineer systems that think",
  description:
    "Asgorithm is an engineering studio in Coimbatore. We design and build AI systems, blockchain infrastructure and high-performance software, from first principle to production.",
  icons: { icon: "/public/logo.png" },
  openGraph: {
    title: "Asgorithm Technologies",
    description: "We engineer systems that think. AI, blockchain and advanced software, built like products.",
    url: "https://asgorithm.com",
    siteName: "Asgorithm",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Asgorithm Technologies" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080a" },
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Asgorithm Technologies",
  url: "https://asgorithm.com",
  email: "hello@asgorithm.com",
  logo: "https://asgorithm.com/public/logo.png",
  sameAs: ["https://www.linkedin.com/company/asgorithm-technologies", "https://github.com/asgorithm"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641006",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(d){d.classList.add('js');try{var q=new URLSearchParams(location.search).get('theme');var t=q||localStorage.getItem('theme');if(t==='light'||t==='dark'){d.dataset.theme=t;if(q)localStorage.setItem('theme',q)}}catch(e){}})(document.documentElement)" }} />
      </head>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
