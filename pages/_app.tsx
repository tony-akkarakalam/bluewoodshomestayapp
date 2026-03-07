import type { AppProps } from "next/app";
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
    <div className={`${inter.variable} ${playfair.variable} font-body`}>
      <Component {...pageProps} />
    </div>
  );
}
