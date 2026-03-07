import { motion } from "framer-motion";
import { CalendarCheck2, Instagram, MessageCircle } from "lucide-react";

const actions = [
  {
    label: "WhatsApp",
    href: "https://wa.me/919745953821",
    icon: MessageCircle
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bluewoods_homestay",
    icon: Instagram
  },
  {
    label: "Book Now",
    href: "https://www.airbnb.co.in/rooms/1627311904688187077",
    icon: CalendarCheck2
  }
];

export default function FloatingButtons() {
  return (
    <div
      className="fixed z-40 flex flex-col gap-2"
      style={{
        bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))",
        right: "max(1rem, calc(env(safe-area-inset-right) + 0.75rem))"
      }}
    >
      {actions.map((action) => (
        <motion.a
          key={action.label}
          href={action.href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-2 rounded-full border border-white/[0.45] bg-[#0D466F]/[0.88] px-4 py-2.5 text-sm font-medium text-white shadow-glass backdrop-blur transition hover:bg-[#115788]"
          aria-label={action.label}
        >
          <action.icon size={16} className="transition group-hover:text-blue-100" />
          <span className="hidden sm:inline">{action.label}</span>
        </motion.a>
      ))}
    </div>
  );
}
