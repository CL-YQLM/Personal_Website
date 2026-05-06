"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const links = [
  {
    label: "GitHub",
    handle: "@CL-YQLM",
    href: "https://github.com/CL-YQLM",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    handle: "Cici (Jiajia) Liu",
    href: "https://linkedin.com/in/jiajialiu07",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    handle: "ciciliu2@illinois.edu",
    href: "mailto:ciciliu2@illinois.edu",
    icon: Mail,
  },
];

function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("visit_counted");
    if (alreadyCounted) {
      fetch("/api/visit")
        .then((r) => r.json())
        .then((d) => { if (d.count !== null) setCount(d.count); })
        .catch(() => {});
    } else {
      fetch("/api/visit", { method: "POST" })
        .then((r) => r.json())
        .then((d) => {
          if (d.count !== null) setCount(d.count);
          sessionStorage.setItem("visit_counted", "1");
        })
        .catch(() => {});
    }
  }, []);

  return count;
}

export default function Contact() {
  const visitorCount = useVisitorCount();

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-14 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-sm text-black/40 font-mono tracking-widest uppercase mb-3">
          Get in touch
        </p>
        <h2 className="text-4xl font-bold tracking-tight">Contact</h2>
        <p className="mt-4 text-black/50 max-w-md leading-relaxed">
          Open to internship opportunities, research collaborations, and
          interesting conversations. Don&apos;t hesitate to reach out.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        {links.map(({ label, handle, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={label !== "Email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group flex-1 flex items-center gap-4 border border-black/8 rounded-2xl p-5 hover:border-black/25 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            <div className="p-2.5 rounded-xl bg-black/[0.04] group-hover:bg-black/[0.07] transition-colors">
              <Icon size={18} className="text-black/70" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-black/40 font-medium uppercase tracking-wide">
                {label}
              </p>
              <p className="text-sm font-semibold truncate mt-0.5">{handle}</p>
            </div>
            <ArrowUpRight
              size={16}
              className="text-black/20 group-hover:text-black/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
            />
          </a>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 text-center text-xs text-black/25 font-mono"
      >
        Built with Next.js & Tailwind — {new Date().getFullYear()}
        {visitorCount !== null && (
          <span className="ml-4 opacity-60">· {visitorCount.toLocaleString()} visitors</span>
        )}
      </motion.p>
    </section>
  );
}
