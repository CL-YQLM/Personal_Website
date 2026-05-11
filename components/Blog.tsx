"use client";

import { motion } from "framer-motion";

export default function Blog() {
  return (
    <section id="blog" className="max-w-4xl mx-auto px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-sm text-black/40 font-mono tracking-widest uppercase mb-3">
          Writing
        </p>
        <h2 className="text-4xl font-bold tracking-tight">Blog</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="flex flex-col items-center justify-center py-16 gap-3 border border-dashed border-black/15 rounded-2xl"
      >
        <span className="text-3xl">✍️</span>
        <p className="text-base font-medium text-black/50">More posts coming soon</p>
        <p className="text-sm text-black/30">Stay tuned — thoughts on hardware, AI, and building things.</p>
      </motion.div>
    </section>
  );
}
