import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ui/ContactModal";
import { Github, Linkedin, Instagram, Heart, Compass, Target, Sparkles } from "lucide-react";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function Info() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for gradient transition
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate background color based on scroll progress
  const getBackgroundStyle = () => {
    const greyIntensity = Math.min(scrollProgress * 1.2, 0.85); // Max 85% grey, smoother transition
    return {
      background: `linear-gradient(180deg, 
        rgba(255, 255, 255, ${1 - greyIntensity}) 0%, 
        rgba(45, 45, 45, ${greyIntensity}) 100%)`
    };
  };

  // Calculate text colors based on scroll progress
  const getTextColor = (threshold = 0.3) => {
    return scrollProgress > threshold ? 'text-white' : 'text-black';
  };

  const getSubTextColor = (threshold = 0.3) => {
    return scrollProgress > threshold ? 'text-gray-200' : 'text-gray-600';
  };

  const getBorderColor = (threshold = 0.3) => {
    return scrollProgress > threshold ? 'border-gray-500' : 'border-gray-200';
  };

  const getHeaderBg = () => {
    // Use a consistent transparent background instead of switching colors
    return 'bg-transparent backdrop-blur-sm';
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const slideInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="text-black overflow-x-hidden transition-all duration-1000 ease-in-out" style={{ ...getBackgroundStyle(), position: "relative", zIndex: 1 }}>
      {/* Background Effects */}
      <ParticleBackground />

      {/* HEADER */}
      <header className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-500 ${getHeaderBg()}`}>
        <nav className={`max-w-7xl mx-auto px-6 py-10 flex justify-center gap-16 text-lg font-light tracking-wide transition-colors duration-500 ${getTextColor(0.2)}`} style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
          <a href="/" className="hover:opacity-60 transition-all duration-300">Home</a>
          <a href="/info" className="opacity-60">Info</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className={`text-6xl md:text-8xl font-light mb-8 tracking-tight transition-colors duration-500 ${getTextColor()}`}>
              Beyond the Code
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed transition-colors duration-500 ${getSubTextColor()}`}>
            I’m trying to live a meaningful life.
            A life filled with peace, true relationships, and beautiful memories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className={`text-5xl md:text-6xl font-light mb-16 text-center transition-colors duration-500 ${getTextColor()}`}>My Philosophy</h2>
            <div className="text-center">
              <p className={`text-2xl md:text-3xl font-light leading-relaxed mb-8 transition-colors duration-500 ${getTextColor(0.25)}`}>
                Living with <em className="italic">kindness</em>, <em className="italic">love</em>, and <em className="italic">peace</em> at the core of everything.
              </p>
              <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${getSubTextColor(0.25)}`}>
              I believe life finds its true meaning when we live with fairness and kindness.
              It’s not just about doing what’s right, but about showing care through simple, thoughtful actions.
              When balance and respect guide us, peace and purpose follow naturally.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PASSIONS SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-5xl md:text-6xl font-light mb-20 text-center transition-colors duration-500 ${getTextColor(0.4)}`}
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.3 }}
          >
            What Drives Me
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
            variants={staggerChildren}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Wellness */}
            <motion.div variants={slideInLeft} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Heart className={`w-8 h-8 transition-colors duration-500 ${getTextColor(0.4)}`} />
                <h3 className={`text-3xl font-light transition-colors duration-500 ${getTextColor(0.4)}`}>Wellness & Balance</h3>
              </div>
              <p className={`text-lg leading-relaxed transition-colors duration-500 ${getSubTextColor(0.4)}`}>
              I swim to stay active, walk every morning, and play cricket when I can. 
              Journaling keeps me grounded, and I cook to relax.


              </p>
            </motion.div>

            {/* Adventure */}
            <motion.div variants={slideInRight} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Compass className={`w-8 h-8 transition-colors duration-500 ${getTextColor(0.4)}`} />
                <h3 className={`text-3xl font-light transition-colors duration-500 ${getTextColor(0.4)}`}>Exploration & Growth</h3>
              </div>
              <p className={`text-lg leading-relaxed transition-colors duration-500 ${getSubTextColor(0.4)}`}>
              Traveling by myself gives me peace and a chance to see different cultures. 
              I also like to study finance and reading books. It is more of a hobby and it helps me learn new things.
              </p>
            </motion.div>

            {/* Community */}
            <motion.div variants={slideInLeft} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Sparkles className={`w-8 h-8 transition-colors duration-500 ${getTextColor(0.4)}`} />
                <h3 className={`text-3xl font-light transition-colors duration-500 ${getTextColor(0.4)}`}>Connection & Care</h3>
              </div>
              <p className={`text-lg leading-relaxed transition-colors duration-500 ${getSubTextColor(0.4)}`}>
                Being there for family and friends means a lot to me. I try to build real connections and stay close to the people who matter most.
              </p>
            </motion.div>

            {/* Purpose */}
            <motion.div variants={slideInRight} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Target className={`w-8 h-8 transition-colors duration-500 ${getTextColor(0.4)}`} />
                <h3 className={`text-3xl font-light transition-colors duration-500 ${getTextColor(0.4)}`}>Purpose & Legacy</h3>
              </div>
              <p className={`text-lg leading-relaxed transition-colors duration-500 ${getSubTextColor(0.4)}`}>
               I just want to be a positive part of people’s lives, someone who brings calm, kindness, and a little bit of light.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DREAMS SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-20"
          >
            <h2 className={`text-5xl md:text-6xl font-light transition-colors duration-500 ${getTextColor(0.6)}`}>Dreams & Aspirations</h2>
          </motion.div>
          
          <motion.div
            className="space-y-16"
            variants={staggerChildren}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className={`border-l-4 pl-8 max-w-3xl mx-auto transition-colors duration-500 ${getBorderColor(0.6)}`}
              variants={slideInLeft}
            >
              <h3 className={`text-2xl md:text-3xl font-light mb-4 transition-colors duration-500 ${getTextColor(0.6)}`}>Freedom</h3>
              <p className={`leading-relaxed text-lg transition-colors duration-500 ${getSubTextColor(0.6)}`}>
              I want to live on my own terms and help others do the same. Making choices gently and with care means everything to me.              </p>
            </motion.div>

            <motion.div
              className={`border-l-4 pl-8 max-w-3xl mx-auto transition-colors duration-500 ${getBorderColor(0.6)}`}
              variants={slideInLeft}
            >
              <h3 className={`text-2xl md:text-3xl font-light mb-4 transition-colors duration-500 ${getTextColor(0.6)}`}>Compassion</h3>
              <p className={`leading-relaxed text-lg transition-colors duration-500 ${getSubTextColor(0.6)}`}>
              Kindness guides me. Understanding others helps build trust and connection. Even small acts of care can bring hope.
              </p>
            </motion.div>

            <motion.div
              className={`border-l-4 pl-8 max-w-3xl mx-auto transition-colors duration-500 ${getBorderColor(0.6)}`}
              variants={slideInLeft}
            >
              <h3 className={`text-2xl md:text-3xl font-light mb-4 transition-colors duration-500 ${getTextColor(0.6)}`}>Balance</h3>
              <p className={`leading-relaxed text-lg transition-colors duration-500 ${getSubTextColor(0.6)}`}>
              I believe true peace comes from equality. Finding harmony is my goal. I want to support a world where everyone can grow and thrive.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

