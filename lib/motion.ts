export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const OFFSET = 10;
const STAGGER = 0.06;

type RevealOptions = {
  x?: number;
  y?: number;
  delay?: number;
  amount?: number;
};

// Shared scroll-reveal props for motion elements, so every section fades in
// with the same distance, duration and easing.
export function reveal({
  x = 0,
  y = 0,
  delay = 0,
  amount = 0.2,
}: RevealOptions = {}) {
  return {
    initial: { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: 0.5, delay, ease: EASE_OUT },
  };
}

export const alternateX = (index: number) =>
  index % 2 === 0 ? -OFFSET : OFFSET;

export const stagger = (index: number) => index * STAGGER;

// Group reveal: one viewport observer on the container drives every child, so
// items stagger in a single cascade instead of each waiting on its own
// intersection plus an index-based delay.
export const revealContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER,
    },
  },
};

export const revealItemVariants = ({ x = 0, y = 0 }: RevealOptions = {}) => ({
  hidden: { opacity: 0, x, y },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
});

export const heroContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER,
      delayChildren: 0.08,
    },
  },
};

export const heroItemVariants = {
  hidden: {
    opacity: 0,
    x: -OFFSET,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: EASE_OUT,
    },
  },
};
