import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useAnimation } from "framer-motion"; // Import Framer Motion
import { Github, Linkedin, Instagram, Sun, Moon } from "lucide-react";
import { CustomCursor } from "@/components/ui/CustomCursor"; // Custom Cursor Component
import ContactModal from "@/components/ui/ContactModal"; // Modal Component
import HoverImage from "@/components/ui/HoverImage";


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [message, setMessage] = useState(""); // State for message input
  const [status, setStatus] = useState(""); // State for status feedback
  const controls = useAnimation(); // Controls for fading animations  


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);


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
    <div
      className="min-h-screen bg-white dark:bg-black snap-y snap-mandatory overflow-y-scroll"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Header */}
      <header className="bg-white dark:bg-black shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold dark:text-white">Arsalan</h1>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600"
              aria-label="Toggle theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>

            {/* Social Icons */}
            <a href="https://github.com/ArsalanAnwer0" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6 text-gray-600 dark:text-white" />
            </a>
            <a href="https://www.linkedin.com/in/arsalan-anwer-272004310/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6 text-gray-600 dark:text-white" />
            </a>
            <a href="https://www.instagram.com/_arsalan.ansari/" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6 text-gray-600 dark:text-white" />
            </a>

            {/* Contact Button */}
            <Button
              className="text-white bg-black dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700"
              onClick={() => setIsModalOpen(true)}
            >
              Contact
            </Button>

            {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
          </div>
        </div>
      </header>

      {/* Section 1 */}
      <motion.section
        className="min-h-screen flex flex-col justify-center items-center snap-start"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        viewport={{ once: false, amount: 0.5 }} // Trigger fade at 50% visibility
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent text-center">
          Building the future<br /> with cloud technology
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-8 text-xl md:text-2xl max-w-3xl text-center">
          Hi there! I’d love to connect, share ideas, and inspire each other—because great things happen when curious minds come together!
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
        <Input
  type="text"
  value={message}
  onChange={(e) => setMessage(e.target.value)} // Updates the state
  placeholder="Have ideas? Your thoughts inspire innovation"
  className="w-full sm:w-[45rem] dark:bg-gray-800 dark:text-white text-lg md:text-xl"
/>

          <Button
            onClick={handleSendMessage} // Call the function when button is clicked
            className="text-white bg-gray-900 dark:bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-700 px-6 py-4 text-lg md:text-xl"
          >
            Send
          </Button>
        </div>
        {/* Status Message */}
        {status && <p className="mt-4 text-gray-600 dark:text-gray-300">{status}</p>}
      </motion.section>







      <motion.section
  className="min-h-screen flex flex-col justify-center bg-gray-50 dark:bg-black snap-start"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
  style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", padding: "4rem" }}
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
      <h2 className="text-2xl md:text-3xl font-light dark:text-white mb-6">
        Greetings
      </h2>
      <p className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
        I am{" "}
        <HoverImage
          word="Arsalan"
          image="/Arsalan.jpg"
          setHoveredImage={setHoveredImage}
        />
        , an aspiring cloud engineer from{" "}
        <HoverImage
          word="Pakistan"
          image="/Pakistan3.jpg"
          setHoveredImage={setHoveredImage}
        />
        , currently pursuing my undergraduate studies at{" "}
        <HoverImage
          word="SCSU"
          image="/SCSU.jpg"
          setHoveredImage={setHoveredImage}
        />{""}
        ,{" "}
        <HoverImage
          word="US"
          image="/USA.jpg"
          setHoveredImage={setHoveredImage}
        />
        .
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
            width: "28rem", // Consistent image size
            height: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
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
    style={{
      flex: 2,
      display: "grid",
      gap: "2.5rem",
      gridTemplateColumns: "repeat(2, 1fr)",
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
  viewport={{ once: false, amount: 0.2 }} // Adjusting the viewport for fading in and out
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

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-black text-center">
        <p className="text-gray-600 dark:text-gray-300">Email - arsalan.anwer9050@gmail.com</p>
      </footer>
    </div>
  );
}