{/* CLOSING SECTION */}
<section className="py-20 md:py-32 px-6">
 <div className="max-w-4xl mx-auto text-center">
   <motion.div
     {...fadeInUp}
     whileInView="animate"
     initial="initial"
     viewport={{ once: true, amount: 0.3 }}
   >
     <p className={`text-xl md:text-3xl font-light italic leading-relaxed mb-6 md:mb-8 transition-colors duration-500 ${getTextColor(0.7)}`} style={{ fontFamily: "'Playfair Display', 'Crimson Text', 'Old Standard TT', 'Book Antiqua', serif", letterSpacing: '0.5px' }}>
       "To me, life is about learning and growing with patience, kindness, and faith."
     </p>
     <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${getSubTextColor(0.7)}`}>
       Every day is a chance to be better, to help others, and to live with a calm and open heart.
     </p>
   </motion.div>
 </div>
</section>

      {/* FOOTER */}
      <footer className={`px-6 py-12 transition-all duration-500`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className={`mb-6 md:mb-0 text-sm transition-colors duration-500 ${scrollProgress > 0.7 ? 'text-gray-300' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} Arsalan. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/ArsalanAnwer0" target="_blank" rel="noopener noreferrer">
              <Github className={`h-6 w-6 transition-colors duration-300 ${scrollProgress > 0.7 ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-black'}`} />
            </a>
            <a href="https://www.linkedin.com/in/arsalan-anwer-272004310/" target="_blank" rel="noopener noreferrer">
              <Linkedin className={`h-6 w-6 transition-colors duration-300 ${scrollProgress > 0.7 ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-black'}`} />
            </a>
            <a href="https://www.instagram.com/_arsalan.ansari/" target="_blank" rel="noopener noreferrer">
              <Instagram className={`h-6 w-6 transition-colors duration-300 ${scrollProgress > 0.7 ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-black'}`} />
            </a>
            <Button
              className={`px-6 py-2 rounded-lg transition-all duration-700 hover:scale-105 ${
                scrollProgress > 0.7 
                  ? 'text-white bg-transparent border border-gray-400 hover:bg-white/10' 
                  : 'text-black bg-transparent border border-gray-300 hover:bg-black/5'
              }`}
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