'use client';

import { motion } from 'framer-motion';

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}

type SectionTransitionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function SectionTransition({ children, className, delay = 0 }: SectionTransitionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {children}
    </motion.section>
  );
}
