import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useAnimation, useSpring, useMotionValue } from "framer-motion";
import { Github, Linkedin, Instagram, Sun, Moon } from "lucide-react";
import { CustomCursor } from "@/components/ui/CustomCursor"; // Custom Cursor Component
import ContactModal from "@/components/ui/ContactModal"; // Modal Component
import HoverImage from "@/components/ui/HoverImage";

function throttle(
  func: (...args: any[]) => void, // or more specific type if you know it
  delay: number
) {
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
  // Determine the progress width based on skill level
  const getProgressWidth = () => {
    switch (level) {
      case "Beginner": return "w-1/4";
      case "Intermediate": return "w-1/2";
      case "Advanced": return "w-3/4";
      case "Expert": return "w-full";
      default: return "w-1/2";
    }
  };
  
  // Determine the color based on skill level
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
  const [message, setMessage] = useState(""); // State for message input
  const [status, setStatus] = useState(""); // State for status feedback
  const controls = useAnimation(); // Controls for fading animations  
  const [scrollY, setScrollY] = useState(0);
  const scrollValue = useMotionValue(0);
  const smoothScroll = useSpring(scrollValue, { stiffness: 80, damping: 20 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Create a throttled version of your scroll handler
    const handleScroll = throttle(() => {
      // Calculate total scrollable height
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      // 20% of total page height
      const threshold = docHeight * 0.2;
    
      // Use the state variable
      setIsDarkMode(scrollPosition > threshold);
    }, 50); // Run at most every 50ms
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Add this effect to handle dark mode class changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

// Add this near your other useEffect hooks
useEffect(() => {
  // Only run on mobile
  if (typeof window !== 'undefined' && window.innerWidth > 640) return;
  
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Type assertion to HTMLElement to fix TypeScript error
        const section = entry.target as HTMLElement;
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    // Type assertion to HTMLElement to fix TypeScript error
    const htmlSection = section as HTMLElement;
    // Set initial styles
    htmlSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    htmlSection.style.opacity = '0';
    htmlSection.style.transform = 'translateY(20px)';
    // Observe section
    observer.observe(section);
  });
  
  return () => {
    sections.forEach(section => {
      observer.unobserve(section);
    });
  };
}, []);
  
  
  // Add handleSendMessage function
  const handleSendMessage = async () => {
    if (!message.trim()) {
      setStatus("Message is required.");
      return;
    }

    setStatus("Sending...");

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setMessage(""); // Clear the input field
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred while sending the message.");
    }
  };

  return (
    <div className="min-h-screen snap-y snap-mandatory overflow-y-scroll transition-all duration-1000 ease-in-out">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Updated Header with Elegant Font */}
      <header className="bg-white dark:bg-black shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left - Name with Elegant Font */}
          <h1 className="text-base md:text-xl font-light tracking-wide dark:text-white text-gray-900">
            ARSALAN
          </h1>

          {/* Center - Location - Hide on very small screens */}
          <h2 className="hidden sm:block text-xs md:text-base dark:text-white text-gray-800">
            SAINT CLOUD, MINNESOTA
          </h2>

          {/* Right - Title */}
          <h3 className="text-xs md:text-base dark:text-white text-gray-800">
            CLOUD ENGINEER
          </h3>
        </div>
      </header>

      {/* Section 1 */}
      <motion.section
        className="min-h-screen flex flex-col justify-center items-center snap-start px-4 py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent text-center">
          Building the future<br /> with cloud technology
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-6 text-base md:text-xl max-w-3xl text-center">
          Hi there! What does innovation mean to you? Share your thoughts and be
          part of shaping a future where ideas become timeless.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
  <Input
    type="text"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Have ideas? Your thoughts inspire innovation"
    className="w-full sm:w-[45rem] bg-white text-black dark:bg-gray-800 dark:text-white text-lg md:text-xl"
  />

  <Button
    onClick={handleSendMessage}
    className="w-full sm:w-auto text-white bg-gray-900 dark:bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-700 px-6 py-4 text-lg md:text-xl"
  >
    Send
  </Button>
</div>
        {/* Status Message */}
        {status && <p className="mt-4 text-gray-600 dark:text-gray-300">{status}</p>}
      </motion.section>

      {/* Ensure all sections are wrapped in a single parent element */}
      <motion.section
  className="min-h-screen flex flex-col justify-center bg-white dark:bg-black snap-start p-6 md:p-10"
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
          >
            <h2 className="text-3xl md:text-4xl font-light dark:text-white mb-6">
              Hello
            </h2>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-gray-900 dark:text-white">
  Arsalan is an aspiring cloud<br className="hidden xs:inline" />
  engineer, pursuing his<br className="hidden xs:inline" />
  undergraduate studies at <br className="hidden xs:inline" />
  SCSU, US.
