import { motion } from "framer-motion";
import Image from "next/image";

type HostSectionProps = {
  hostImage: string;
};

export default function HostSection({ hostImage }: HostSectionProps) {
  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="grid items-center gap-8 rounded-[1.8rem] border border-blue-100/80 bg-white/[0.82] p-7 shadow-soft sm:p-10 lg:grid-cols-[0.6fr_1.4fr] dark:border-[#5c86a9] dark:bg-[#1a4465]/95"
        >
          <div className="mx-auto">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-[0_10px_30px_rgba(10,62,107,0.22)] sm:h-48 sm:w-48">
              <Image
                src={hostImage}
                alt="Host Sam Thomas"
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-bluewoods-deep/80 dark:text-white/95">
              Meet Your Host
            </p>
            <h2 className="section-title">Sam Thomas</h2>
            <p className="mt-4 max-w-3xl leading-8 text-[#2f4b66] dark:text-white/95">
              Welcome to Bluewoods Homestay. We are dedicated to making every stay warm, smooth,
              and restorative. From local recommendations to thoughtful hospitality, your comfort
              and peace are always the priority. Expect a genuine homestay experience where you can
              slow down, reconnect with nature, and truly feel at home.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
