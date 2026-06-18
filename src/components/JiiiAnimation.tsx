"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type FloatingJiii = {
  id: number;
  x: number;
  delay: number;
  scale: number;
};

export default function JiiiAnimation() {
  const [isRunning, setIsRunning] = useState(true);
  const [floatingItems, setFloatingItems] = useState<FloatingJiii[]>([]);
  const idRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnJiii = useCallback(() => {
    const id = idRef.current++;
    const item: FloatingJiii = {
      id,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 0.3,
      scale: 0.6 + Math.random() * 0.8,
    };
    setFloatingItems((prev) => [...prev.slice(-18), item]);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    spawnJiii();
    intervalRef.current = setInterval(spawnJiii, 700);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, spawnJiii]);

  const removeItem = (id: number) => {
    setFloatingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a12]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        <motion.div
          className="relative"
          animate={
            isRunning
              ? {
                  scale: [1, 1.12, 0.95, 1.08, 1],
                  rotate: [0, -3, 3, -2, 0],
                }
              : { scale: 1, rotate: 0 }
          }
          transition={
            isRunning
              ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4 }
          }
        >
          <motion.h1
            className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-200 bg-clip-text text-8xl font-black tracking-tight text-transparent drop-shadow-2xl sm:text-9xl"
            animate={
              isRunning
                ? {
                    opacity: [0.85, 1, 0.9, 1, 0.85],
                    filter: [
                      "drop-shadow(0 0 20px rgba(167,139,250,0.5))",
                      "drop-shadow(0 0 40px rgba(232,121,249,0.8))",
                      "drop-shadow(0 0 20px rgba(167,139,250,0.5))",
                    ],
                  }
                : { opacity: 1, filter: "drop-shadow(0 0 10px rgba(167,139,250,0.3))" }
            }
            transition={
              isRunning
                ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.4 }
            }
          >
            Jiii
          </motion.h1>

          {isRunning && (
            <motion.span
              className="absolute -right-6 -top-4 text-3xl"
              animate={{ rotate: [0, 20, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ✨
            </motion.span>
          )}
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          whileHover={isRunning ? { scale: 1.05 } : undefined}
          whileTap={isRunning ? { scale: 0.95 } : undefined}
          className={`rounded-full px-10 py-4 text-lg font-semibold tracking-wide transition-all duration-300 ${
            isRunning
              ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50"
              : "cursor-not-allowed bg-zinc-800 text-zinc-500"
          }`}
        >
          {isRunning ? "Stop" : "Stopped"}
        </motion.button>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {isRunning &&
            floatingItems.map((item) => (
              <motion.span
                key={item.id}
                className="absolute bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl"
                style={{ left: `${item.x}%`, bottom: "-10%" }}
                initial={{ y: 0, opacity: 0, scale: 0.3 }}
                animate={{
                  y: "-120vh",
                  opacity: [0, 1, 1, 0],
                  scale: item.scale,
                  rotate: [-10, 10, -5],
                }}
                transition={{
                  duration: 4 + item.delay * 2,
                  delay: item.delay,
                  ease: "easeOut",
                }}
                onAnimationComplete={() => removeItem(item.id)}
              >
                Jiii
              </motion.span>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
