import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryCategory } from "@/types";

type GalleryImage = {
  src: string;
  category: string;
};

type LightboxState = {
  images: GalleryImage[];
  label: string;
  index: number;
};

type GallerySectionProps = {
  categories: GalleryCategory[];
};

export default function GallerySection({ categories }: GallerySectionProps) {
  const availableCategories = useMemo(
    () => categories.filter((category) => category.images.length > 0),
    [categories]
  );
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const filteredImages = useMemo(() => {
    const source =
      activeFilter === "all"
        ? availableCategories
        : availableCategories.filter((category) => category.key === activeFilter);

    return source.flatMap((category) =>
      category.images.map((src) => ({ src, category: category.title }))
    );
  }, [activeFilter, availableCategories]);

  const closeLightbox = () => {
    setLightbox(null);
  };

  const goPrev = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        index: (prev.index - 1 + prev.images.length) % prev.images.length
      };
    });
  }, []);

  const goNext = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        index: (prev.index + 1) % prev.images.length
      };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [goNext, goPrev, lightbox]);

  const currentImage = lightbox?.images[lightbox.index];

  return (
    <section id="gallery" className="py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">
            Browse cinematic snapshots from every corner of the property.
          </p>
        </motion.div>

        {availableCategories.length > 0 ? (
          <>
            <div className="hide-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  activeFilter === "all"
                    ? "border-bluewoods-deep bg-bluewoods-deep text-white dark:border-[#6ca4cf] dark:bg-[#234d70]"
                    : "border-blue-100 bg-white/75 text-bluewoods-ink hover:bg-white dark:border-[#33536e] dark:bg-[#10293f]/85 dark:text-blue-100 dark:hover:bg-[#173754]"
                ].join(" ")}
              >
                All
              </button>
              {availableCategories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActiveFilter(category.key)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    activeFilter === category.key
                      ? "border-bluewoods-deep bg-bluewoods-deep text-white dark:border-[#6ca4cf] dark:bg-[#234d70]"
                      : "border-blue-100 bg-white/75 text-bluewoods-ink hover:bg-white dark:border-[#33536e] dark:bg-[#10293f]/85 dark:text-blue-100 dark:hover:bg-[#173754]"
                  ].join(" ")}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredImages.map((image, index) => (
                <motion.button
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={() => {
                    setLightbox({
                      images: filteredImages,
                      label: activeFilter === "all" ? "All" : image.category,
                      index
                    });
                  }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group block w-full overflow-hidden rounded-2xl border border-blue-100/70 bg-white/90 p-2 text-left shadow-soft dark:border-[#35526d] dark:bg-[#173754]/95"
                >
                  <div className="overflow-hidden rounded-xl bg-[#051f36]">
                    <Image
                      src={image.src}
                      alt={`${image.category} at Bluewoods Homestay`}
                      width={1400}
                      height={1000}
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-2 pb-2 pt-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#5b7188] dark:text-blue-100/90">
                      {activeFilter === "all" ? "All" : image.category}
                    </p>
                    <p className="mt-1 font-semibold text-bluewoods-ink dark:text-white">{image.category}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-7 rounded-3xl border border-blue-100 bg-white/75 p-7 text-[#2f4b66] shadow-soft dark:border-[#35526d] dark:bg-[#10293f]/85 dark:text-blue-100">
            Property gallery folders are ready. Add images under
            <span className="mx-1 font-medium text-bluewoods-ink dark:text-white">/public/images/*</span> to
            populate this section automatically.
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && lightbox.images.length > 0 && currentImage && (
          <motion.div
            className="screen-safe-height fixed inset-0 z-[130] bg-[#061a2de3] p-4 backdrop-blur-md sm:p-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative mx-auto flex h-full max-w-6xl items-center justify-center"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close gallery"
                className="fixed z-[140] inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/20 px-3 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/30"
                style={{
                  right: "max(0.75rem, calc(env(safe-area-inset-right) + 0.5rem))",
                  top: "max(0.75rem, calc(env(safe-area-inset-top) + 0.5rem))"
                }}
              >
                <X size={18} />
                <span>Close</span>
              </button>

              <button
                type="button"
                aria-label="Previous image"
                onClick={goPrev}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/30 sm:left-7"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/30 sm:right-7"
              >
                <ChevronRight size={22} />
              </button>

              <div className="relative h-[72vh] max-h-[calc(100svh-7rem)] w-full overflow-hidden rounded-2xl border border-white/25 bg-black/30 sm:h-[78vh]">
                <Image
                  src={currentImage.src}
                  alt={`${currentImage.category} image`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div
                className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/30 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white backdrop-blur"
                style={{ bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.5rem))" }}
              >
                {lightbox.label} / {lightbox.index + 1}/{lightbox.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
