import { motion } from "framer-motion";
import {
  Bath,
  BedDouble,
  CalendarClock,
  DoorOpen,
  Home,
  MapPinned,
  PawPrint,
  Users
} from "lucide-react";

const highlights = [
  { icon: PawPrint, label: "Pet Friendly" },
  { icon: DoorOpen, label: "Self Check-in" },
  { icon: MapPinned, label: "Highly Rated Location" },
  { icon: CalendarClock, label: "Long Term Stay Friendly" }
];

const homeFacts = [
  { icon: Home, value: "Entire Home" },
  { icon: BedDouble, value: "1 bedroom, 1 bed" },
  { icon: Bath, value: "1 bathroom" },
  { icon: Users, value: "Max guests: 3" }
];

const houseRules = [
  { label: "Check-in", value: "after 1:00 PM" },
  { label: "Checkout", value: "before 11:00 AM" }
];

export default function StaySection() {
  return (
    <section id="stay" className="py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="soft-card rounded-[1.8rem] p-6 sm:p-9"
        >
          <h2 className="section-title">Your Stay</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#2f4b66] dark:text-blue-100/90">
            Spacious and comfortable accommodation designed for peaceful relaxation. Ideal for
            couples, families, and travelers seeking a calm getaway surrounded by nature.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {homeFacts.map((fact) => (
              <div
                key={fact.value}
                className="rounded-2xl border border-blue-100/70 bg-white/90 p-4 text-sm text-bluewoods-ink dark:border-[#3b5d79] dark:bg-[#112f49]/85 dark:text-blue-100"
              >
                <fact.icon size={18} className="mb-2 text-bluewoods-deep dark:text-blue-200" />
                <p>{fact.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((highlight) => (
              <motion.div
                key={highlight.label}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-blue-100/70 bg-gradient-to-br from-white to-blue-50 p-4 shadow-sm dark:border-[#3b5d79] dark:from-[#112f49] dark:to-[#173754]"
              >
                <highlight.icon size={18} className="mb-2 text-bluewoods-deep dark:text-blue-200" />
                <p className="text-sm font-medium text-bluewoods-ink dark:text-blue-100">{highlight.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {houseRules.map((rule) => (
              <div
                key={rule.label}
                className="rounded-2xl border border-blue-100/70 bg-white/90 p-4 text-sm text-bluewoods-ink dark:border-[#3b5d79] dark:bg-[#112f49]/85 dark:text-blue-100"
              >
                <p className="font-semibold">{rule.label}</p>
                <p className="mt-1">{rule.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.airbnb.co.in/rooms/1627311904688187077"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Book on Airbnb
            </a>
            <a href="#contact" className="btn-outline">
              Contact Owner
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
