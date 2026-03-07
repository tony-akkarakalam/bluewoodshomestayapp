import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Trees } from "lucide-react";

type AboutSectionProps = {
  imageSrc: string;
};

export default function AboutSection({ imageSrc }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[1.8rem] border border-blue-100/70 bg-[#032341] p-3 shadow-soft"
          >
            <div className="relative h-[16rem] w-full overflow-hidden rounded-2xl sm:h-[22rem] lg:h-[28rem]">
              <Image
                src={imageSrc}
                alt="Peaceful surroundings at Bluewoods Homestay"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-contain"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#082641]/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-bluewoods-ink dark:border-[#3b5d79] dark:bg-[#112f49]/85 dark:text-blue-100">
              <Leaf size={14} /> Nature Escape
            </p>
            <h2 className="section-title">A Peaceful Nature Retreat Near Kochi</h2>
            <p className="section-subtitle">
              Bluewoods Homestay is a peaceful homestay surrounded by greenery, offering clean
              rooms and a relaxing atmosphere near Kochi. Perfect for families, couples, and solo
              travelers looking for comfort and relaxation close to nature.
            </p>
            <p className="mt-5 max-w-2xl leading-8 text-[#2f4b66] dark:text-blue-100/90">
              Escape the noise and unwind in a calm and cozy stay where mornings begin with
              birdsong and evenings end in tranquility. The property offers a perfect balance
              between nature and city convenience.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-white/75 px-4 py-3 text-sm text-[#274766] shadow-sm dark:border-[#5c86a9] dark:bg-[#1d4566]/95 dark:text-white">
              <Trees size={16} className="text-bluewoods-deep dark:text-blue-200" />
              Boutique comfort in a lush green setting
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
