import { motion } from "framer-motion";
import { Instagram, MessageCircle, Phone } from "lucide-react";

const contactMethods = [
  {
    label: "Phone",
    value: "+91 9745953821",
    href: "tel:+919745953821",
    icon: Phone
  },
  {
    label: "WhatsApp",
    value: "+91 9745953821",
    href: "https://wa.me/919745953821",
    icon: MessageCircle
  },
  {
    label: "Instagram",
    value: "@bluewoods_homestay",
    href: "https://www.instagram.com/bluewoods_homestay",
    icon: Instagram
  }
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="rounded-[1.9rem] border border-blue-100/80 bg-gradient-to-br from-white to-blue-50 p-7 shadow-soft sm:p-10 dark:border-[#3b5d79] dark:from-[#10293f] dark:to-[#173754]"
        >
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Plan your stay at Bluewoods Homestay. Reach out directly for quick assistance and
            booking support.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                className="soft-card rounded-2xl p-5 transition hover:-translate-y-1"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-bluewoods-deep dark:bg-[#193b5a] dark:text-blue-200">
                  <method.icon size={18} />
                </span>
                <p className="mt-4 text-sm text-[#47647f] dark:text-blue-200/85">{method.label}</p>
                <p className="mt-1 font-semibold text-bluewoods-ink dark:text-blue-100">{method.value}</p>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://wa.me/919745953821" target="_blank" rel="noreferrer" className="btn-primary">
              <MessageCircle size={16} />
              WhatsApp Now
            </a>
            <a
              href="https://www.airbnb.co.in/rooms/1627311904688187077"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              Book on Airbnb
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
