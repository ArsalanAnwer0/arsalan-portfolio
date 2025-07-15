import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";
import ParticleBackground from "@/components/ui/ParticleBackground";
import Link from "next/link";
import TitleSections from "@/components/ui/TitleSections";
import BackToTopButton from "@/components/ui/BackToTopButton";
import { useScrollMemory } from "@/components/ui/useScrollMemory";

interface GoogleCredentialResponse {
  credential: string;
}

interface DecodedToken {
  email: string;
  name: string;
  picture: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

function throttle(func: (...args: any[]) => void, delay: number) {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

// Define the SkillItem Component
const SkillItem: React.FC<{ title: string; level: string; years: string }> = ({
  title,
  level,
  years,
}) => {
  const getProgressWidth = () => {
    switch (level) {
      case "Beginner":
        return "w-1/4";
      case "Intermediate":
        return "w-1/2";
      case "Advanced":
        return "w-3/4";
      case "Expert":
        return "w-full";
      default:
        return "w-1/2";
    }
  };

  const getProgressColor = () => {
    switch (level) {
      case "Beginner":
        return "bg-blue-400";
      case "Intermediate":
        return "bg-green-400";
      case "Advanced":
        return "bg-yellow-400";
      case "Expert":
        return "bg-purple-400";
      default:
        return "bg-blue-400";
    }
  };

  return (
    <motion.div
      className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ position: "relative", zIndex: 2 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <span
          className="text-sm px-2 py-1 rounded bg-opacity-20 text-white"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          {years}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-600 rounded-full mt-2">
        <div
          className={`h-full rounded-full ${getProgressWidth()} ${getProgressColor()}`}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mt-2">{level}</p>
    </motion.div>
  );
};

const VimSearch: React.FC<{
  message: string;
  setMessage: (msg: string) => void;
  onSend: () => void;
  scrollProgress: number;
  status: string;
  showGoogleSignIn: boolean;
  signinContainerRef: React.RefObject<HTMLDivElement>;
}> = ({
  message,
  setMessage,
  onSend,
  scrollProgress,
  status,
  showGoogleSignIn,
  signinContainerRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount without scrolling
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend();
    }
    if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  const getVimColors = () => {
    return scrollProgress > 0.65
      ? {
          text: "text-white",
          cursor: "bg-white",
          container: "bg-transparent",
        }
      : {
          text: "text-gray-800",
          cursor: "bg-gray-800",
          container: "bg-transparent",
        };
  };

  const colors = getVimColors();

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Vim input container */}
      <div
        ref={containerRef}
        className={`
          relative w-full
          ${colors.container} ${colors.text}
          font-mono text-lg md:text-xl
          px-4 py-2 text-center
          word-wrap break-words
        `}
        onClick={() => inputRef.current?.focus()}
      >
        <span>{message}</span>
        <motion.span
          className={`inline-block h-6 md:h-7 w-3 ${colors.cursor} ml-0`}
          style={{
            verticalAlign: "text-bottom",
            marginBottom: "2px",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text"
          style={{ caretColor: "transparent" }}
        />
      </div>

      {/* Google Sign-In Container */}
      {showGoogleSignIn && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex justify-center"
        >
          <div
            ref={signinContainerRef}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          />
        </motion.div>
      )}

      {/* Status message */}
      {status && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            mt-4 text-sm font-mono text-center
            ${scrollProgress > 0.65 ? "text-gray-300" : "text-gray-600"}
          `}
        >
          {status}
        </motion.div>
      )}

      {!showGoogleSignIn && (
        <motion.div
          className={`mt-2 text-xs text-center opacity-40 ${
            scrollProgress > 0.65 ? "text-gray-400" : "text-gray-500"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.3 }}
        >
          Press Enter to send
        </motion.div>
      )}
    </motion.div>
  );
};


