import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ui/ContactModal";
import {
  Github,
  Linkedin,
  Instagram,
  Heart,
  Compass,
  Target,
  Sparkles,
} from "lucide-react";
import ParticleBackground from "@/components/ui/ParticleBackground";
import Link from "next/link";
import { useScrollMemory } from "@/components/ui/useScrollMemory";
import BackToTopButton from "@/components/ui/BackToTopButton";

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { navigateToHome } = useScrollMemory();

  // Track scroll progress for gradient transition
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // // Calculate background color based on scroll progress
  // const getBackgroundStyle = () => {
  //   const greyIntensity = Math.min(scrollProgress * 1.2, 0.85);
  //   return {
  //     background: `linear-gradient(180deg,
  //       rgba(255, 255, 255, ${1 - greyIntensity}) 0%,
  //       rgba(45, 45, 45, ${greyIntensity}) 100%)`
  //   };
  // };

  // // Calculate text colors based on scroll progress - smooth transitions
  // const getTextColor = () => {
  //   const progress = Math.min(scrollProgress * 1.2, 0.85);
  //   // Smooth transition from black (0,0,0) to white (255,255,255)
  //   const colorValue = Math.round(progress * 255);
  //   return { color: `rgb(${colorValue}, ${colorValue}, ${colorValue})` };
  // };

  // const getSubTextColor = () => {
  //   const progress = Math.min(scrollProgress * 1.2, 0.85);
  //   // Smooth transition from dark grey (96,96,96) to light grey (229,229,229)
  //   const startValue = 96;   // rgb(96,96,96) = text-gray-600
  //   const endValue = 229;    // rgb(229,229,229) = text-gray-100
  //   const colorValue = Math.round(startValue + (progress * (endValue - startValue)));
  //   return { color: `rgb(${colorValue}, ${colorValue}, ${colorValue})` };
  // };

  // const getAccentTextColor = () => {
  //   const progress = Math.min(scrollProgress * 1.2, 0.85);
  //   // Smooth transition from medium grey (55,55,55) to lighter grey (209,209,209)
  //   const startValue = 55;   // rgb(55,55,55) = text-gray-700
  //   const endValue = 209;    // rgb(209,209,209) = text-gray-200
  //   const colorValue = Math.round(startValue + (progress * (endValue - startValue)));
  //   return { color: `rgb(${colorValue}, ${colorValue}, ${colorValue})` };
  // };

  // const getBorderColor = () => {
  //   const progress = Math.min(scrollProgress * 1.2, 0.85);
  //   // Smooth transition from light border to medium border
  //   const startValue = 209;  // rgb(209,209,209) = border-gray-300
  //   const endValue = 156;    // rgb(156,156,156) = border-gray-400
  //   const colorValue = Math.round(startValue - (progress * (startValue - endValue)));
  //   return { borderColor: `rgb(${colorValue}, ${colorValue}, ${colorValue})` };
  // };
  // Calculate background color based on scroll progress - fast transition
  const getBackgroundStyle = () => {
    const greyIntensity = Math.min(scrollProgress * 3.5, 0.85); // Much faster transition
    return {
      background: `linear-gradient(180deg, 
      rgba(255, 255, 255, ${1 - greyIntensity}) 0%, 
      rgba(45, 45, 45, ${greyIntensity}) 100%)`,
    };
  };

  // Calculate text colors based on scroll progress - maximum readability
  const getTextColor = () => {
    const progress = scrollProgress > 0.05 ? 1 : 0; // Sharp transition at 5%
    const colorValue = progress * 255; // 0 (black) to 255 (white)
    return { color: `rgb(${colorValue}, ${colorValue}, ${colorValue})` };
  };

  const getSubTextColor = () => {
    const progress = scrollProgress > 0.05 ? 1 : 0; // Sharp transition at 5%
    const colorValue = progress > 0 ? 230 : 30; // Much brighter white or much darker black
    return { color: `rgb(${colorValue}, ${colorValue}, ${colorValue})` };
  };

  const getAccentTextColor = () => {
    const progress = scrollProgress > 0.05 ? 1 : 0; // Sharp transition at 5%
    const colorValue = progress > 0 ? 180 : 75; // Medium light or medium dark
    return { color: `rgb(${colorValue}, ${colorValue}, ${colorValue})` };
  };

  const getBorderColor = () => {
    const progress = scrollProgress > 0.05 ? 1 : 0; // Sharp transition at 5%
    const colorValue = progress > 0 ? 156 : 209; // Gray-400 or Gray-300
    return { borderColor: `rgb(${colorValue}, ${colorValue}, ${colorValue})` };
  };
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const slideInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <div
      className="text-black overflow-x-hidden transition-all duration-1000 ease-in-out"
      style={{ ...getBackgroundStyle(), position: "relative", zIndex: 1 }}
    >
      {/* Background Effects */}
      <ParticleBackground />

      {/* Elegant Arsalan Navigation */}
      <div className="fixed top-8 left-8 z-50">
        <button
          onClick={navigateToHome}
          className={`text-2xl font-light transition-colors duration-700 hover:opacity-70 ${getTextColor()}`}
          style={{
            fontFamily:
              "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "-0.01em",
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          Arsalan
        </button>
      </div>

      {/* NEW SECTION - MORE ABOUT ME */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h1
              className={`text-6xl md:text-8xl lg:text-9xl font-extralight mb-16 tracking-tight transition-colors duration-500`}
              style={{
                fontFamily:
                  "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "-0.02em",
                ...getTextColor(),
              }}
            >
              More about me?
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <p
              className={`text-xl md:text-2xl leading-relaxed text-center transition-colors duration-500`}
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.7",
                fontWeight: "400",
                ...getAccentTextColor(),
              }}
            >
              I'm passionate about developing and deploying production-ready
              applications while learning to work with teams of Software
              Developers, aspiring to become a{" "}
              <span className="font-semibold" style={getTextColor()}>
                Technical Architect
              </span>
              . I'm currently learning and gaining experience in{" "}
              <span className="font-medium" style={getTextColor()}>
                Python, Django, Flask, AngularJS, SQL, Neo4J, MongoDB
              </span>
              , along with{" "}
              <span className="font-medium" style={getTextColor()}>
                DevOps tools like Kubernetes, Docker, Terraform, Ansible,
                Jenkins, and GitLab
              </span>
              . I'm also expanding my expertise in{" "}
              <span className="font-medium" style={getTextColor()}>
                AWS cloud services
              </span>{" "}
              while developing my leadership and soft skills.
            </p>

            <div className="pt-6">
              <p
                className={`text-xl md:text-2xl leading-relaxed text-center transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.7",
                  fontWeight: "400",
                  ...getAccentTextColor(),
                }}
              >
                I'm building experience working with enthusiastic software
                developers, which is helping me improve my communication skills.
                I love sharing knowledge and learning from fellow students. I
                believe continuous learning and staying current with new
                technologies is the key to success in modern development.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1
              className={`text-7xl md:text-9xl lg:text-[12rem] font-extralight mb-12 tracking-tight transition-colors duration-500`}
              style={{
                fontFamily:
                  "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "-0.02em",
                ...getTextColor(),
              }}
            >
              Beyond the Code
            </h1>
            <div className="max-w-4xl mx-auto pt-4">
              <p
                className={`text-2xl md:text-3xl leading-relaxed transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.6",
                  fontWeight: "300",
                  ...getSubTextColor(),
                }}
              >
                I'm trying to live a meaningful life.
                <br className="hidden md:block" />A life filled with peace, true
                relationships, and beautiful memories.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2
              className={`text-6xl md:text-8xl font-extralight mb-24 text-center transition-colors duration-500`}
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-0.01em",
                ...getTextColor(),
              }}
            >
              My Philosophy
            </h2>
            <div className="text-center space-y-12">
              <p
                className={`text-3xl md:text-5xl font-light leading-relaxed transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.4",
                  letterSpacing: "-0.01em",
                  ...getTextColor(),
                }}
              >
                Living with <em className="italic font-light">kindness</em>,{" "}
                <em className="italic font-light">love</em>, and{" "}
                <em className="italic font-light">peace</em> at the core of
                everything.
              </p>
              <div className="max-w-4xl mx-auto pt-8"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PASSIONS SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-6xl md:text-7xl font-light mb-20 text-center transition-colors duration-500`}
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.01em",
              ...getTextColor(),
            }}
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.3 }}
          >
            What Drives Me
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20"
            variants={staggerChildren}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Wellness */}
            <motion.div variants={slideInLeft} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Heart
                  className={`w-8 h-8 transition-colors duration-500`}
                  style={getTextColor()}
                />
                <h3
                  className={`text-2xl md:text-3xl font-light transition-colors duration-500`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "-0.01em",
                    ...getTextColor(),
                  }}
                >
                  Wellness & Balance
                </h3>
              </div>
              <p
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.6",
                  fontWeight: "400",
                  ...getSubTextColor(),
                }}
              >
                I swim to stay active, walk every morning, and play cricket when
                I can. Journaling keeps me grounded, and I cook to relax.
              </p>
            </motion.div>

            {/* Adventure */}
            <motion.div variants={slideInRight} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Compass
                  className={`w-8 h-8 transition-colors duration-500`}
                  style={getTextColor()}
                />
                <h3
                  className={`text-2xl md:text-3xl font-light transition-colors duration-500`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "-0.01em",
                    ...getTextColor(),
                  }}
                >
                  Exploration & Growth
                </h3>
              </div>
              <p
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.6",
                  fontWeight: "400",
                  ...getSubTextColor(),
                }}
              >
                Traveling by myself gives me peace and a chance to see different
                cultures. I also like to study finance and reading books. It is
                more of a hobby and it helps me learn new things.
              </p>
            </motion.div>

            {/* Community */}
            <motion.div variants={slideInLeft} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Sparkles
                  className={`w-8 h-8 transition-colors duration-500`}
                  style={getTextColor()}
                />
                <h3
                  className={`text-2xl md:text-3xl font-light transition-colors duration-500`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "-0.01em",
                    ...getTextColor(),
                  }}
                >
                  Connection & Care
                </h3>
              </div>
              <p
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.6",
                  fontWeight: "400",
                  ...getSubTextColor(),
                }}
              >
                Being there for family and friends means a lot to me. I try to
                build real connections and stay close to the people who matter
                most.
              </p>
            </motion.div>

            {/* Purpose */}
            <motion.div variants={slideInRight} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Target
                  className={`w-8 h-8 transition-colors duration-500`}
                  style={getTextColor()}
                />
                <h3
                  className={`text-2xl md:text-3xl font-light transition-colors duration-500`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "-0.01em",
                    ...getTextColor(),
                  }}
                >
                  Purpose & Legacy
                </h3>
              </div>
              <p
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.6",
                  fontWeight: "400",
                  ...getSubTextColor(),
                }}
              >
                I just want to be a positive part of people's lives, someone who
                brings calm, kindness, and a little bit of light.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DREAMS SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-20"
          >
            <h2
              className={`text-6xl md:text-7xl font-light transition-colors duration-500`}
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-0.01em",
                ...getTextColor(),
              }}
            >
              Dreams & Aspirations
            </h2>
          </motion.div>

          <motion.div
            className="space-y-16"
            variants={staggerChildren}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className={`border-l-2 pl-8 max-w-3xl mx-auto transition-colors duration-500`}
              style={getBorderColor()}
              variants={slideInLeft}
            >
              <h3
                className={`text-2xl md:text-3xl font-light mb-4 transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                  ...getTextColor(),
                }}
              >
                Freedom
              </h3>
              <p
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.6",
                  fontWeight: "400",
                  ...getSubTextColor(),
                }}
              >
                I want to live on my own terms and help others do the same.
                Making choices gently and with care means everything to me.
              </p>
            </motion.div>

            <motion.div
              className={`border-l-2 pl-8 max-w-3xl mx-auto transition-colors duration-500`}
              style={getBorderColor()}
              variants={slideInLeft}
            >
              <h3
                className={`text-2xl md:text-3xl font-light mb-4 transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                  ...getTextColor(),
                }}
              >
                Compassion
              </h3>
              <p
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.6",
                  fontWeight: "400",
                  ...getSubTextColor(),
                }}
              >
                Kindness guides me. Understanding others helps build trust and
                connection. Even small acts of care can bring hope.
              </p>
            </motion.div>

            <motion.div
              className={`border-l-2 pl-8 max-w-3xl mx-auto transition-colors duration-500`}
              style={getBorderColor()}
              variants={slideInLeft}
            >
              <h3
                className={`text-2xl md:text-3xl font-light mb-4 transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                  ...getTextColor(),
                }}
              >
                Balance
              </h3>
              <p
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.6",
                  fontWeight: "400",
                  ...getSubTextColor(),
                }}
              >
                I believe true peace comes from equality. Finding harmony is my
                goal. I want to support a world where everyone can grow and
                thrive.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p
              className={`text-xl md:text-3xl font-light italic leading-relaxed mb-8 transition-colors duration-500`}
              style={{
                fontFamily: "'Playfair Display', 'Crimson Text', serif",
                letterSpacing: "0.5px",
                lineHeight: "1.4",
                ...getTextColor(),
              }}
            >
              "To me, life is about learning and growing with patience,
              kindness, and faith."
            </p>
            <div className="max-w-3xl mx-auto pt-4">
              <p
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-500`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.6",
                  fontWeight: "400",
                  ...getSubTextColor(),
                }}
              >
                Every day is a chance to be better, to help others, and to live
                with a calm and open heart.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Add BackToTopButton */}
      <BackToTopButton scrollProgress={scrollProgress} />
    </div>
  );
}
