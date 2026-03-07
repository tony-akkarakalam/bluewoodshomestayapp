import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import fs from "fs";
import path from "path";
import AboutSection from "@/components/AboutSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import AttractionsSection from "@/components/AttractionsSection";
import ContactSection from "@/components/ContactSection";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import HostSection from "@/components/HostSection";
import LocationSection from "@/components/LocationSection";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import SplashScreen from "@/components/SplashScreen";
import StaySection from "@/components/StaySection";
import type { GalleryCategory } from "@/types";

type HomeProps = {
  heroImages: string[];
  aboutImage: string;
  logoImage: string;
  ownerImage: string;
  galleryCategories: GalleryCategory[];
};

const fallbackHeroImages = ["/images/hero/hero1.jpg", "/images/hero/hero2.jpg", "/images/hero/hero3.jpg"];

const galleryFolders = [
  { key: "exterior", title: "Exterior" },
  { key: "rooms", title: "Rooms" },
  { key: "bathroom", title: "Bathroom" },
  { key: "views", title: "Views" },
  { key: "common-area", title: "Common Area" },
  { key: "balcony-garden", title: "Balcony Garden" },
  { key: "night-view", title: "Night View" }
];

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const imagesRoot = path.join(process.cwd(), "public", "images");
  const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
  const readFolderImages = (folderName: string) => {
    const folderPath = path.join(imagesRoot, folderName);
    if (!fs.existsSync(folderPath)) return [];

    return fs
      .readdirSync(folderPath)
      .filter((fileName) => supportedExtensions.has(path.extname(fileName).toLowerCase()))
      .sort((left, right) => left.localeCompare(right))
      .map((fileName) => `/images/${folderName}/${fileName}`);
  };

  const galleryCategories: GalleryCategory[] = galleryFolders.map((folder) => {
    const images = readFolderImages(folder.key);

    return {
      key: folder.key,
      title: folder.title,
      images
    };
  });
  const heroImages = readFolderImages("hero");
  const logoImages = readFolderImages("logo");
  const ownerImages = readFolderImages("owner");

  const resolvedHeroImages =
    heroImages.length > 0 ? heroImages.slice(0, Math.max(3, heroImages.length)) : fallbackHeroImages;
  const logoImage = logoImages[0] ?? "/images/logo/logo.png";
  const ownerImage = ownerImages[0] ?? "/images/owner/owner.jpg";

  const aboutImage =
    galleryCategories.find((category) => category.key === "views" && category.images.length > 0)
      ?.images[0] ??
    galleryCategories.find((category) => category.images.length > 0)?.images[0] ??
    resolvedHeroImages[0];

  return {
    props: {
      heroImages: resolvedHeroImages,
      logoImage,
      ownerImage,
      aboutImage,
      galleryCategories
    }
  };
};

export default function Home({
  heroImages: heroSlides,
  logoImage,
  ownerImage,
  aboutImage,
  galleryCategories
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (window.location.hash !== "#home") {
      const homeUrl = `${window.location.pathname}${window.location.search}#home`;
      window.history.replaceState(null, "", homeUrl);
    }
  }, []);

  useEffect(() => {
    if (!splashComplete) {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }
    document.body.style.overflow = "";
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [splashComplete]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: "Bluewoods Homestay",
      slogan: "Breathe in the Blue.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 5.0,
        reviewCount: 1
      },
      telephone: "+91 9745953821",
      url: "https://bluewoodshomestay.in",
      image: heroSlides.map((slide) => `https://bluewoodshomestay.in${slide}`),
      sameAs: [
        "https://www.airbnb.co.in/rooms/1627311904688187077",
        "https://www.instagram.com/bluewoods_homestay"
      ]
    }),
    [heroSlides]
  );

  return (
    <>
      <Head>
        <title>Bluewoods Homestay | Your Nature Retreat Near Kochi</title>
        <meta
          name="description"
          content="Bluewoods Homestay is a peaceful nature retreat near Kochi with boutique comfort, cinematic views, and premium hospitality."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta
          name="keywords"
          content="Bluewoods Homestay, homestay near Kochi, Airbnb Kerala, luxury homestay, nature retreat"
        />
        <meta property="og:title" content="Bluewoods Homestay | Your Nature Retreat" />
        <meta
          property="og:description"
          content="Breathe in the Blue. Peaceful boutique-style homestay near Kochi."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bluewoodshomestay.in" />
        <meta property="og:image" content="https://bluewoodshomestay.in/images/hero/hero1.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bluewoods Homestay | Your Nature Retreat" />
        <meta
          name="twitter:description"
          content="Cinematic, peaceful boutique homestay experience near Kochi."
        />
        <link rel="canonical" href="https://bluewoodshomestay.in" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/images/logo/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {!splashComplete && <SplashScreen logoSrc={logoImage} onComplete={() => setSplashComplete(true)} />}
      <Navbar logoSrc={logoImage} />

      <motion.main
        initial={false}
        animate={{ opacity: splashComplete ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-40 left-0 h-96 w-96 rounded-full bg-[#8ac9ff33] blur-3xl dark:bg-[#26405a66]" />
          <div className="absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#3c7ab622] blur-3xl dark:bg-[#1f3a5566]" />
        </div>
        <HeroSection heroImages={heroSlides} />
        <AboutSection imageSrc={aboutImage} />
        <StaySection />
        <AmenitiesSection />
        <GallerySection categories={galleryCategories} />
        <AttractionsSection />
        <LocationSection />
        <ReviewsSection />
        <HostSection hostImage={ownerImage} />
        <ContactSection />
        <Footer logoSrc={logoImage} />
      </motion.main>
      <FloatingButtons />
    </>
  );
}
