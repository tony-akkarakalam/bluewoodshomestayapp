import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState
} from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Stay", href: "#stay" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" }
];

type NavbarProps = {
  logoSrc: string;
};

type Theme = "light" | "dark";

const THEME_TOGGLE_GUARD_MS = 220;
const MENU_TOGGLE_GUARD_MS = 260;
const NAV_CLICK_GUARD_MS = 420;

export default function Navbar({ logoSrc }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [menuToggleLocked, setMenuToggleLocked] = useState(false);
  const lastThemeToggleAtRef = useRef(0);
  const lastMenuToggleAtRef = useRef(0);
  const lastNavClickAtRef = useRef(0);
  const menuUnlockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    let ticking = false;
    let rafId = 0;

    const applyScrollState = () => {
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev === next ? prev : next));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(applyScrollState);
    };

    applyScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    return () => {
      if (menuUnlockTimerRef.current !== null) {
        window.clearTimeout(menuUnlockTimerRef.current);
      }
    };
  }, []);

  const withinGuardWindow = (now: number, lastTriggeredAt: number, windowMs: number) =>
    now - lastTriggeredAt < windowMs;

  const toggleTheme = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const now = event.timeStamp;
    if (withinGuardWindow(now, lastThemeToggleAtRef.current, THEME_TOGGLE_GUARD_MS)) return;
    lastThemeToggleAtRef.current = now;

    setTheme((previousTheme) => {
      const nextTheme: Theme = previousTheme === "dark" ? "light" : "dark";
      return nextTheme;
    });
  };

  const handleMenuToggle = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const now = event.timeStamp;
    if (menuToggleLocked) return;
    if (withinGuardWindow(now, lastMenuToggleAtRef.current, MENU_TOGGLE_GUARD_MS)) return;
    lastMenuToggleAtRef.current = now;

    setMenuToggleLocked(true);
    setOpen((prev) => !prev);

    if (menuUnlockTimerRef.current !== null) {
      window.clearTimeout(menuUnlockTimerRef.current);
    }
    menuUnlockTimerRef.current = window.setTimeout(() => {
      setMenuToggleLocked(false);
      menuUnlockTimerRef.current = null;
    }, MENU_TOGGLE_GUARD_MS);
  };

  const handleNavClick = (href: string) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const now = event.timeStamp;
    event.preventDefault();

    if (withinGuardWindow(now, lastNavClickAtRef.current, NAV_CLICK_GUARD_MS)) return;
    lastNavClickAtRef.current = now;

    if (open) {
      setOpen(false);
    }

    const target = document.querySelector(href);
    if (!target) return;

    const targetTop = (target as HTMLElement).offsetTop;
    const navOffset = 88;
    const nextTop = Math.max(0, targetTop - navOffset);
    const nearHome = href === "#home" && window.scrollY < 48;

    if (!nearHome) {
      window.scrollTo({ top: nextTop, behavior: "smooth" });
    }

    const currentBase = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", `${currentBase}${href}`);
  };

  return (
    <header
      className="fixed z-50 w-full px-3 sm:px-6"
      style={{
        top: "max(0.75rem, calc(env(safe-area-inset-top) + 0.5rem))",
        paddingLeft: "max(0.75rem, calc(env(safe-area-inset-left) + 0.5rem))",
        paddingRight: "max(0.75rem, calc(env(safe-area-inset-right) + 0.5rem))"
      }}
    >
      <nav
        className={[
          "section-shell mx-auto flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:rounded-full sm:px-6",
          scrolled
            ? "border border-[#d5e8f9] bg-white/[0.9] shadow-[0_18px_45px_rgba(7,44,77,0.14)] backdrop-blur-xl dark:border-[#2d4761] dark:bg-[#0b2033]/90 dark:shadow-[0_18px_45px_rgba(3,12,23,0.5)]"
            : "border border-white/45 bg-white/[0.18] shadow-[0_16px_40px_rgba(7,44,77,0.2)] backdrop-blur-xl dark:border-white/20 dark:bg-[#0b2033]/45 dark:shadow-[0_16px_40px_rgba(3,12,23,0.55)]"
        ].join(" ")}
      >
        <a href="#home" onClick={handleNavClick("#home")} className="flex items-center gap-3">
          <span className="relative h-10 w-28 overflow-hidden rounded-xl border border-white/40 bg-white/95 p-1 shadow-sm dark:border-white/20 dark:bg-white/90">
            <Image src={logoSrc} alt="Bluewoods logo" fill sizes="112px" className="object-contain" />
          </span>
          <span
            className={`hidden font-heading text-lg sm:inline sm:text-xl ${scrolled ? "text-bluewoods-deep dark:text-white" : "text-white"}`}
          >
            Bluewoods
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick(item.href)}
              className={[
                "group relative text-sm font-medium transition-colors",
                scrolled
                  ? "text-[#1a4469] hover:text-[#0d3658] dark:text-blue-100 dark:hover:text-white"
                  : "text-white/95 hover:text-white"
              ].join(" ")}
            >
              {item.label}
              <span
                className={[
                  "absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100",
                  scrolled ? "bg-bluewoods-deep dark:bg-white" : "bg-white"
                ].join(" ")}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={[
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
              scrolled
                ? "border-[#d2e5f6] bg-white/90 text-bluewoods-deep hover:bg-white dark:border-[#365671] dark:bg-[#10293f] dark:text-blue-100"
                : "border-white/35 bg-white/15 text-white hover:bg-white/25 dark:border-white/30 dark:bg-[#0f2b42]/45"
            ].join(" ")}
            aria-label="Toggle dark mode"
          >
            <span className="dark:hidden">
              <Moon size={17} />
            </span>
            <span className="hidden dark:inline">
              <Sun size={17} />
            </span>
          </button>

          <button
            type="button"
            onClick={handleMenuToggle}
            className={[
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden",
              menuToggleLocked ? "cursor-not-allowed opacity-80" : "",
              scrolled
                ? "border-[#d2e5f6] bg-white/90 text-bluewoods-deep hover:bg-white dark:border-[#365671] dark:bg-[#10293f] dark:text-blue-100"
                : "border-white/[0.35] bg-white/15 text-white hover:bg-white/25 dark:border-white/30 dark:bg-[#0f2b42]/45"
            ].join(" ")}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            disabled={menuToggleLocked}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <motion.div
            className="section-shell mt-3 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="rounded-2xl border border-[#d6e7f8] bg-white/95 p-4 shadow-[0_15px_40px_rgba(10,62,107,0.14)] backdrop-blur dark:border-[#2f4e68] dark:bg-[#10293f]/95">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick(item.href)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-bluewoods-ink transition hover:bg-blue-50 dark:text-blue-100 dark:hover:bg-[#173754]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
