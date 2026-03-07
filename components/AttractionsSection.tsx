import { motion } from "framer-motion";
import { FerrisWheel, Landmark, Palmtree, ShoppingBag, Waves } from "lucide-react";

const attractions = [
  {
    title: "Wonderla Amusement Park",
    distance: "7.2 km",
    icon: FerrisWheel
  },
  {
    title: "Lulu Mall",
    distance: "Nearby",
    icon: ShoppingBag
  },
  {
    title: "Fort Kochi",
    distance: "Nearby",
    icon: Landmark
  },
  {
    title: "Marine Drive",
    distance: "Nearby",
    icon: Waves
  },
  {
    title: "Cherai Beach",
    distance: "Nearby",
    icon: Palmtree
  }
];

export default function AttractionsSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <h2 className="section-title">Nearby Attractions</h2>
          <p className="section-subtitle">
            Explore the best of Kochi with family entertainment, shopping, heritage, and beaches
            all within easy reach.
          </p>
        </motion.div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {attractions.map((attraction) => (
            <motion.article
              key={attraction.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.22 }}
              className="soft-card rounded-2xl p-5"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-bluewoods-deep dark:bg-[#193b5a] dark:text-blue-200">
                <attraction.icon size={18} />
              </div>
              <h3 className="text-base font-semibold text-bluewoods-ink dark:text-blue-100">{attraction.title}</h3>
              <p className="mt-2 text-sm text-[#37526c] dark:text-blue-200/90">{attraction.distance}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
