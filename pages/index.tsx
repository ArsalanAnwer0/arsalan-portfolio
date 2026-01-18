import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Get time-based greeting
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'GOOD MORNING, VISITOR';
  } else if (hour >= 12 && hour < 18) {
    return 'GOOD AFTERNOON, VISITOR';
  } else {
    return 'GOOD EVENING, VISITOR';
  }
};

const HomePage = () => {
  const [greeting, setGreeting] = useState('');
  const [hoveredSection, setHoveredSection] = useState<'projects' | 'certs' | 'experience' | null>(null);
  const [currentSnippet, setCurrentSnippet] = useState<{ text: string; content: string; link?: string } | null>(null);

  // Rotating snippets - different insights shown on each visit
  const snippets = [
    {
      text: 'I AM CURRENTLY READING ',
      content: 'RESEARCH ON RECOGNIZING REQUIRED ITEMS BASED ON OPENCV AND MACHINE LEARNING',
      link: 'https://doaj.org/article/00069ae971e64aee81c7e9df247a6965'
    },
    {
      text: 'MY MOST RECENT ',
      content: 'OPEN SOURCE CONTRIBUTION',
      link: 'https://github.com/3C-SCSU/Avatar/commit/3b92efe3e9b0fdbb6ed463403942c82cd4a5ae94'
    },
    {
      text: 'I AM LEARNING ABOUT AGENTIC AI, AGENTIC WORKFLOWS AND GENERATIVE AI ',
      content: 'DURING MY LEISURE TIME'
    },
    {
      text: 'MY FAVORITE ARTICLE RIGHT NOW IS ',
      content: '"HOW I REVISE DSA EVERY SATURDAY (EVEN WHEN I WAKE UP AT 12)"',
      link: 'https://medium.com/@himanshusingour7/how-i-revise-dsa-every-saturday-even-when-i-wake-up-at-12-3be5efdf43b4'
    },
    {
      text: 'I AM CURRENTLY EXPLORING ',
      content: 'INNGEST',
      link: 'https://www.inngest.com/?utm_source=youtube&utm_medium=video&utm_campaign=yt-hc-3&utm_term=next.js'
    },
    {
      text: 'WORKING ON WRITING A ',
      content: 'MEDIUM ARTICLE ABOUT VPC AND VPC PEERING IN AWS'
    }
  ];

  useEffect(() => {
    // Set greeting on mount
    setGreeting(getTimeBasedGreeting());

    // Pick a random snippet on mount
    const randomIndex = Math.floor(Math.random() * snippets.length);
    setCurrentSnippet(snippets[randomIndex]);
  }, []);

  // Project links data
  const projects = [
    { name: 'BankingApp', url: 'https://github.com/ArsalanAnwer0/Springboot-BankingApp' },
    { name: 'Smart Light Controller', url: 'https://github.com/ArsalanAnwer0/smart-light-controller' },
    { name: 'CostWatch', url: 'https://github.com/ArsalanAnwer0/CostWatch' },
    { name: 'Carousel', url: 'https://github.com/ArsalanAnwer0/carousel' },
  ];

  // Certificate links data
  const certificates = [
    { name: 'TIP02', url: 'https://www.linkedin.com/in/arsalan-anwer-cloud/overlay/1764706815586/single-media-viewer/?profileId=ACoAAE8F3HYB5wErnrxPReC9UQGztoiWN_A9VLo' },
  ];

  // Experience data
  const experiences = [
    {
      name: 'Research Assistant',
      org: 'Avatar BCI',
      url: 'https://github.com/3C-SCSU'
    },
    {
      name: 'Administrative Support Assistant',
      org: 'CIS, SGS',
      url: 'https://www.stcloudstate.edu/internationalstudies/'
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 md:p-16 lg:p-24 flex items-center justify-center" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
      <div className="max-w-7xl w-full">
        {/* Main content */}
        <div className="mb-20">
          <h1 className="text-xl md:text-2xl lg:text-3xl mb-12 tracking-wide font-light">
            {greeting}
          </h1>

          <div className="space-y-10 mb-16">
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-4xl font-light">
              I&apos;M ARSALAN. I LIKE TO ARCHITECT CLOUD APPLICATIONS AND OPTIMIZE DEPLOYMENT WORKFLOWS.
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-4xl font-light">
              I&apos;M A COMPUTER SCIENCE STUDENT AT{' '}
              <a
                href="https://www.stcloudstate.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-60 transition-opacity"
              >
                SCSU
              </a>
              .
            </p>
          </div>

          {/* Projects, Certs, and Experience Section */}
          <div className="space-y-4 text-xl md:text-2xl lg:text-3xl font-light">
            {/* Projects Section */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredSection('projects')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <span className="cursor-pointer hover:opacity-60 transition-opacity">
                PROJECTS
              </span>

              <AnimatePresence>
                {hoveredSection === 'projects' && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-6 text-xl md:text-2xl lg:text-3xl font-light"
                  >
                    [
                    {projects.map((project, index) => (
                      <span key={index}>
                        &quot;
                        <a
                          href={project.url}
                          className="hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.name}
                        </a>
                        &quot;{index < projects.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Certificates Section */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredSection('certs')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <span className="cursor-pointer hover:opacity-60 transition-opacity">
                CERTS
              </span>

              <AnimatePresence>
                {hoveredSection === 'certs' && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-6 text-xl md:text-2xl lg:text-3xl font-light"
                  >
                    [
                    {certificates.map((cert, index) => (
                      <span key={index}>
                        &quot;
                        <a
                          href={cert.url}
                          className="hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {cert.name}
                        </a>
                        &quot;{index < certificates.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Experience Section */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredSection('experience')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <span className="cursor-pointer hover:opacity-60 transition-opacity">
                EXPERIENCE
              </span>

              <AnimatePresence>
                {hoveredSection === 'experience' && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-6 text-xl md:text-2xl lg:text-3xl font-light"
                  >
                    [
                    {experiences.map((exp, index) => (
                      <span key={index}>
                        &quot;
                        <a
                          href={exp.url}
                          className="hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {exp.name} - {exp.org}
                        </a>
                        &quot;{index < experiences.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mb-16 mt-6 text-xl md:text-2xl lg:text-3xl font-light">
            <p>
              FIND ME ON{' '}
              <a
                href="https://www.linkedin.com/in/arsalan-anwer-cloud/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-60 transition-opacity"
              >
                LINKEDIN↗
              </a>
              ,{' '}
              <a
                href="https://github.com/ArsalanAnwer0"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-60 transition-opacity"
              >
                GITHUB↗
              </a>
              ,
              <br />
              AND READ MY{' '}
              <a
                href="https://medium.com/@arsalan.anwer9050"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-60 transition-opacity"
              >
                MEDIUM↗
              </a>{' '}
              ARTICLES.
            </p>
          </div>

          {/* PS - Rotating snippet at the bottom */}
          {currentSnippet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-20"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl">
                <span className="opacity-50">PS.</span> {currentSnippet.text}
                {currentSnippet.link ? (
                  <a
                    href={currentSnippet.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-60 transition-opacity"
                  >
                    {currentSnippet.content}
                  </a>
                ) : (
                  <span>{currentSnippet.content}</span>
                )}
                .
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
