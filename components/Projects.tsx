"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Terra Glide — John Deere Hackathon",
    description:
      "🥇 1st Place, HackIllinois John Deere Mechathon Track. Built a real-time autonomous vehicle control system for the John Deere Hackathon. Streamed live MJPEG video from an ESP32-CAM through a FastAPI backend and displayed it in a React dashboard. Integrated YOLOv8n person detection to automatically trigger a safety stop when a person entered the vehicle's path. Controlled motor speed (PWM), servo camera angle, dual lift mechanisms, and auxiliary motors over a rate-limited WebSocket proxy — all from a single browser interface.",
    tags: ["React", "FastAPI", "Python", "ESP32", "YOLOv8", "WebSocket", "Computer Vision"],
    links: [
      { label: "GitHub", href: "" },
    ],
    photo: "/hackillinois.jpg",
    status: "Completed",
  },
  {
    title: "Intelligent Cushion",
    description:
      "An embedded hardware system for improving sitting posture and comfort. Designed the logic as a finite state machine, created KiCad schematics and PCB layouts, and built a pressure-sensor-based posture monitor with heating, buzzer alerts, and a sitting-duration timer.",
    tags: ["Embedded C", "KiCad", "PCB Design", "Sensors", "FSM"],
    links: [
      { label: "GitHub (KiCad)", href: "" },
      { label: "Final Report", href: "" },
      { label: "Demo Video", href: "" },
    ],
    photo: "/intelligent-cushion.jpg",
    status: "In Progress",
  },
  {
    title: "EV Concept Embedded Systems",
    description:
      "Wrote embedded C on STM32 to decode real-time CAN bus messages and drive motor control via PWM duty cycles. Also developed accelerometer interfacing code and designed a custom KiCad PCB with hand-soldered SMD components.",
    tags: ["Embedded C", "STM32", "CAN Bus", "PWM", "KiCad", "PCB Design"],
    links: [
      { label: "GitHub", href: "" },
    ],
    photo: "",
    status: "In Progress",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const statusColors: Record<string, string> = {
  Completed: "bg-black/5 text-black/50",
  "In Progress": "bg-emerald-50 text-emerald-700",
  Archived: "bg-black/5 text-black/40",
};

export default function Projects() {
  return (
    <section id="projects" className="max-w-4xl mx-auto px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-sm text-black/40 font-mono tracking-widest uppercase mb-3">
          Work
        </p>
        <h2 className="text-4xl font-bold tracking-tight">Projects</h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="flex flex-col gap-5"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            className="group border border-black/8 rounded-2xl overflow-hidden hover:border-black/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col sm:flex-row"
          >
            {/* Photo */}
            <div className="sm:w-72 sm:shrink-0 h-48 sm:h-auto overflow-hidden bg-black/[0.02]">
              {project.photo ? (
                <img
                  src={project.photo}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl font-bold text-black/8 select-none font-mono">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Text */}
            <div className="p-6 flex flex-col justify-between gap-4 flex-1">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg leading-snug">
                    {project.title}
                  </h3>
                  <span
                    className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-black/55 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-black/[0.04] rounded-full text-black/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  {project.links.map(({ label, href }) =>
                    href ? (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-black/50 hover:text-black transition-colors"
                      >
                        {label} <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <span
                        key={label}
                        className="flex items-center gap-1 text-sm text-black/25 cursor-not-allowed"
                        title="Coming soon"
                      >
                        {label} <ArrowUpRight size={14} />
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
