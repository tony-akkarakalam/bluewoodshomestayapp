import type { AppProps } from "next/app";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";

import "swiper/css";
import "swiper/css/pagination";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-RRV6KHBND0"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RRV6KHBND0');
        `}
      </Script>

      <div className={`${inter.variable} ${playfair.variable} font-body`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}