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
  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
>
  <Github className="h-6 w-6 text-gray-600 dark:text-white hover:text-purple-700 transition" />
</a>
<a
  href="https://www.linkedin.com/in/arsalan-anwer-272004310/"
  target="_blank"
  rel="noopener noreferrer"
  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
>
  <Linkedin className="h-6 w-6 text-gray-600 dark:text-white hover:text-purple-700 transition" />
</a>
<a
  href="https://www.instagram.com/_arsalan.ansari/"
  target="_blank"
  rel="noopener noreferrer"
  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
>
  <Instagram className="h-6 w-6 text-gray-600 dark:text-white hover:text-purple-700 transition" />
</a>

{/* Contact Button */}
<Button
  className="text-white bg-black dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700 transition"
  onClick={() => setIsModalOpen(true)}
>
  Contact
</Button>


{isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}

          </div>
        </div>
      </header>

      <section className="py-20 bg-white dark:bg-black">
  <div className="container mx-auto px-6 text-center">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent leading-tight">
      Building the future<br /> with cloud technology
    </h1>
    <p className="text-gray-600 dark:text-gray-300 mt-6 text-lg md:text-xl max-w-2xl mx-auto">
      Hi there! I’d love to connect, share ideas, and inspire each other—because great things happen when curious minds come together!
    </p>
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      {/* Input Box */}
      <Input
        type="text"
        placeholder="Have ideas? Your thoughts inspire innovation"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full sm:w-[40rem] dark:bg-gray-800 dark:text-white text-sm placeholder-gray-500 px-6 py-3 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 focus:ring focus:ring-purple-400"
      />
{/* Send Button */}
<Button
  onClick={handleSendMessage}
  className="text-white bg-gray-900 dark:bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-all"
>
  Send
</Button>


    </div>
    {/* Feedback Status */}
    {status && (
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        {status}
      </p>
    )}
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
      {/* Project 1 */}
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Cloud Architecture</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Designing and implementing scalable cloud infrastructure solutions using modern technologies.
        </p>
        <button className="text-gray-900 dark:text-white hover:underline transition">Read More</button>
      </div>
      {/* Project 2 */}
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">DevOps Practices</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Implementing CI/CD pipelines and automation workflows for efficient development processes.
        </p>
        <button className="text-gray-900 dark:text-white hover:underline transition">Read More</button>
      </div>
      {/* Project 3 */}
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Tech Content</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Sharing knowledge and insights about cloud engineering through articles and tutorials.
        </p>
        <button className="text-gray-900 dark:text-white hover:underline transition">Read More</button>
      </div>
    </div>
  </div>
</section>

{/* Certificates Section */}
<section className="py-16 bg-gray-50 dark:bg-black">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">Certificates</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Certificate 1 */}
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">AWS Cloud Practitioner</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Fundamental understanding of AWS Cloud concepts, services, and architecture.
        </p>
        <button className="text-gray-900 dark:text-white hover:underline transition">View Certificate</button>
      </div>
      {/* Certificate 2 */}
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Azure Fundamentals</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Core concepts and services of Microsoft Azure cloud platform.
        </p>
        <button className="text-gray-900 dark:text-white hover:underline transition">View Certificate</button>
      </div>
      {/* Certificate 3 */}
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Google Cloud Associate</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Essential knowledge of Google Cloud Platform services and operations.
        </p>
        <button className="text-gray-900 dark:text-white hover:underline transition">View Certificate</button>
      </div>
    </div>
  </div>
</section>

{/* Currently Learning Section */}
<section className="py-16 bg-gray-50 dark:bg-black">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">Currently Learning</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Learning Item 1 */}
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Kubernetes</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Container orchestration and microservices architecture for cloud-native applications.
        </p>
        <button className="text-gray-900 dark:text-white hover:underline transition">Track Progress</button>
      </div>
      {/* Learning Item 2 */}
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Terraform</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Infrastructure as Code (IaC) for automated cloud resource management.
        </p>
        <button className="text-gray-900 dark:text-white hover:underline transition">Track Progress</button>
      </div>
      {/* Learning Item 3 */}
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Cloud Security</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Best practices and tools for securing cloud infrastructure and applications.
        </p>
        <button className="text-gray-900 dark:text-white hover:underline transition">Track Progress</button>
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
