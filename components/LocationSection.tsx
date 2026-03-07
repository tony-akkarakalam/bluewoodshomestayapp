import { motion } from "framer-motion";
import { LocateFixed, Plane, Train } from "lucide-react";

const distances = [
  { label: "Cochin International Airport", value: "18.8 km", icon: Plane },
  { label: "Aluva Railway Station", value: "10.2 km", icon: Train },
  { label: "Ernakulam North Railway Station", value: "16.5 km", icon: Train }
];

export default function LocationSection() {
  return (
    <section id="location" className="py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <h2 className="section-title">Location</h2>
          <p className="section-subtitle">
            Tucked into a serene pocket near Kochi, Bluewoods offers peaceful surroundings with
            quick access to key transit points.
          </p>
        </motion.div>

        <div className="mt-9 grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="overflow-hidden rounded-3xl border border-blue-100/80 bg-white/70 shadow-soft dark:border-[#5c86a9] dark:bg-[#1a4465]/95"
          >
            <iframe
              title="Bluewoods Homestay Location"
              src="https://www.google.com/maps?q=Bluewoods%20Homestay&output=embed"
              className="h-[22rem] w-full border-0 sm:h-[28rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="soft-card rounded-3xl p-6 sm:p-7"
          >
            <h3 className="font-heading text-2xl text-bluewoods-ink dark:text-white">Distances</h3>
            <ul className="mt-5 space-y-4">
              {distances.map((distance) => (
                <li
                  key={distance.label}
                  className="flex items-start justify-between gap-3 rounded-xl border border-blue-100/70 bg-white/80 px-4 py-3 dark:border-[#5c86a9] dark:bg-[#1f4c70]/95"
                >
                  <span className="flex items-center gap-2 text-sm text-bluewoods-ink dark:text-white">
                    <distance.icon size={15} className="text-bluewoods-deep dark:text-blue-200" />
                    {distance.label}
                  </span>
                  <span className="text-sm font-semibold text-bluewoods-deep dark:text-white">
                    {distance.value}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="https://maps.app.goo.gl/5DVbtkh6HL6reXhW7"
              target="_blank"
              rel="noreferrer"
              className="btn-outline mt-7 w-full"
            >
              <LocateFixed size={16} />
              Open in Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