</p>
          </motion.div>

          {/* Right Content - Hover Image */}
          <motion.div
            className="image-content md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {hoveredImage && (
              <motion.img
                src={hoveredImage}
                alt="Hovered content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1.1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-3xl shadow-2xl"
                style={{
                  width: "100%", // Use percentage width
                  maxWidth: "28rem", // Limit maximum width
                  height: "auto",
                }}
              />
            )}
          </motion.div>
        </div>
      </motion.section>

      <div
        className="bg-gray-50 dark:bg-black min-h-screen snap-y snap-mandatory overflow-y-scroll"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Section 3 - Projects */}
        <motion.section
  id="projects"
  className="snap-start"
  style={{
    height: "100vh",
    padding: "6rem 3rem",
    display: "flex",
    alignItems: "flex-start",
    gap: "3rem",
  }}
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  viewport={{ once: false, amount: 0.5 }}
  transition={{ duration: 0.8 }}
>
<h2
  style={{
    flex: 1,
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "left",
  }}
  className="text-black dark:text-white"
>
  Projects
</h2>
<div
  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
>
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white dark:bg-black text-black dark:text-white"
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Infrastructure & Automation
              </h3>
              <p>
                Building infrastructure with Terraform and CloudFormation, designing
                scalable VPCs with subnets, and creating CI/CD pipelines.
              </p>
            </motion.div>
            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white dark:bg-black text-black dark:text-white"
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Security & Compliance
              </h3>
              <p>
                Configuring secure IAM roles, encrypting data for storage, and adhering
                to compliance frameworks like GDPR and HIPAA.
              </p>
            </motion.div>
            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white dark:bg-black text-black dark:text-white"
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Deployment & Management
              </h3>
              <p>
                Deploying Kubernetes clusters, managing serverless applications, and
                containerizing workloads with Docker and ECS.
              </p>
            </motion.div>
            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white dark:bg-black text-black dark:text-white"
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Monitoring & Optimization
              </h3>
              <p>
                Optimizing cloud costs, monitoring systems with CloudWatch, and
                designing disaster recovery strategies.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 4 - Certificates */}
        <motion.section
  id="certificates"
  className="snap-start"
  style={{
    height: "100vh",
    padding: "6rem 3rem",
    display: "flex",
    alignItems: "flex-start",
    gap: "3rem",
  }}
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  viewport={{ once: false, amount: 0.5 }}
  transition={{ duration: 0.8 }}
>
  <h2
    style={{
      flex: 1,
      fontSize: "3rem",
      fontWeight: "bold",
      textAlign: "left",
    }}
    className="text-black dark:text-white"
  >
    Certificates
  </h2>
  <div
  style={{
    flex: 2,
    display: "grid",
    gap: "2.5rem",
    gridTemplateColumns: "repeat(2, 1fr)",
  }}
>
    {/* Keep your existing certificate cards here */}
    {/* Card 1 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
      }}
      className="bg-white dark:bg-black text-black dark:text-white"
    >
      <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        AWS Certified Cloud Practitioner
      </h3>
      <p>
        Ideal for beginners to understand cloud concepts, billing, and core AWS
        services.
      </p>
    </motion.div>
    {/* Card 2 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
      }}
      className="bg-white dark:bg-black text-black dark:text-white"
    >
      <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        AWS Certified Developer – Associate
      </h3>
      <p>
        Covers building, deploying, and maintaining AWS-based applications.
      </p>
    </motion.div>
    {/* Card 3 */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
      }}
      className="bg-white dark:bg-black text-black dark:text-white"
    >
      <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        AWS Certified Solutions Architect – Associate
      </h3>
      <p>
        Focused on designing scalable, secure, and reliable cloud solutions in
        AWS.
      </p>
    </motion.div>
  </div>
</motion.section>

        {/* Section 5 - Currently Learning */}
        <motion.section
  id="currently-learning"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false, amount: 0.2 }}
  transition={{ duration: 0.8 }}
  style={{
    height: "100vh",
    padding: "5rem 3rem",
    display: "flex",
    alignItems: "flex-start",
    gap: "2rem",
  }}
  className="snap-start"
>
<h2
  style={{
    flex: 1,
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "left",
  }}
  className="text-black dark:text-white"
>
  Currently Learning
