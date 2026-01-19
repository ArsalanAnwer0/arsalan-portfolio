import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Personality type
type Personality = 'professional' | 'fun';

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
  const [hoveredSection, setHoveredSection] = useState<'projects' | 'certs' | 'experience' | 'anime' | 'games' | 'creators' | 'nerdcorner' | null>(null);
  const [currentSnippet, setCurrentSnippet] = useState<{ text: string; content: string; link?: string } | null>(null);

  // Dual-personality state
  const [personality, setPersonality] = useState<Personality>('professional');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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
    { name: 'BankingApp', url: 'https://github.com/ArsalanAnwer0/Springboot-BankingApp' },
    { name: 'Smart Light Controller', url: 'https://github.com/ArsalanAnwer0/smart-light-controller' },
    { name: 'CostWatch', url: 'https://github.com/ArsalanAnwer0/CostWatch' },
    { name: 'Carousel', url: 'https://github.com/ArsalanAnwer0/carousel' },
    { name: 'Schedule Builder', url: 'https://github.com/ArsalanAnwer0/schedule-builder' },
  ];

  // Certificate links data
  const certificates = [
    { name: 'TIP02', url: 'https://www.linkedin.com/in/arsalan-anwer-cloud/overlay/1764706815586/single-media-viewer/?profileId=ACoAAE8F3HYB5wErnrxPReC9UQGztoiWN_A9VLo' },
  ];

  // Experience data
  const experiences = [
    {
      name: 'Research Assistant',
      org: [{ name: 'Avatar BCI', url: 'https://github.com/3C-SCSU' }]
    },
    {
      name: 'Administrative Support Assistant',
      org: [
        { name: 'CIS', url: 'https://www.stcloudstate.edu/internationalstudies/' },
        { name: 'SGS', url: 'https://www.stcloudstate.edu/graduatestudies/' }
      ]
    },
  ];

  // Fun side data structures
  const animeList = [
    { name: 'AOT', url: 'https://myanimelist.net/anime/16498/Shingeki_no_Kyojin' },
    { name: 'Monster', url: 'https://myanimelist.net/anime/19/Monster' },
    { name: 'Assassination Classroom', url: 'https://myanimelist.net/anime/24833/Ansatsu_Kyoushitsu' },
    { name: 'Kaguya-sama: Love Is War', url: 'https://myanimelist.net/anime/37999/Kaguya-sama_wa_Kokurasetai__Tensai-tachi_no_Renai_Zunousen' },
    { name: 'Mashle', url: 'https://myanimelist.net/anime/52211/Mashle' },
  ];

  const gamesList = [
    { name: 'RDR2', url: 'https://www.rockstargames.com/reddeadredemption2' },
    { name: 'Marvel Rivals', url: 'https://www.marvelrivals.com/' },
    { name: 'Battlefield', url: 'https://www.ea.com/games/battlefield' },
    { name: 'Elden Ring', url: 'https://en.bandainamcoent.eu/elden-ring/elden-ring' },
  ];

  const contentCreators = [
    { name: 'Takuya Matsuyama (craftzdog)', url: 'https://www.youtube.com/@devaslife' },
    { name: 'Andres Vidoza', url: 'https://www.youtube.com/@AndresVideos' },
    { name: 'bashbunni', url: 'https://www.youtube.com/@bashbunni' },
    { name: 'Joma Tech', url: 'https://www.youtube.com/@JomaOppa' },
  ];

  const nerdCorner = [
    { category: 'Keyboards', items: 'Keychron K2 HE, Keychron K8' },
    { category: 'Mouse', items: 'Logitech MX Master 3S' },
    { category: 'Monitor', items: 'MSI PRO MP275W' },
    { category: 'Editor', items: 'Neovim' },
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
        <div className="fixed top-0 right-0 h-full w-32 bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none" />
      )}
      {personality === 'fun' && (
        <div className="fixed top-0 left-0 h-full w-32 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
      )}

      <div className="max-w-7xl w-full relative z-10">
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
          <h1 className="text-xl md:text-2xl lg:text-3xl mb-12 tracking-wide font-light">
            {greeting}
          </h1>

          <div className="space-y-10 mb-8">
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
                        &quot;{exp.name} - {exp.org.map((orgItem, orgIndex) => (
                          <span key={orgIndex}>
                            <a
                              href={orgItem.url}
                              className="hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {orgItem.name}
                            </a>
                            {orgIndex < exp.org.length - 1 ? ', ' : ''}
                          </span>
                        ))}&quot;{index < experiences.length - 1 ? ', ' : ''}
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
              <h1 className="text-xl md:text-2xl lg:text-3xl mb-12 tracking-wide font-light">
                HEY THERE, FELLOW NERD
              </h1>

              <div className="space-y-10 mb-8">
                <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-4xl font-light">
                  I&apos;M ARSALAN. I LIKE PLAYING GAMES AND WATCH ANIME.
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-4xl font-light">
                  I LOVE EXPLORING NEW WORLDS IN GAMES AND BINGE WATCHING MY FAVORITE SHOWS.
                </p>
              </div>

              {/* Fun sections */}
              <div className="space-y-4 text-xl md:text-2xl lg:text-3xl font-light">
                {/* Favorite Anime Section */}
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredSection('anime')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <span className="cursor-pointer hover:opacity-60 transition-opacity">
                    FAV ANIME
                  </span>

                  <AnimatePresence>
                    {hoveredSection === 'anime' && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 text-xl md:text-2xl lg:text-3xl font-light"
                      >
                        [
                        {animeList.map((anime, index) => (
                          <span key={index}>
                            &quot;
                            <a
                              href={anime.url}
                              className="hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {anime.name}
                            </a>
                            &quot;{index < animeList.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                        ]
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Games Section */}
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredSection('games')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <span className="cursor-pointer hover:opacity-60 transition-opacity">
                    GAMES
                  </span>

                  <AnimatePresence>
                    {hoveredSection === 'games' && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 text-xl md:text-2xl lg:text-3xl font-light"
                      >
                        [
                        {gamesList.map((game, index) => (
                          <span key={index}>
                            &quot;
                            <a
                              href={game.url}
                              className="hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {game.name}
                            </a>
                            &quot;{index < gamesList.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                        ]
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content Creators Section */}
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredSection('creators')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <span className="cursor-pointer hover:opacity-60 transition-opacity">
                    FAV CONTENT CREATORS
                  </span>

                  <AnimatePresence>
                    {hoveredSection === 'creators' && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 text-xl md:text-2xl lg:text-3xl font-light"
                      >
                        [
                        {contentCreators.map((creator, index) => (
                          <span key={index}>
                            &quot;
                            <a
                              href={creator.url}
                              className="hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {creator.name}
                            </a>
                            &quot;{index < contentCreators.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                        ]
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Nerd Corner Section */}
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredSection('nerdcorner')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <span className="cursor-pointer hover:opacity-60 transition-opacity">
                    NERD CORNER
                  </span>

                  <AnimatePresence>
                    {hoveredSection === 'nerdcorner' && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 text-xl md:text-2xl lg:text-3xl font-light"
                      >
                        [
                        {nerdCorner.map((item, index) => (
                          <span key={index}>
                            &quot;{item.category}: {item.items}&quot;{index < nerdCorner.length - 1 ? ', ' : ''}
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
                    href="https://x.com/ArsalanAnw38631"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-60 transition-opacity"
                  >
                    X↗
                  </a>
                  ,{' '}
                  <a
                    href="https://mastodon.social/@pipefitter08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-60 transition-opacity"
                  >
                    MASTODON↗
                  </a>
                  ,
                  <br />
                  AND CHECK OUT MY{' '}
                  <a
                    href="https://myanimelist.net/animelist/pipefitter08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-60 transition-opacity"
                  >
                    MAL↗
                  </a>
                  .
                </p>
              </div>

              {/* PS - Fun snippet */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-20"
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl">
                  <span className="opacity-50">PS.</span> CURRENTLY GRINDING THROUGH ELDEN RING DLC AND REWATCHING MONSTER FOR THE THIRD TIME.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
