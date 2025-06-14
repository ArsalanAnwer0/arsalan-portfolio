import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useAnimation, useSpring, useMotionValue } from "framer-motion";
import { Github, Linkedin, Instagram, Sun, Moon } from "lucide-react";
// import { CloudCursor } from "@/components/ui/CloudCursor"; // Custom Cursor Component
import ContactModal from "@/components/ui/ContactModal"; // Modal Component
import HoverImage from "@/components/ui/HoverImage";
import DetailedInfoModal from "@/components/ui/DetailedInfoModal";
import ClickableInfoCard from "@/components/ui/ClickableInfoCard";
import { projectData, certificateData, learningData } from "../data/CardData";
import SkillsSection from "@/components/ui/SkillsSection";
import ParticleBackground from "@/components/ui/ParticleBackground";
import ProjectsCertificatesLearningSkills from "@/components/ui/ProjectsCertificatesLearningSkills";  // New Tabbed Component
import Link from "next/link";

function throttle(func: (...args: any[]) => void, delay: number) {
  let lastCall = 0;
  return function(...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

// Define the SkillItem Component
const SkillItem: React.FC<{ title: string; level: string; years: string }> = ({ title, level, years }) => {
  const getProgressWidth = () => {
    switch (level) {
      case "Beginner": return "w-1/4";
      case "Intermediate": return "w-1/2";
      case "Advanced": return "w-3/4";
      case "Expert": return "w-full";
      default: return "w-1/2";
    }
  };

  const getProgressColor = () => {
    switch (level) {
      case "Beginner": return "bg-blue-400";
      case "Intermediate": return "bg-green-400";
      case "Advanced": return "bg-yellow-400";
      case "Expert": return "bg-purple-400";
      default: return "bg-blue-400";
    }
  };

  return (
    <motion.div 
      className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ position: 'relative', zIndex: 2 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-sm px-2 py-1 rounded bg-opacity-20 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>{years}</span>
      </div>
      <div className="w-full h-2 bg-gray-600 rounded-full mt-2">
        <div className={`h-full rounded-full ${getProgressWidth()} ${getProgressColor()}`}></div>
      </div>
      <p className="text-xs text-gray-400 mt-2">{level}</p>
    </motion.div>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [message, setMessage] = useState(""); // Message input state
  const [status, setStatus] = useState("");   // Status feedback state
  const controls = useAnimation();            // For fade animations
  const [scrollY, setScrollY] = useState(0);
  const scrollValue = useMotionValue(0);
  const smoothScroll = useSpring(scrollValue, { stiffness: 80, damping: 20 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      setScrollProgress(progress);
    }, 16); // 60fps

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate background color based on scroll progress
  const getBackgroundStyle = () => {
    const greyIntensity = Math.min(scrollProgress * 1.1, 0.88);
    return {
      background: `linear-gradient(180deg, 
        rgba(255, 255, 255, ${1 - greyIntensity}) 0%, 
        rgba(35, 35, 35, ${greyIntensity}) 100%)`,
      transition: 'background 0.3s ease-out'
    };
  };

  // Calculate text colors based on scroll progress
  const getTextColor = (threshold = 0.25) => {
    return scrollProgress > threshold ? 'text-white' : 'text-gray-900';
  };

  const getSubTextColor = (threshold = 0.25) => {
    return scrollProgress > threshold ? 'text-gray-100' : 'text-gray-600';
  };

  const getHeaderBg = () => {
    // Use a consistent transparent background instead of switching colors
    return 'bg-transparent backdrop-blur-md';
  };

  const getGradientText = (threshold = 0.25) => {
    return scrollProgress > threshold 
      ? 'from-gray-50 to-gray-300' 
      : 'from-gray-900 to-gray-600';
  };

  useEffect(() => {
    // Intersection observer for mobile animations.
    if (typeof window !== 'undefined' && window.innerWidth > 640) return;
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target as HTMLElement;
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      const htmlSection = section as HTMLElement;
      htmlSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      htmlSection.style.opacity = '0';
      htmlSection.style.transform = 'translateY(20px)';
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setStatus("Message is required.");
      return;
    }
    setStatus("Sending...");
    try {
      const response = await fetch("/api/sendIdea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (response.ok) {
        setStatus("Message sent successfully!");
        setMessage("");
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred while sending the message.");
    }
  };

  return (
    <div 
      className="min-h-screen snap-y snap-mandatory overflow-y-scroll transition-all duration-700 ease-in-out" 
      style={{ ...getBackgroundStyle(), position: 'relative', zIndex: 1 }}
    >
      {/* Background and Cursor Effects */}
      <ParticleBackground />
      {/* <CloudCursor /> */}

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${getHeaderBg()}`}>
        <nav className={`max-w-7xl mx-auto px-6 py-10 flex justify-center gap-16 text-lg font-light tracking-wide transition-colors duration-500 ${getTextColor(0.15)}`} style={{ textDecoration: "none", fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
          <Link
            href="/"
            className="hover:opacity-60 transition-all duration-300 hover:scale-105"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            href="/info"
            className="hover:opacity-60 transition-all duration-300 hover:scale-105"
            style={{ textDecoration: "none" }}
          >
            Info
          </Link>
        </nav>
      </header>

      {/* Section 1 - Hero */}
      <motion.section
        className="min-h-screen flex flex-col justify-center items-center snap-start px-4 py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r ${getGradientText()} bg-clip-text text-transparent text-center transition-all duration-700`}>
          Building the future<br /> with cloud technology
        </h1>
        <p className={`mt-6 text-base md:text-xl max-w-3xl text-center transition-colors duration-700 ${getSubTextColor()}`}>
          Hi there! What does innovation mean to you? Share your thoughts and be part of shaping a future where ideas become timeless.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Have ideas? Your thoughts inspire innovation"
            className={`w-full sm:w-[45rem] text-lg md:text-xl transition-all duration-700 border-2 focus:ring-2 focus:ring-opacity-50 ${
              scrollProgress > 0.1 
                ? 'bg-gray-700/90 text-white border-gray-400 placeholder:text-gray-300' 
                : 'bg-white text-black border-gray-300 placeholder:text-gray-500'
            }`}
          />
          <Button
            onClick={handleSendMessage}
            className={`w-full sm:w-auto px-6 py-4 text-lg md:text-xl transition-all duration-700 border-2 ${
              scrollProgress > 0.1 
                ? 'text-white bg-gray-600 hover:bg-gray-500 border-gray-400' 
                : 'text-white bg-gray-900 hover:bg-gray-800 border-gray-800'
            }`}
          >
            Send
          </Button>
        </div>
        {status && <p className={`mt-4 transition-colors duration-700 ${getSubTextColor()}`}>{status}</p>}
      </motion.section>

      {/* Section 2 - Introduction */}
      <motion.section
        className="min-h-screen flex flex-col justify-center snap-start p-6 md:p-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
      >
        <div className="container mx-auto flex flex-col md:flex-row gap-10 items-center">
          {/* Left Content - Text */}
          <motion.div
            className="text-content md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <h2 className={`text-3xl md:text-4xl font-light mb-6 transition-colors duration-700 ${getTextColor(0.2)}`}>
              Hello
            </h2>           
            <p className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight transition-colors duration-700 ${getTextColor(0.2)}`}>
              Arsalan is an aspiring Cloud <br className="hidden xs:inline" />
              Engineer, pursuing his <br className="hidden xs:inline" />
              undergraduate studies at <br className="hidden xs:inline" />
              SCSU, US.
            </p>
          </motion.div>
          {/* Right Content - Image */}
          <motion.div
            className="image-content md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <motion.img
              src="/Arsalan.jpg" // Update to your actual image path
              alt="Arsalan"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-3xl shadow-2xl"
              style={{ width: "100%", maxWidth: "28rem", height: "auto" }}
            />
          </motion.div>
        </div>
      </motion.section>
      <div className="mt-20" />

      {/* New Tabbed Section for Projects/Certificates/Learning/Skills */}
      <ProjectsCertificatesLearningSkills scrollProgress={scrollProgress} />

      {/* Add extra spacing before the footer */}
      <div className="mb-16" />

      {/* Footer */}
<footer className={`w-full py-10 flex justify-center items-center px-4 transition-all duration-700`} style={{ position: 'relative', zIndex: 2 }}>
  <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center">
    <div className={`mb-4 md:mb-0 text-sm transition-colors duration-700 ${
      scrollProgress > 0.65 ? 'text-gray-300' : 'text-gray-600'
    }`}>
      © {new Date().getFullYear()} Arsalan. All rights reserved.
    </div>
    <div className="flex items-center gap-6">
      <a href="https://github.com/ArsalanAnwer0" target="_blank" rel="noopener noreferrer">
        <Github className={`h-6 w-6 transition-all duration-500 hover:scale-110 ${
          scrollProgress > 0.65 
            ? 'text-gray-200 hover:text-white' 
            : 'text-gray-500 hover:text-black'
        }`} />
      </a>
      <a href="https://www.linkedin.com/in/arsalan-anwer-272004310/" target="_blank" rel="noopener noreferrer">
        <Linkedin className={`h-6 w-6 transition-all duration-500 hover:scale-110 ${
          scrollProgress > 0.65 
            ? 'text-gray-200 hover:text-white' 
            : 'text-gray-500 hover:text-black'
        }`} />
      </a>
      <a href="https://www.instagram.com/_arsalan.ansari/" target="_blank" rel="noopener noreferrer">
        <Instagram className={`h-6 w-6 transition-all duration-500 hover:scale-110 ${
          scrollProgress > 0.65 
            ? 'text-gray-200 hover:text-white' 
            : 'text-gray-500 hover:text-black'
        }`} />
      </a>
      <Button
        className={`px-6 py-2 rounded-lg transition-all duration-700 hover:scale-105 ${
          scrollProgress > 0.65 
            ? 'text-white bg-transparent border border-gray-400 hover:bg-white/10' 
            : 'text-black bg-transparent border border-gray-300 hover:bg-black/5'
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        Contact
      </Button>
    </div>
  </div>
  {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} scrollProgress={scrollProgress} />}
</footer>
    </div>
  );
}