"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "NPUs Are Changing the Game — Here's What I Actually Think",
    date: "2026-04-22",
    readTime: "5 min read",
    excerpt:
      "Everyone's talking about NPUs like they're magic. As someone who works close to the hardware, I think the real story is more nuanced — and more interesting. My take on where neural processing units actually matter, where they don't, and why the edge AI shift is bigger than most people realize.",
    tags: ["AI", "Hardware", "NPU", "Opinion"],
    href: "/blog/npu-opinion",
  },
];

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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

      <div className="space-y-px">
        {posts.map((post, i) => (
          <motion.a
            key={post.title}
            href={post.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="group flex flex-col sm:flex-row sm:items-start gap-4 py-7 border-b border-black/8 hover:border-black/20 transition-colors"
          >
            <div className="shrink-0 w-36">
              <p className="text-xs text-black/40 font-mono">
                {formatDate(post.date)}
              </p>
              <p className="text-xs text-black/30 mt-1">{post.readTime}</p>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-lg leading-snug group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 mt-0.5 text-black/20 group-hover:text-black/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <p className="text-sm text-black/50 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-black/[0.04] rounded-full text-black/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
