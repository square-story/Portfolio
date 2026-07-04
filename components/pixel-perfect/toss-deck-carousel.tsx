"use client";

/**
 * A messy pile of polaroids — flick the top one away and it flies off with your throw while the pile shuffles up and a new photo slips in underneath. Tosses itself when you leave it alone; the pile never runs out.
 */

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryItem } from "@/app/data";

const STACK = 4; // photos visible in the pile
const TOSS_DISTANCE = 100; // px of drag before a release commits
const TOSS_VELOCITY = 500; // px/s of flick that commits regardless

// deterministic per-photo tilt so the pile always looks the same kind of messy
const tiltOf = (i: number) => ((i * 37) % 9) - 4;

const tossVariants = {
  exit: (dir: number) => ({
    x: dir * 600,
    y: -80,
    rotate: dir * 32,
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" as const },
  }),
};

interface TossDeckCarouselProps {
  items: GalleryItem[];
}

const TossDeckCarousel = ({ items }: TossDeckCarouselProps) => {
  const [[active, dir], setDeck] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const toss = (d: number) => {
    setDeck(([a]) => [a + 1, d]);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => toss(active % 2 === 0 ? 1 : -1), 2800);
    return () => clearInterval(id);
  }, [paused, active]);

  if (items.length === 0) return null;

  return (
    <div
      className="relative flex h-[80vh] w-full select-none items-center justify-center overflow-hidden"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="relative h-80 w-64">
        <AnimatePresence initial={false} custom={dir}>
          {Array.from({ length: Math.min(STACK, items.length) }).map((_, p) => {
            const idx = active + p;
            const photo = items[idx % items.length];
            const isTop = p === 0;

            return (
              <motion.div
                key={idx}
                custom={dir}
                variants={tossVariants}
                initial={{
                  y: -STACK * 12 - 20,
                  scale: 1 - STACK * 0.05,
                  opacity: 0,
                  rotate: tiltOf(idx),
                }}
                animate={{
                  x: idx % 2 === 0 ? 4 : -4,
                  y: -p * 12,
                  scale: 1 - p * 0.05,
                  rotate: isTop ? tiltOf(idx) / 2 : tiltOf(idx),
                  opacity: 1,
                }}
                exit="exit"
                transition={{ type: "spring", stiffness: 240, damping: 26 }}
                style={{ zIndex: STACK - p }}
                className={`absolute inset-0 bg-white p-3 pb-12 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5 ${
                  isTop ? "cursor-grab active:cursor-grabbing" : ""
                }`}
                drag={isTop}
                dragSnapToOrigin
                dragElastic={0.9}
                whileDrag={{ scale: 1.04 }}
                onDragEnd={(_, info) => {
                  const flung =
                    Math.abs(info.offset.x) > TOSS_DISTANCE ||
                    Math.abs(info.velocity.x) > TOSS_VELOCITY;
                  if (flung) toss(info.offset.x + info.velocity.x > 0 ? 1 : -1);
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    draggable={false}
                    sizes="240px"
                    priority={isTop}
                    className="pointer-events-none object-cover"
                  />
                </div>
                <p className="pointer-events-none absolute bottom-3.5 left-0 right-0 text-center font-serif text-sm italic text-neutral-600">
                  {photo.title}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="pointer-events-none absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        flick the top photo
      </p>
    </div>
  );
};

export default TossDeckCarousel;
