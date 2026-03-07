import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  AirVent,
  Bath,
  Bed,
  BriefcaseBusiness,
  Car,
  ChefHat,
  Droplets,
  KeyRound,
  ParkingCircle,
  PawPrint,
  Refrigerator,
  ShowerHead,
  Sparkles,
  UtensilsCrossed,
  Wifi
} from "lucide-react";

type AmenityGroup = {
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  items: string[];
};

const amenityGroups: AmenityGroup[] = [
  {
    title: "Bathroom",
    icon: Bath,
    items: ["Shampoo", "Hot water", "Shower gel"]
  },
  {
    title: "Bedroom",
    icon: Bed,
    items: ["Essentials", "Hangers", "Iron"]
  },
  {
    title: "Cooling",
    icon: AirVent,
    items: ["Air conditioning"]
  },
  {
    title: "Workspace",
    icon: BriefcaseBusiness,
    items: ["Wifi", "Dedicated workspace"]
  },
  {
    title: "Kitchen",
    icon: ChefHat,
    items: ["Kitchen", "Fridge", "Microwave", "Cooking basics", "Kettle", "Dining table"]
  },
  {
    title: "Outdoor",
    icon: Sparkles,
    items: ["Outdoor furniture"]
  },
  {
    title: "Parking",
    icon: ParkingCircle,
    items: ["Free parking", "EV charger"]
  },
  {
    title: "Services",
    icon: KeyRound,
    items: [
      "Pets allowed",
      "Breakfast provided",
      "Long-term stays allowed",
      "Self check-in",
      "24 hour building staff"
    ]
  }
];

const detailIcon: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Shampoo: Droplets,
  "Shower gel": ShowerHead,
  Essentials: Sparkles,
  Fridge: Refrigerator,
  Kitchen: UtensilsCrossed,
  Wifi,
  "Free parking": Car,
  "Pets allowed": PawPrint
};

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <h2 className="section-title">Amenities</h2>
          <p className="section-subtitle">
            Carefully selected comforts designed for effortless stays, whether you are here for a
            short retreat or an extended visit.
          </p>
        </motion.div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {amenityGroups.map((group) => (
            <motion.article
              key={group.title}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.22 }}
              className="soft-card rounded-2xl p-5"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-bluewoods-deep dark:bg-[#193b5a] dark:text-blue-200">
                <group.icon size={18} />
              </div>
              <h3 className="font-heading text-xl text-bluewoods-ink dark:text-blue-100">{group.title}</h3>

              <ul className="mt-4 space-y-2">
                {group.items.map((item) => {
                  const ItemIcon = detailIcon[item] ?? Sparkles;
                  return (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#314f6a] dark:text-blue-100/90">
                      <ItemIcon size={14} className="mt-0.5 shrink-0 text-bluewoods-deep/75 dark:text-blue-200/85" />
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
