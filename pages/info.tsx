import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ui/ContactModal";
import { Github, Linkedin, Instagram } from "lucide-react";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { CloudCursor } from "@/components/ui/CloudCursor";

export default function Info() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data for Interests and Hobbies
  const [interests] = useState([
    { title: "Art Direction", desc: "Leading the visual direction for projects and campaigns." },
    { title: "Digital-First Branding", desc: "Crafting brand identities for the modern, digital era." },
    { title: "Visual Design", desc: "Designing engaging visuals that captivate audiences." },
    { title: "UI Design", desc: "Creating interfaces with clarity and usability in mind." },
  ]);

  const [hobbies] = useState([
    { title: "Photography", desc: "Capturing life’s moments through a camera lens." },
    { title: "Traveling", desc: "Exploring diverse cultures and cuisines around the globe." },
    { title: "Cooking", desc: "Experimenting with recipes and flavors in the kitchen." },
    { title: "Gaming", desc: "Diving into interactive worlds for fun and relaxation." },
  ]);

  // Expand/Collapse states for Interests and Hobbies
  const [expandedInterest, setExpandedInterest] = useState<number | null>(null);
  const [expandedHobby, setExpandedHobby] = useState<number | null>(null);

  const toggleInterest = (index: number) => {
    setExpandedInterest(prev => (prev === index ? null : index));
  };

  const toggleHobby = (index: number) => {
    setExpandedHobby(prev => (prev === index ? null : index));
  };

  // Inline style for the Inter font (adjust fontFamily as needed)
  const interStyle = { fontFamily: "'Inter', sans-serif" };

  return (
    <div
      className="snap-y snap-mandatory overflow-y-scroll bg-white text-black"
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* Background Effects & Custom Cursor */}
      <ParticleBackground />
      <CloudCursor />

      {/* HEADER (Sticky & Centered, no bottom border) */}
      <header className="sticky top-0 z-50 bg-white border-none shadow-none">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-center gap-12 text-xl font-light" style={{ textDecoration: "none" }}>
          <a href="/" className="hover:opacity-70 transition-opacity duration-300">Home</a>
          <a href="/info" className="hover:opacity-70 transition-opacity duration-300">Info</a>
        </nav>
      </header>

      {/* SECTION 1: ABOUT – Fullscreen snap */}
      <motion.section
        className="snap-start h-screen flex flex-col justify-center px-8 py-16"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <h2 className="text-5xl font-bold mb-8" style={interStyle}>About</h2>
        <motion.p
          className="text-5xl font-light leading-tight"
          style={interStyle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          Arsalan is a digital thinker & creative technologist on a mission to inspire emotional connection between brands and humans in the digital realm.
        </motion.p>
      </motion.section>

      {/* SECTION 2: INTERESTS – Fullscreen snap */}
      <motion.section
        className="snap-start h-screen flex flex-col justify-center px-8 py-16"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <h2 className="text-5xl font-bold mb-8" style={interStyle}>Interests</h2>
        <div className="space-y-6">
          {interests.map((item, idx) => {
            const isExpanded = expandedInterest === idx;
            return (
              <motion.div
                key={idx}
                className="border-b border-gray-300 pb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-normal" style={interStyle}>{item.title}</span>
                  <button
                    onClick={() => toggleInterest(idx)}
                    className="text-4xl font-bold text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    {isExpanded ? "–" : "+"}
                  </button>
                </div>
                {isExpanded && (
                  <motion.p
                    className="mt-2 text-gray-700 text-xl"
                    style={interStyle}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.desc}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* SECTION 3: HOBBIES – Fullscreen snap */}
      <motion.section
        className="snap-start h-screen flex flex-col justify-center px-8 py-16"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <h2 className="text-5xl font-bold mb-8" style={interStyle}>Hobbies</h2>
        <div className="space-y-6">
          {hobbies.map((item, idx) => {
            const isExpanded = expandedHobby === idx;
            return (
              <motion.div
                key={idx}
                className="border-b border-gray-300 pb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-normal" style={interStyle}>{item.title}</span>
                  <button
                    onClick={() => toggleHobby(idx)}
                    className="text-4xl font-bold text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    {isExpanded ? "–" : "+"}
                  </button>
                </div>
                {isExpanded && (
                  <motion.p
                    className="mt-2 text-gray-700 text-xl"
                    style={interStyle}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.desc}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* FOOTER – Normal section (Not full-screen snap) */}
      <footer className="bg-white border-t border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-gray-500 text-sm">
            © {new Date().getFullYear()} Arsalan. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/ArsalanAnwer0" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6 text-gray-500 hover:text-black transition" />
            </a>
            <a href="https://www.linkedin.com/in/arsalan-anwer-272004310/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6 text-gray-500 hover:text-black transition" />
            </a>
            <a href="https://www.instagram.com/_arsalan.ansari/" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6 text-gray-500 hover:text-black transition" />
            </a>
            <Button
              className="text-black bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg border border-gray-300 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Contact
            </Button>
          </div>
        </div>
        {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
      </footer>
    </div>
  );
}
