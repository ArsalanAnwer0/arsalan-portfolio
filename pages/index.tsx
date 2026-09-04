import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 3D avatars are temporarily disabled but kept in components/scenes for later use.
// import dynamic from 'next/dynamic';
// const DeskScene = dynamic(() => import('../components/scenes/DeskScene'), { ssr: false });
// const PS5Scene = dynamic(() => import('../components/scenes/PS5Scene'), { ssr: false });

// Personality type
type Personality = 'professional' | 'fun';

// Get time-based greeting
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good morning, welcome.';
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon, welcome.';
  } else {
    return 'Good evening, welcome.';
  }
};

const HomePage = () => {
  const [greeting, setGreeting] = useState('');

  // Dual-personality state
  const [personality, setPersonality] = useState<Personality>('professional');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Set greeting on mount
    setGreeting(getTimeBasedGreeting());

    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Mouse position detection for personality switching
    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const leftTrigger = windowWidth * 0.1; // Left 10%
      const rightTrigger = windowWidth * 0.9; // Right 90%

      // Only trigger if in edge zones and switching to different personality
      if (e.clientX < leftTrigger && personality === 'fun') {
        setPersonality('professional');
      } else if (e.clientX > rightTrigger && personality === 'professional') {
        setPersonality('fun');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [personality]);

  // Project links data
  const projects = [
    { name: 'Schedule Builder', url: 'https://github.com/ArsalanAnwer0/schedule-builder' },
    { name: 'Agora', url: 'https://github.com/Agora-Connect/Agora' },
    { name: 'BankingApp', url: 'https://github.com/ArsalanAnwer0/Springboot-BankingApp' },
  ];

  // Fun side data structures
  const animeList = [
    { name: 'Death Note', url: 'https://myanimelist.net/anime/1535/Death_Note' },
    { name: 'AOT', url: 'https://myanimelist.net/anime/16498/Shingeki_no_Kyojin' },
    { name: 'Code Geass', url: 'https://myanimelist.net/anime/1575/Code_Geass__Hangyaku_no_Lelouch' },
    { name: 'Assassination Classroom', url: 'https://myanimelist.net/anime/24833/Ansatsu_Kyoushitsu' },
  ];

  const gamesList = [
    { name: 'FIFA', url: 'https://www.ea.com/games/ea-sports-fc' },
    { name: 'Battlefield', url: 'https://www.ea.com/games/battlefield' },
    { name: 'Marvel Rivals', url: 'https://www.marvelrivals.com/' },
  ];

  // Animation variants for personality transitions
  const personalityVariants = {
    enter: {
      opacity: 1,
      transition: { duration: 0.7, ease: 'easeInOut' }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeInOut' }
    }
  };

  return (
    <div
      className="min-h-screen p-8 md:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden transition-colors duration-700"
      style={{
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: personality === 'professional' ? 'white' : '#FF5722',
        color: 'black'
      }}
    >
      {/* Edge gradient hints */}
      {personality === 'professional' && (
        <div
          className="fixed top-0 right-0 h-full w-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(255, 87, 34, 0.6), rgba(255, 87, 34, 0.4), rgba(255, 87, 34, 0.2), rgba(255, 87, 34, 0.08), transparent)'
          }}
        />
      )}
      {personality === 'fun' && (
        <div
          className="fixed top-0 left-0 h-full w-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.08), transparent)'
          }}
        />
      )}

      <div className="max-w-7xl w-full relative z-10 flex items-center gap-8 lg:gap-12">
        {/* Left: text content */}
        <div className="flex-1 min-w-0 lg:-ml-16">
          <AnimatePresence mode="wait">
            {personality === 'professional' ? (
              <motion.div
                key="professional"
                variants={personalityVariants}
                initial="exit"
                animate="enter"
                exit="exit"
                className="mb-20"
              >
                <p className="text-sm md:text-base mb-8 tracking-wide opacity-50">
                  {greeting}
                </p>

                <div className="max-w-4xl space-y-7 text-xl md:text-2xl lg:text-3xl leading-relaxed font-light">
                  <p>
                    I&apos;m a computer science student at{' '}
                    <a href="https://www.stcloudstate.edu/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                      St. Cloud State University
                    </a>
                    . I build backend services with Python, FastAPI, Go, and Gin, and I&apos;m interested in the infrastructure and operational work required to run them reliably.
                  </p>
                  <p>
                    My work focuses on containerized applications, CI/CD pipelines, Infrastructure as Code, cloud networking, and configuration management. I also work on what happens after deployment i.e monitoring system health, improving observability, planning for failures, and documenting recovery through clear runbooks.
                  </p>
                  <p>
                    At SCSU, I worked as a research intern with{' '}
                    <a href="https://github.com/3C-SCSU/Avatar" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                      Avatar BCI↗
                    </a>
                    , an open source brain computer interface project. I contributed to an existing research codebase and worked at the intersection of software engineering, computer vision, and machine learning. My research explored using OpenCV to recognize the items a person needs to complete a task.
                  </p>
                  <p>
                    My projects include{' '}
                    {projects.map((project, index) => (
                      <span key={project.name}>
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                          {project.name}↗
                        </a>
                        {index < projects.length - 1 ? ', ' : '.'}
                      </span>
                    ))}
                    {' '}Through them, I have worked on backend development, application design, collaboration, and turning technical ideas into usable software.
                  </p>
                  <p>
                    You can find more of my work on{' '}
                    <a href="https://github.com/ArsalanAnwer0" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">GitHub↗</a>, connect with me on{' '}
                    <a href="https://www.linkedin.com/in/arsalan-anwer-cloud/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">LinkedIn↗</a>, or read my writing on{' '}
                    <a href="https://medium.com/@arsalan.anwer9050" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">Medium↗</a>.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="fun"
                variants={personalityVariants}
                initial="exit"
                animate="enter"
                exit="exit"
                className="mb-20"
              >
                <div className="max-w-3xl space-y-7 text-xl md:text-2xl lg:text-3xl leading-relaxed font-light">
                  <p>
                    When I&apos;m away from my computer, I like to cook and read. Cooking helps me slow down, and I enjoy making something good from simple ingredients.
                  </p>
                  <p>
                    Reading is how I relax when I want some quiet. I also love anime, especially stories with smart characters and hard choices. My favorites are {animeList.map((anime, index) => (
                      <span key={anime.name}>
                        <a href={anime.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">{anime.name}↗</a>
                        {index < animeList.length - 1 ? ', ' : '.'}
                      </span>
                    ))}
                  </p>
                  <p>
                    I can get a little competitive when I play games. A close match with a good team can easily turn into one more round. I usually play {gamesList.map((game, index) => (
                      <span key={game.name}>
                        <a href={game.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">{game.name}↗</a>
                        {index < gamesList.length - 1 ? ', ' : '.'}
                      </span>
                    ))}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right-side 3D avatars are temporarily disabled.
        <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
          <AnimatePresence mode="wait">
            {personality === 'professional' ? (
              <motion.div
                key="desk-scene"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <DeskScene />
              </motion.div>
            ) : (
              <motion.div
                key="ps5-scene"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <PS5Scene />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        */}

        {/* Mobile toggle button */}
        {isTouchDevice && (
          <motion.button
            onClick={() => setPersonality(p => p === 'professional' ? 'fun' : 'professional')}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full text-white shadow-lg"
            style={{
              backgroundColor: personality === 'professional' ? '#FF5722' : 'white',
              color: personality === 'professional' ? 'white' : '#FF5722'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {personality === 'professional' ? '🎮' : '💼'}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
