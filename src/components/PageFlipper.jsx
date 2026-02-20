import { motion } from 'framer-motion';

const variants = {
  enter: (direction) => ({
    rotateY: direction > 0 ? 4 : -4,
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    rotateY: 0,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    rotateY: direction < 0 ? 4 : -4,
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
};

export default function PageFlipper({ children, direction }) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ transformOrigin: 'left center', perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}
