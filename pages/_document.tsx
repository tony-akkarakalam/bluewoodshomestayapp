import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en-IN">
      <Head>

        {/* Theme */}
        <meta name="theme-color" content="#0A365B" />

        {/* SEO */}
        <meta
          name="description"
          content="Bluewoods Homestay – Your Nature Retreat near Kochi. Experience peaceful stays surrounded by greenery with premium comfort and homely hospitality."
        />

        <meta
          name="keywords"
          content="Bluewoods Homestay, Kochi homestay, Kerala stay, Airbnb Kochi, nature retreat, luxury homestay Kerala, stay near Kochi airport"
        />

        <meta name="author" content="Bluewoods Homestay" />

        {/* Open Graph / WhatsApp / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bluewoods Homestay | Your Nature Retreat" />

        <meta
          property="og:description"
          content="Experience a peaceful nature retreat near Kochi with premium comfort, greenery, and homely hospitality."
        />

        <meta property="og:url" content="https://bluewoodshomestay.in" />

        {/* IMPORTANT: replace with your actual preview image */}
        <meta property="og:image" content="https://bluewoodshomestay.in/seo/preview.jpg" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Bluewoods Homestay | Your Nature Retreat"
        />

        <meta
          name="twitter:description"
          content="Peaceful premium homestay near Kochi surrounded by greenery and comfort."
        />

        <meta
          name="twitter:image"
          content="https://bluewoodshomestay.in/seo/preview.jpg"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Apple Devices */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Mobile Browser Styling */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Prevent Dark Flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('dark');"
          }}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}