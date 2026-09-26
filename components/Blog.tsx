"use client";

import { motion } from "framer-motion";

export default function Blog() {
  return (
    <section id="blog" className="max-w-4xl mx-auto px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-sm text-black/40 font-mono tracking-widest uppercase mb-3">
          Writing
        </p>
        <h2 className="text-4xl font-bold tracking-tight">Blog</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-center justify-center py-24 border border-dashed border-black/10 rounded-2xl"
      >
        <p className="text-sm text-black/35">Coming soon</p>
      </motion.div>
    </section>
  );
}
