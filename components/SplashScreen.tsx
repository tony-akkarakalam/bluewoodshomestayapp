import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type SplashScreenProps = {
  logoSrc: string;
  onComplete: () => void;
};

export default function SplashScreen({ logoSrc, onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setVisible(false), 2000);
    const completeTimer = window.setTimeout(onComplete, 2400);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="screen-safe-height fixed inset-0 z-[140] overflow-hidden bg-gradient-to-br from-[#04192b] via-[#0b3f68] to-[#7bb8e8]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
            transition: { duration: 0.55, ease: "easeInOut" }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(183,226,255,0.38),transparent_34%),radial-gradient(circle_at_76%_70%,rgba(156,218,255,0.26),transparent_38%)]"
            animate={{ opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex h-full w-full flex-col items-center justify-center px-4 pb-20">
            <motion.div
              className="relative h-[52vh] w-full max-w-[96vw]"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <Image
                src={logoSrc}
                alt="Bluewoods Homestay logo"
                fill
                priority
                sizes="100vw"
                className="object-contain drop-shadow-[0_0_42px_rgba(205,236,255,0.7)]"
              />
            </motion.div>

            <div
              className="absolute left-1/2 w-[17rem] -translate-x-1/2 sm:w-[22rem]"
              style={{ bottom: "max(3rem, calc(env(safe-area-inset-bottom) + 2rem))" }}
            >
              <div className="mb-2 flex items-center justify-center gap-2">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-2 w-2 rounded-full bg-white/90"
                    animate={{ y: [0, -6, 0], opacity: [0.35, 1, 0.35] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: dot * 0.12
                    }}
                  />
                ))}
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#e8f8ff] via-white to-[#d6efff]"
                  initial={{ width: "4%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
              </div>
              <p className="mt-2 text-center text-xs uppercase tracking-[0.25em] text-blue-50/95">Loading</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
