'use client';

import { motion } from 'framer-motion';

const MONOLOGUE =
  'I grew up in Redmond, WA\u2009\u2014 surrounded by tech but more interested in what happened when it broke. Today I build production RAG systems for workflows that don\u2019t get a second chance to hallucinate in front of a real user. I care as much about how a system fails as I do about how it runs on a good day. I\u2019m drawn to the hard parts: tradeoff decisions, data that misbehaves, latency budgets that don\u2019t forgive.';

export default function HomeMonologue() {
  return (
    <section className="home-monologue" aria-label="About">
      <motion.p
        className="home-monologue-copy"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {MONOLOGUE}
      </motion.p>

      <motion.span
        className="home-monologue-devanagari font-hindi"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        बनाते रहो
      </motion.span>
    </section>
  );
}
