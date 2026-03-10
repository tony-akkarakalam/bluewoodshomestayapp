import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { MouseEvent, useEffect, useMemo, useState } from "react";

type HeroSectionProps = {
  heroImages: string[];
};

type Ripple = {
  id: number;
  x: number;
  y: number;
};

const fallbackImages = ["/images/hero/hero1.jpg", "/images/hero/hero2.jpg", "/images/hero/hero3.jpg"];
const SLIDE_INTERVAL_MS = 6200;

export default function HeroSection({ heroImages }: HeroSectionProps) {
  const slides = heroImages.length ? heroImages : fallbackImages;
  const [activeSlide, setActiveSlide] = useState(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [mobileGpuSafeMode, setMobileGpuSafeMode] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const useMinimalMotion = mobileGpuSafeMode || Boolean(prefersReducedMotion);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, useMinimalMotion ? 0 : 88]);
  const glowY = useTransform(scrollY, [0, 900], [0, useMinimalMotion ? 0 : 140]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px), (hover: none), (pointer: coarse)");

    const applyMode = () => {
      setMobileGpuSafeMode(mediaQuery.matches);
    };

    applyMode();
    mediaQuery.addEventListener("change", applyMode);
    return () => mediaQuery.removeEventListener("change", applyMode);
  }, []);

  useEffect(() => {
    const preloaders = slides.map((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
      return image;
    });

    return () => {
      preloaders.forEach((image) => {
        image.src = "";
      });
    };
  }, [slides]);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const transitionScale = useMemo(
    () => (useMinimalMotion ? 1 : 1.075),
    [useMinimalMotion]
  );

  const handleBookClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      {
        id,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    ]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 760);
  };

  return (
    <section id="home" className="screen-safe-height relative min-h-[39rem] w-full overflow-hidden">
      <motion.div style={useMinimalMotion ? undefined : { y: imageY }} className="absolute inset-0">
        {slides.map((src, index) => (
          <motion.div
            key={`${src}-${index}`}
            className="hero-layer-stable absolute inset-0"
            animate={{
              opacity: index === activeSlide ? 1 : 0,
              scale: index === activeSlide ? transitionScale : 1
            }}
            transition={{
              opacity: { duration: useMinimalMotion ? 0.78 : 1.15, ease: "easeInOut" },
              scale: { duration: useMinimalMotion ? 0.01 : 6.4, ease: "linear" }
            }}
          >
            <Image
              src={src}
              alt="Bluewoods Homestay scenic view"
              fill
              priority={index === 0}
              sizes="100vw"
              className={[
                "hero-layer-stable object-cover",
                useMinimalMotion ? "" : "scale-[1.02]"
              ].join(" ")}
            />
            <div className="absolute inset-0 bg-[#041d34]/30" />

            {!useMinimalMotion && (
              <>
                <div className="absolute inset-0 px-4 py-16 sm:px-8">
                  <div className="relative mx-auto h-full w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-[0_24px_60px_rgba(4,22,39,0.38)] backdrop-blur-[1px]">
                    <Image
                      src={src}
                      alt="Bluewoods Homestay scenic view"
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                </div>
                <Image
                  src={src}
                  alt="Bluewoods Homestay scenic view"
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="hero-layer-stable object-cover opacity-20 mix-blend-screen"
                />
              </>
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-hero-overlay" />
      {!useMinimalMotion && (
        <motion.div
          style={{ y: glowY }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_22%,rgba(119,204,255,0.28),transparent_42%),radial-gradient(circle_at_78%_18%,rgba(145,212,255,0.2),transparent_48%)]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(6,25,44,0.28),transparent_32%,rgba(7,30,54,0.38))]" />

      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.17,
                delayChildren: 0.32
              }
            }
          }}
          className="max-w-4xl"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-100/90 sm:text-base"
          >
            Your Nature Retreat
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-heading text-4xl text-white sm:text-6xl lg:text-7xl"
          >
            Bluewoods Homestay
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mt-4 text-lg font-medium text-blue-100 sm:text-2xl"
          >
            Breathe in the Blue.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mt-9 flex items-center justify-center"
          >
            <motion.a
              href="https://www.airbnb.co.in/rooms/1627311904688187077"
              target="_blank"
              rel="noreferrer"
              onClick={handleBookClick}
              className="btn-primary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Book Now</span>
              <ArrowRight size={16} className="relative z-10" />
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="ripple"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 16,
                    height: 16
                  }}
                />
              ))}
            </motion.a>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-6 text-sm font-medium text-blue-100/95"
          >
            {"\u2605"} 5.0 on Airbnb
          </motion.p>
        </motion.div>
      </div>

      <div
        className="absolute inset-x-0 z-10 flex justify-center"
        style={{ bottom: "max(2rem, calc(env(safe-area-inset-bottom) + 1.25rem))" }}
      >
        <motion.a
          href="#about"
          aria-label="Scroll to next section"
          className="rounded-full border border-white/[0.35] bg-white/10 p-2 text-white backdrop-blur"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.a>
      </div>
    </section>
  );
}

