import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="overflow-hidden rounded-[1.9rem] border border-blue-100/80 bg-gradient-to-br from-[#0A3E6B] via-[#185987] to-[#2A77A7] p-8 text-white shadow-glass sm:p-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-7">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Guest Reviews</p>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl">★ 5.0 Airbnb Rating</h2>
              <p className="mt-3 max-w-xl text-blue-100">
                Travelers consistently highlight the serene atmosphere, cleanliness, and warm
                hospitality.
              </p>
            </div>

            <div className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur">
              <div className="mb-2 flex items-center gap-1 text-amber-300">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-blue-100">Verified Airbnb guest score</p>
            </div>
          </div>

          <a
            href="https://www.airbnb.co.in/rooms/1627311904688187077"
            target="_blank"
            rel="noreferrer"
            className="btn-outline mt-8 border-white/40 bg-white/20 text-white hover:bg-white/30"
          >
            Read Reviews on Airbnb
          </a>
        </motion.div>
      </div>
    </section>
  );
}