</h2>
<div
  style={{
    flex: 2,
    display: "grid",
    gap: "2.5rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  }}
>
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white dark:bg-black text-black dark:text-white"
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Infrastructure as Code (IaC) Tools
              </h3>
              <ul>
                <li>
                  <strong>Terraform:</strong> Learning to provision and manage
                  multi-cloud infrastructure efficiently.
                </li>
                <li>
                  <strong>AWS CloudFormation:</strong> Understanding AWS-specific
                  infrastructure automation with templates.
                </li>
              </ul>
              
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white dark:bg-black text-black dark:text-white"
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Containerization and Orchestration Tools
              </h3>
              <ul>
                <li>
                  <strong>Docker:</strong> Exploring containerized application
                  development with all dependencies.
                </li>
                <li>
                  <strong>Kubernetes:</strong> Practicing managing and scaling
                  containerized workloads.
                </li>
              </ul>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white dark:bg-black text-black dark:text-white"
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>CI/CD Tools</h3>
              <ul>
                <li>
                  <strong>Jenkins:</strong> Setting up automated build, test, and
                  deployment pipelines.
                </li>
                <li>
                  <strong>AWS CodePipeline:</strong> Creating CI/CD workflows for
                  AWS-native projects.
                </li>
              </ul>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white dark:bg-black text-black dark:text-white"
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Monitoring and Logging Tools
              </h3>
              <ul>
                <li>
                  <strong>AWS CloudWatch:</strong> Analyzing performance, logs, and
                  metrics in AWS environments.
                </li>
                <li>
                  <strong>Prometheus + Grafana:</strong> Using open-source tools for
                  system monitoring and visualization.
                </li>
              </ul>
            </motion.div>

            {/* Card 5 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white dark:bg-black text-black dark:text-white"
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Cloud Security Tools
              </h3>
              <ul>
                <li>
                  <strong>AWS IAM:</strong> Learning to manage user permissions and
                  secure resources.
                </li>
                <li>
                  <strong>AWS KMS:</strong> Practicing data encryption and key
                  management in AWS.
                </li>
              </ul>
            </motion.div>

            {/* Card 6 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white dark:bg-black text-black dark:text-white"
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Cloud Cost Management Tools
              </h3>
              <ul>
                <li>
                  <strong>AWS Cost Explorer:</strong> Tracking AWS usage and optimizing
                  costs.
                </li>
                <li>
                  <strong>Spot.io:</strong> Learning to optimize EC2 spot instance
                  costs and cloud efficiency.
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>
      </div>
       {/* Section 6 - My Skills */}
       <motion.section
  id="my-skills"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false, amount: 0.2 }}
  transition={{ duration: 0.8 }}
  className="snap-start min-h-screen flex flex-col justify-center items-center bg-black text-white px-8"
>
  <h2 className="text-4xl font-semibold mb-12 self-start">My Skills</h2>

  {/* Timeline Container */}
  <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 relative">
    
    {/* Left Side */}
    <div className="space-y-8 text-right pr-8 md:text-right md:pr-8">
      <div>
        <h3 className="text-lg font-bold">AWS</h3>
        <p className="text-sm text-gray-400">Expert</p>
        <p className="text-sm">4 years</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Kubernetes</h3>
        <p className="text-sm text-gray-400">Intermediate</p>
        <p className="text-sm">4 years</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">CI/CD</h3>
        <p className="text-sm text-gray-400">Advanced</p>
        <p className="text-sm">3 years</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Linux</h3>
        <p className="text-sm text-gray-400">Advanced</p>
        <p className="text-sm">4 years</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Security</h3>
        <p className="text-sm text-gray-400">Intermediate</p>
        <p className="text-sm">2 years</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Ansible</h3>
        <p className="text-sm text-gray-400">Advanced</p>
        <p className="text-sm">4 years</p>
      </div>
    </div>

    {/* Bigger Timeline */}
    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 md:transform md:-translate-x-1/2 w-[2px] h-full bg-gray-500 rounded-lg"></div>

    {/* Right Side */}
    <div className="space-y-6 md:space-y-8 pl-8">
      <div>
        <h3 className="text-lg font-bold">Docker</h3>
        <p className="text-sm text-gray-400">Advanced</p>
        <p className="text-sm">5 years</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Terraform</h3>
        <p className="text-sm text-gray-400">Advanced</p>
        <p className="text-sm">3 years</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Python</h3>
        <p className="text-sm text-gray-400">Intermediate</p>
        <p className="text-sm">5 years</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Networking</h3>
        <p className="text-sm text-gray-400">Intermediate</p>
        <p className="text-sm">3 years</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Azure</h3>
        <p className="text-sm text-gray-400">Intermediate</p>
        <p className="text-sm">3 years</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Monitoring</h3>
        <p className="text-sm text-gray-400">Advanced</p>
        <p className="text-sm">3 years</p>
      </div>
    </div>
  </div>
</motion.section>

{/* Footer */}
<footer className="w-full py-6 bg-black text-white flex justify-center items-center border-t border-gray-700 px-4">
  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
    {/* GitHub */}
    <a href="https://github.com/ArsalanAnwer0" target="_blank" rel="noopener noreferrer">
      <Github className="h-6 w-6 text-gray-400 hover:text-white transition" />
    </a>

    {/* LinkedIn */}
    <a href="https://www.linkedin.com/in/arsalan-anwer-272004310/" target="_blank" rel="noopener noreferrer">
      <Linkedin className="h-6 w-6 text-gray-400 hover:text-white transition" />
    </a>

    {/* Instagram */}
    <a href="https://www.instagram.com/_arsalan.ansari/" target="_blank" rel="noopener noreferrer">
      <Instagram className="h-6 w-6 text-gray-400 hover:text-white transition" />
    </a>

    {/* Contact Button */}
    <Button
      className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 transition"
      onClick={() => setIsModalOpen(true)}
    >
      Contact
    </Button>

    {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
  </div>
</footer>
    </div>
  );
}