export default function Home() {
  useEffect(() => {
    console.log(
      "⏳ Google Client ID is:",
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    );
  }, []);

  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const signinContainerRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  // Check if this is the first visit in this session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedLanding");
    if (hasVisited) {
      setIsFirstVisit(false);
    }
  }, []);

  // Add scroll memory functionality
  const { restoreScrollPosition } = useScrollMemory();

  // Restore scroll position when component mounts
  useEffect(() => {
    restoreScrollPosition();
  }, [restoreScrollPosition]);

  // Your existing scroll progress useEffect
  useEffect(() => {
    const handleScroll = throttle(() => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      setScrollProgress(progress);
    }, 16);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleLoaded(true);
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    } else if (window.google) {
      setIsGoogleLoaded(true);
    }
  }, []);
  // Calculate background color based on scroll progress
  const getBackgroundStyle = () => {
    const greyIntensity = Math.min(scrollProgress * 1.1, 0.88);
    return {
      background: `linear-gradient(180deg, 
        rgba(255, 255, 255, ${1 - greyIntensity}) 0%, 
        rgba(35, 35, 35, ${greyIntensity}) 100%)`,
      transition: "background 0.3s ease-out",
    };
  };

  // Calculate text colors based on scroll progress - transition at section 3 (around 80% scroll)
  const getTextColor = (threshold = 0.8) => {
    return scrollProgress > threshold ? "text-white" : "text-gray-700"; // Deep charcoal instead of black
  };

  const getSubTextColor = (threshold = 0.8) => {
    return scrollProgress > threshold ? "text-gray-100" : "text-gray-500"; // Dark silver
  };

  const getHeaderBg = () => {
    // Use a consistent transparent background instead of switching colors
    return "bg-transparent backdrop-blur-md";
  };

  const getGradientText = (threshold = 0.8) => {
    return scrollProgress > threshold
      ? "from-gray-300 to-gray-400" // Elegant silverish tones instead of pure white
      : "from-gray-600 to-gray-500"; // Dark silver to medium silver gradient
  };

  const getArsalanStyle = () => {
    return {
      background:
        "linear-gradient(-45deg, #0f0f0f, #2a2a2a, #4a4a4a, #6a6a6a, #8a8a8a, #aaaaaa, #cccccc, #eeeeee, #ffffff, #eeeeee, #cccccc, #aaaaaa, #8a8a8a, #6a6a6a, #4a4a4a, #2a2a2a)",
      backgroundSize: "500% 500%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      animation: "liquidFlow 14s ease-in-out infinite",
      filter:
        "drop-shadow(0 4px 16px rgba(0,0,0,0.3)) drop-shadow(0 0 30px rgba(255,255,255,0.06))",
      fontFamily:
        "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
      fontWeight: "100",
      letterSpacing: "-0.05em",
      textShadow: "0 0 60px rgba(255,255,255,0.03)",
    };
  };

  const ElegantArsalanButton = () => {
    return (
      <motion.button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] xl:text-[18rem] font-light leading-none mb-6 cursor-pointer bg-transparent border-none p-0"
        style={{
          ...getArsalanStyle(),
          position: "relative",
          zIndex: 2,
        }}
        // Same smooth values as before
        initial={
          isFirstVisit
            ? {
                opacity: 0,
                scale: 0.85,
                y: 40,
                filter: "blur(15px) brightness(0.6)",
                letterSpacing: "0.08em",
              }
            : {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px) brightness(1)",
                letterSpacing: "-0.05em",
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px) brightness(1)",
          letterSpacing: "-0.05em",
        }}
        transition={
          isFirstVisit
            ? {
                duration: 3.2,
                ease: [0.19, 1.0, 0.22, 1.0],
                opacity: {
                  duration: 2.8,
                  ease: [0.25, 0.1, 0.25, 1.0],
                },
                scale: {
                  duration: 3.0,
                  ease: [0.16, 1, 0.3, 1],
                },
                y: {
                  duration: 2.9,
                  ease: [0.23, 1, 0.32, 1],
                },
                filter: {
                  duration: 3.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                letterSpacing: {
                  duration: 3.3, // Just slightly longer to prevent snap
                  ease: [0.19, 1.0, 0.22, 1.0],
                  type: "tween", // Ensures smooth interpolation
                },
              }
            : {
                duration: 0,
              }
        }
        onAnimationComplete={() => {
          if (isFirstVisit) {
            sessionStorage.setItem("hasVisitedLanding", "true");
            setIsFirstVisit(false);
          }
        }}
      >
        Arsalan
      </motion.button>
    );
  };

  useEffect(() => {
    // Intersection observer for mobile animations.
    if (typeof window !== "undefined" && window.innerWidth > 640) return;
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      const htmlSection = section as HTMLElement;
      htmlSection.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      htmlSection.style.opacity = "0";
      htmlSection.style.transform = "translateY(20px)";
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Force re-render for color animation
  useEffect(() => {
    const interval = setInterval(() => {
      // This will trigger re-renders for the color animation
    }, 100);
    return () => clearInterval(interval);
  }, []);
  const decodeJWT = (token: string): DecodedToken => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error("Invalid token");
    }
  };

  const handleGoogleResponse = async (response: GoogleCredentialResponse) => {
    setStatus("Sending with Google Sign-In...");

    try {
      const payload = decodeJWT(response.credential);

      const messageData = {
        message: message.trim(),
        email: payload.email,
        name: payload.name,
        timestamp: new Date().toISOString(),
      };

      const result = await fetch("/api/sendIdea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });

      if (result.ok) {
        setStatus(`Message sent successfully, ${payload.name.split(" ")[0]}!`);
        setMessage("");
        setShowGoogleSignIn(false);
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred while sending the message.");
    }
  };

  const handleSendMessage = async () => {
    console.log("Google Client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    if (!message.trim()) {
      setStatus("Message is required.");
      return;
    }

    if (!isGoogleLoaded) {
      setStatus("Loading Google Sign-In...");
      return;
    }

    // Show Google Sign-In
    setShowGoogleSignIn(true);
    setStatus("Sign in with Google to send your message");

    // Initialize Google Sign-In
    setTimeout(() => {
      if (window.google && signinContainerRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          window.google.accounts.id.renderButton(signinContainerRef.current, {
            theme: scrollProgress > 0.65 ? "filled_black" : "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
          });
        } catch (error) {
          console.error("Google Sign-In error:", error);
          setStatus("Failed to load Google Sign-In. Please try again.");
        }
      }
    }, 100);
  };

  return (
    <>
      <style jsx>{`
        @keyframes elegantFlow {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <div
        className="min-h-screen snap-y snap-mandatory overflow-y-scroll transition-all duration-700 ease-in-out"
        style={{ ...getBackgroundStyle(), position: "relative", zIndex: 1 }}
      >
        <motion.section
          className="min-h-screen flex flex-col justify-center items-end snap-start px-8 md:px-16 lg:px-24 py-10 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          {/* Main content - right aligned */}
          <div className="text-right">
            <ElegantArsalanButton />
            <div
              className={`text-lg md:text-xl lg:text-2xl font-light mb-2 transition-colors duration-700 ${getTextColor()}`}
            >
              Computer Science Student
            </div>
            <div
              className={`text-lg md:text-xl lg:text-2xl font-light mb-4 transition-colors duration-700 ${getTextColor()}`}
            >
              Based in US
            </div>
            <div
              className={`text-xs uppercase tracking-widest font-light opacity-60 transition-colors duration-700 ${getSubTextColor()}`}
            >
              PORTFOLIO_25/26
            </div>
          </div>
          {/* "Scroll to Explore" Indicator */}
          <motion.div
            className="absolute bottom-8 right-8 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 3, duration: 2 }}
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            whileHover={{ opacity: 1, x: -4 }}
          >
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`text-sm transition-colors duration-700 ${
                scrollProgress > 0.1 ? "text-gray-300" : "text-gray-600"
              }`}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: "300",
                letterSpacing: "0.1em",
              }}
            >
              Scroll to Explore
            </motion.div>
          </motion.div>
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
              style={{ position: "relative", zIndex: 2 }}
            >
              <h2
                className={`text-3xl md:text-4xl font-light mb-6 transition-colors duration-700 ${getTextColor(
                  0.8
                )}`}
              >
                Hello
              </h2>
              <p
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight transition-colors duration-700 ${getTextColor(
                  0.8
                )}`}
              >
                I like to automate systems <br className="hidden xs:inline" />
                and build infrastructure, <br className="hidden xs:inline" />
                pursuing my undergraduate studies at SCSU.
              </p>
            </motion.div>
            {/* Right Content - Image */}
            <motion.div
              className="image-content md:w-1/2 flex justify-center items-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ position: "relative", zIndex: 2 }}
            >
              <motion.img
                src="/Arsalan.jpg"
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

        {/* Section 3 - Tabbed Section for Projects/Certificates/Learning/Skills */}
        <TitleSections scrollProgress={scrollProgress} />
        {/* Section 4 - Hero with Vim Search */}
        <motion.section
          className="min-h-screen flex flex-col justify-center items-center snap-start px-4 py-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-tight bg-gradient-to-r ${getGradientText()} bg-clip-text text-transparent text-center transition-all duration-700 mb-8`}
            style={{
              fontFamily:
                "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
          >
            Building the future
            <br /> with technology
          </h1>
          <p
            className={`mt-8 text-lg md:text-xl lg:text-2xl max-w-4xl text-center leading-relaxed transition-colors duration-700 ${getSubTextColor()}`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: "300",
              lineHeight: "1.6",
            }}
          >
            Ready to collaborate on innovative projects? Let's build tools that make a difference. 
            Send me a message and let's create something amazing together.
          </p>

          {/* Vim-style search bar */}

          <div className="mt-16 w-full max-w-4xl px-4">
            <VimSearch
              message={message}
              setMessage={setMessage}
              onSend={handleSendMessage}
              scrollProgress={scrollProgress}
              status={status}
              showGoogleSignIn={showGoogleSignIn}
              signinContainerRef={signinContainerRef}
            />
          </div>
        </motion.section>

        {/* Footer */}
        <footer
          className={`w-full py-10 flex justify-center items-center px-4 transition-all duration-700`}
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center">
            <div
              className={`mb-4 md:mb-0 text-sm transition-colors duration-700 ${
                scrollProgress > 0.65 ? "text-gray-300" : "text-gray-600"
              }`}
            >
              © {new Date().getFullYear()} Arsalan. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/ArsalanAnwer0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github
                  className={`h-6 w-6 transition-all duration-500 hover:scale-110 ${
                    scrollProgress > 0.65
                      ? "text-gray-200 hover:text-white"
                      : "text-gray-500 hover:text-black"
                  }`}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/arsalan-anwer-cloud/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin
                  className={`h-6 w-6 transition-all duration-500 hover:scale-110 ${
                    scrollProgress > 0.65
                      ? "text-gray-200 hover:text-white"
                      : "text-gray-500 hover:text-black"
                  }`}
                />
              </a>
              <a
                href="https://www.instagram.com/_arsalan.ansari/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram
                  className={`h-6 w-6 transition-all duration-500 hover:scale-110 ${
                    scrollProgress > 0.65
                      ? "text-gray-200 hover:text-white"
                      : "text-gray-500 hover:text-black"
                  }`}
                />
              </a>
             
            </div>
          </div>
        </footer>
        {/* Add BackToTopButton */}
        <BackToTopButton scrollProgress={scrollProgress} />
      </div>
    </>
  );
}
