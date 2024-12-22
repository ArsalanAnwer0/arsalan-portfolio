import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Github, Linkedin, Instagram, Sun, Moon } from "lucide-react";

// NEW: Modal Component Import
import ContactModal from "@/components/ui/ContactModal";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState(""); // State for user input message
  const [status, setStatus] = useState(""); // State for message submission status

  // NEW: Modal State for Contact Form
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setStatus("Please enter a message.");
      return;
    }
  
    setStatus("Sending...");
  
    try {
      console.log("Sending message:", message); // Debugging
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }), // Only send `message`
      });
  
      if (response.ok) {
        setStatus("Thanks for sharing! Your feedback means the world to me.");
        setMessage(""); // Clear the input field
      } else {
        const error = await response.json();
        console.error("Response error:", error); // Debugging
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error); // Debugging
      setStatus("An error occurred. Please try again.");
    }
  };
  
  

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-black shadow">
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
              <span className="sr-only">Toggle theme</span>
            </button>

            {/* Social Icons */}
            <a
              href="https://github.com/ArsalanAnwer0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-white hover:text-purple-700 transition"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/arsalan-anwer-272004310/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-white hover:text-purple-700 transition"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/_arsalan.ansari/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-white hover:text-purple-700 transition"
            >
              <Instagram className="h-6 w-6" />
            </a>
             {/* UPDATED: Contact Button to Trigger Modal */}
             <Button onClick={() => setIsModalOpen(true)}>Contact</Button>
              {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-2xl mx-auto dark:text-white">
            Building the future with cloud technology
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto dark:text-gray-300">
            Hi there! I’d love to connect, share ideas, and inspire each other—because great things happen when curious minds come together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            {/* Message Bar */}
            <Input
  type="text"
  placeholder="Love it? Have ideas? Your thoughts inspire innovation."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  className="w-full sm:w-[55rem] dark:bg-gray-800 dark:text-white text-sm placeholder-gray-500"
  style={{ width: "55rem !important" }}
/>

            <Button onClick={handleSendMessage}>Send</Button>
          </div>
          {status && <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{status}</p>}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">
              Hi, I'm Arsalan
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              I'm an aspiring cloud engineer, and I absolutely love diving into the world of technology. I'm excited to learn, grow, and explore everything cloud-related while sharing my journey through content and connecting with amazing people in the tech community. The future is bright, and I can't wait to be a part of it!
            </p>
          </div>
          <div className="relative">
            <div className="relative h-[250px] w-[250px] mx-auto md:ml-auto rounded-full overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Arsalan's Profile Picture"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50 dark:bg-black">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">Projects</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Cloud Architecture</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Designing and implementing scalable cloud infrastructure solutions using modern technologies.
        </p>
        <Button>
        Read More
</Button>

      </div>
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">DevOps Practices</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Implementing CI/CD pipelines and automation workflows for efficient development processes.
        </p>
        <Button>
        Read More
</Button>

      </div>
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Tech Content</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Sharing knowledge and insights about cloud engineering through articles and tutorials.
        </p>
        <Button>
  Read More
</Button>

      </div>
    </div>
  </div>
</section>
      {/* Certificates Section */}
      <section className="py-16 bg-gray-50 dark:bg-black">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">Certificates</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">AWS Cloud Practitioner</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Fundamental understanding of AWS Cloud concepts, services, and architecture.
        </p>
        <Button>
  View Certificate
</Button>
      </div>
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Azure Fundamentals</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Core concepts and services of Microsoft Azure cloud platform.
        </p>
        <Button>
  View Certificate
</Button>
      </div>
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Google Cloud Associate</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Essential knowledge of Google Cloud Platform services and operations.
        </p>
        <Button>
  View Certificate
</Button>
      </div>
    </div>
  </div>
</section>

      {/* Currently Learning Section */}
      <section className="py-16 bg-gray-50 dark:bg-black">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">Currently Learning</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Kubernetes</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Container orchestration and microservices architecture for cloud-native applications.
        </p>
        <Button>
  Track Progress
</Button>

      </div>
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Terraform</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Infrastructure as Code (IaC) for automated cloud resource management.
        </p>
        <Button>
  Track Progress
</Button>

      </div>
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Cloud Security</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Best practices and tools for securing cloud infrastructure and applications.
        </p>
        <Button>
  Track Progress
</Button>

      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-black text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Email - arsalan.anwer9050@gmail.com
        </p>
      </footer>
       {/* NEW: Contact Modal Component */}
       {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
