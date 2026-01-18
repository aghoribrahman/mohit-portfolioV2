import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import TechStackSection from './sections/TechStackSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import BlogSection from './sections/BlogSection';
import ContactSection from './sections/ContactSection';
import Navigation from './Navigation';

const ScrollPortfolio = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [canNavigateNext, setCanNavigateNext] = useState(false);
  const [canNavigatePrev, setCanNavigatePrev] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    { id: 'hero', component: HeroSection, title: 'Home', color: 'primary' },
    { id: 'about', component: AboutSection, title: 'About', color: 'secondary' },
    { id: 'tech', component: TechStackSection, title: 'Stack', color: 'accent' },
    { id: 'projects', component: ProjectsSection, title: 'Projects', color: 'neon-purple' },
    { id: 'experience', component: ExperienceSection, title: 'Experience', color: 'neon-blue' },
    { id: 'blog', component: BlogSection, title: 'Blog', color: 'neon-green' },
    { id: 'contact', component: ContactSection, title: 'Contact', color: 'neon-orange' }
  ];

  // Handle viewport width and mobile detection
  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsMobile(width < 768);
    };

    // Set initial values
    updateViewport();

    // Add resize listener
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  // Check scroll position and control navigation
  useEffect(() => {
    const checkScrollPosition = () => {
      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) {
        // If no scrollable content, allow navigation immediately
        setCanNavigateNext(true);
        setCanNavigatePrev(currentSection > 0);
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      // More lenient scroll detection - allow next navigation when user has scrolled to at least 85% of content
      // or if content doesn't need scrolling (fits in viewport)
      const contentFitsViewport = scrollHeight <= clientHeight + 20;
      setCanNavigateNext(contentFitsViewport || scrollPercentage >= 0.85);

      // Always allow previous navigation unless at first section
      setCanNavigatePrev(currentSection > 0);
    };

    // Check initial state with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(checkScrollPosition, 100);

    // Add scroll listener to current section
    const currentSectionElement = sectionRefs.current[currentSection];
    if (currentSectionElement) {
      currentSectionElement.addEventListener('scroll', checkScrollPosition, { passive: true });

      return () => {
        clearTimeout(timeoutId);
        currentSectionElement.removeEventListener('scroll', checkScrollPosition);
      };
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentSection]);

  // Reset scroll position when section changes
  useEffect(() => {
    const currentSectionElement = sectionRefs.current[currentSection];
    if (currentSectionElement) {
      currentSectionElement.scrollTop = 0;
    }
  }, [currentSection]);

  // Enhanced horizontal scroll handling with controlled transitions
  useEffect(() => {
    let isScrollInProgress = false;

    const handleScroll = (e: WheelEvent) => {
      if (isScrollInProgress || isTransitioning) return;

      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) {
        // If no section element, allow navigation
        const delta = Math.sign(e.deltaY);
        if (delta > 0 && currentSection < sections.length - 1) {
          e.preventDefault();
          isScrollInProgress = true;
          setIsTransitioning(true);
          setCurrentSection(prev => prev + 1);
          setTimeout(() => {
            isScrollInProgress = false;
            setIsTransitioning(false);
          }, 800);
        } else if (delta < 0 && currentSection > 0) {
          e.preventDefault();
          isScrollInProgress = true;
          setIsTransitioning(true);
          setCurrentSection(prev => prev - 1);
          setTimeout(() => {
            isScrollInProgress = false;
            setIsTransitioning(false);
          }, 800);
        }
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      const delta = Math.sign(e.deltaY);

      // More lenient scroll boundary detection
      const scrollTolerance = 10;
      const atTop = scrollTop <= scrollTolerance;
      const atBottom = scrollTop + clientHeight >= scrollHeight - scrollTolerance;
      const hasScrollableContent = scrollHeight > clientHeight + 30; // Reduced threshold



      // Allow section navigation with more lenient conditions
      if (delta > 0 && currentSection < sections.length - 1) {
        // Next section: allow if no scrollable content OR user is at bottom OR can navigate next
        if (!hasScrollableContent || atBottom || canNavigateNext) {
          e.preventDefault();
          isScrollInProgress = true;
          setIsTransitioning(true);
          setCurrentSection(prev => prev + 1);

          setTimeout(() => {
            isScrollInProgress = false;
            setIsTransitioning(false);
          }, 800);
        }
      } else if (delta < 0 && currentSection > 0) {
        // Previous section: allow if no scrollable content OR user is at top
        if (!hasScrollableContent || atTop) {
          e.preventDefault();
          isScrollInProgress = true;
          setIsTransitioning(true);
          setCurrentSection(prev => prev - 1);

          setTimeout(() => {
            isScrollInProgress = false;
            setIsTransitioning(false);
          }, 800);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollInProgress || isTransitioning) return;

      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      const atTop = scrollTop <= 5;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const hasScrollableContent = scrollHeight > clientHeight + 20;

      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && currentSection < sections.length - 1 && canNavigateNext && (!hasScrollableContent || atBottom)) {
        e.preventDefault();
        isScrollInProgress = true;
        setIsTransitioning(true);
        setCurrentSection(prev => prev + 1);

        setTimeout(() => {
          isScrollInProgress = false;
          setIsTransitioning(false);
        }, 800);
      } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && currentSection > 0 && canNavigatePrev && (!hasScrollableContent || atTop)) {
        e.preventDefault();
        isScrollInProgress = true;
        setIsTransitioning(true);
        setCurrentSection(prev => prev - 1);

        setTimeout(() => {
          isScrollInProgress = false;
          setIsTransitioning(false);
        }, 800);
      }
    };

    // Enhanced Touch events for mobile - supports both horizontal swipe and vertical scroll transitions
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let lastTouchY = 0;
    let touchScrollTimeout: NodeJS.Timeout | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      touchStartTime = Date.now();

      // Clear any existing timeout
      if (touchScrollTimeout) {
        clearTimeout(touchScrollTimeout);
        touchScrollTimeout = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrollInProgress || isTransitioning) return;

      const currentTouchY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentTouchY;
      lastTouchY = currentTouchY;

      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      const atTop = scrollTop <= 10;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      const hasScrollableContent = scrollHeight > clientHeight + 30;

      // Handle vertical scroll transitions when at boundaries
      if (hasScrollableContent) {
        // If scrolling down and at bottom, prepare for next section
        if (deltaY > 0 && atBottom && currentSection < sections.length - 1 && canNavigateNext) {
          // Clear existing timeout and set new one
          if (touchScrollTimeout) clearTimeout(touchScrollTimeout);

          touchScrollTimeout = setTimeout(() => {
            if (!isScrollInProgress && !isTransitioning) {
              setIsTransitioning(true);
              setCurrentSection(prev => prev + 1);
              setTimeout(() => setIsTransitioning(false), 800);
            }
          }, 150); // Small delay to prevent accidental transitions
        }
        // If scrolling up and at top, prepare for previous section
        else if (deltaY < 0 && atTop && currentSection > 0 && canNavigatePrev) {
          if (touchScrollTimeout) clearTimeout(touchScrollTimeout);

          touchScrollTimeout = setTimeout(() => {
            if (!isScrollInProgress && !isTransitioning) {
              setIsTransitioning(true);
              setCurrentSection(prev => prev - 1);
              setTimeout(() => setIsTransitioning(false), 800);
            }
          }, 150);
        }
        // Clear timeout if not at boundary
        else if (touchScrollTimeout) {
          clearTimeout(touchScrollTimeout);
          touchScrollTimeout = null;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollInProgress || isTransitioning) return;

      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      const atTop = scrollTop <= 10;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      const hasScrollableContent = scrollHeight > clientHeight + 30;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;
      const touchDuration = Date.now() - touchStartTime;

      // Handle horizontal swipes (existing functionality)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && touchDuration < 500) {
        if (deltaX > 0 && currentSection < sections.length - 1 && canNavigateNext && (!hasScrollableContent || atBottom)) {
          // Swipe left (next section)
          e.preventDefault();
          setIsTransitioning(true);
          setCurrentSection(prev => prev + 1);
          setTimeout(() => setIsTransitioning(false), 800);
        } else if (deltaX < 0 && currentSection > 0 && canNavigatePrev && (!hasScrollableContent || atTop)) {
          // Swipe right (previous section)
          e.preventDefault();
          setIsTransitioning(true);
          setCurrentSection(prev => prev - 1);
          setTimeout(() => setIsTransitioning(false), 800);
        }
      }
      // Handle vertical swipes for sections without scrollable content
      else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 30 && touchDuration < 500 && !hasScrollableContent) {
        if (deltaY > 0 && currentSection < sections.length - 1 && canNavigateNext) {
          // Swipe up (next section)
          e.preventDefault();
          setIsTransitioning(true);
          setCurrentSection(prev => prev + 1);
          setTimeout(() => setIsTransitioning(false), 800);
        } else if (deltaY < 0 && currentSection > 0 && canNavigatePrev) {
          // Swipe down (previous section)
          e.preventDefault();
          setIsTransitioning(true);
          setCurrentSection(prev => prev - 1);
          setTimeout(() => setIsTransitioning(false), 800);
        }
      }

      // Clear any pending timeout
      if (touchScrollTimeout) {
        clearTimeout(touchScrollTimeout);
        touchScrollTimeout = null;
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      // Clean up timeout
      if (touchScrollTimeout) {
        clearTimeout(touchScrollTimeout);
      }
    };
  }, [currentSection, isTransitioning, sections.length]);

  const navigateToSection = (index: number) => {
    if (!isTransitioning && index !== currentSection) {
      setIsTransitioning(true);
      setCurrentSection(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1 && canNavigateNext && !isTransitioning) {
      navigateToSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0 && canNavigatePrev && !isTransitioning) {
      navigateToSection(currentSection - 1);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background" style={{ perspective: '1000px' }}>
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/mohit.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/90" />
        <div className="absolute inset-0 bg-mesh opacity-20" />
      </div>

      {/* Optimized Floating Elements - Reduced for Performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Minimal Code Brackets - Only on Desktop */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`bracket-${i}`}
            className="absolute text-primary/10 font-mono text-lg hidden lg:block"
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`
            }}
          >
            {i % 2 === 0 ? '{' : '}'}
          </motion.div>
        ))}

        {/* Minimal Function Symbols */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`func-${i}`}
            className="absolute text-neon-purple/15 font-mono text-base hidden lg:block"
            animate={{
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3
            }}
            style={{
              left: `${70 + i * 15}%`,
              top: `${30 + i * 25}%`
            }}
          >
            {i % 2 === 0 ? 'fn()' : '=>'}
          </motion.div>
        ))}
      </div>

      {/* Parallax Background Layer - Moves at 0.5x speed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="flex h-full items-center gpu-accelerated"
          animate={{
            x: viewportWidth > 0 ? -currentSection * viewportWidth * 0.5 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 40,
            mass: 1
          }}
        >
          {sections.map((section) => (
            <div
              key={`parallax-${section.id}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: viewportWidth > 0 ? viewportWidth * 0.5 : '50vw',
                // Ensure text doesn't overflow its container
                overflow: 'hidden'
              }}
            >
              <span
                className="text-[15vw] lg:text-[12vw] font-black text-foreground/5 whitespace-nowrap select-none font-orbitron"
                style={{
                  // Add a subtle gradient or stroke if desired, keeping it simple for now
                }}
              >
                {section.title.toUpperCase()}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50"
        style={{ width: `${(currentSection / (sections.length - 1)) * 100}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${(currentSection / (sections.length - 1)) * 100}%` }}
        transition={{ duration: 0.5 }}
      />

      {/* Navigation */}
      <Navigation
        sections={sections}
        currentSection={currentSection}
        onNavigate={navigateToSection}
        isMobile={isMobile}
      />

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full z-10 overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          className="flex h-full gpu-accelerated"
          animate={{
            x: viewportWidth > 0 ? -currentSection * viewportWidth : 0
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 40,
            mass: 1
          }}
        >
          {sections.map((section, index) => {
            const SectionComponent = section.component;

            return (
              <div
                key={section.id}
                className="flex-shrink-0 w-screen h-full relative"
              >
                <div
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
                >
                  <SectionComponent
                    onNavigateToProjects={section.id === 'hero' ? () => navigateToSection(3) : undefined}
                  />
                </div>

                {/* Section Color Overlay */}
                <div
                  className={`absolute inset-0 pointer-events-none opacity-5 bg-gradient-to-br from-${section.color} to-transparent`}
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Arrows - Mobile & Desktop Responsive */}
      {currentSection > 0 && canNavigatePrev && (
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          onClick={prevSection}
          className={`fixed ${isMobile ? 'left-1 top-1/2' : 'left-2 lg:left-4 top-1/2'} transform -translate-y-1/2 z-40 ${isMobile ? 'p-1.5' : 'p-2 lg:p-3'} rounded-full bg-background/20 backdrop-blur-xl border border-border/30 text-primary hover:bg-primary/10 transition-all duration-300 gpu-accelerated`}
          whileHover={{ scale: 1.05, x: isMobile ? -1 : -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={isMobile ? 16 : 20} className="lg:w-6 lg:h-6" />
        </motion.button>
      )}

      {currentSection < sections.length - 1 && canNavigateNext && (
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: canNavigateNext ? 1 : 0.5,
            x: 0
          }}
          exit={{ opacity: 0, x: 50 }}
          onClick={nextSection}
          disabled={!canNavigateNext}
          className={`fixed ${isMobile ? 'right-1 top-1/2' : 'right-2 lg:right-4 top-1/2'} transform -translate-y-1/2 z-40 ${isMobile ? 'p-1.5' : 'p-2 lg:p-3'} rounded-full bg-background/20 backdrop-blur-xl border border-border/30 transition-all duration-300 ${canNavigateNext
            ? 'text-primary hover:bg-primary/10 cursor-pointer'
            : 'text-muted-foreground/50 cursor-not-allowed'
            } gpu-accelerated`}
          whileHover={canNavigateNext ? { scale: 1.05, x: isMobile ? 1 : 2 } : {}}
          whileTap={canNavigateNext ? { scale: 0.95 } : {}}
        >
          <ChevronRight size={isMobile ? 16 : 20} className="lg:w-6 lg:h-6" />
        </motion.button>
      )}

      {/* Section Indicators - Enhanced Mobile Size */}
      <div className={`fixed ${isMobile ? 'bottom-4' : 'bottom-4'} left-1/2 transform -translate-x-1/2 z-30`}>
        <div className={`flex gap-3 ${isMobile ? 'p-3' : 'p-3'} rounded-2xl bg-background/20 backdrop-blur-xl border border-border/30`}>
          {sections.map((section, index) => (
            <motion.button
              key={index}
              onClick={() => navigateToSection(index)}
              className={`relative ${isMobile ? 'w-4 h-4' : 'w-3 h-3'} rounded-full transition-all duration-300 group`}
              style={{
                backgroundColor: currentSection === index
                  ? section.color === 'primary' ? 'hsl(var(--primary))' :
                    section.color === 'secondary' ? 'hsl(var(--secondary))' :
                      section.color === 'accent' ? 'hsl(var(--accent))' :
                        section.color === 'neon-purple' ? 'hsl(var(--neon-purple))' :
                          section.color === 'neon-blue' ? 'hsl(var(--neon-blue))' :
                            section.color === 'neon-green' ? 'hsl(var(--neon-green))' :
                              section.color === 'neon-orange' ? 'hsl(var(--neon-orange))' :
                                'hsl(var(--primary))'
                  : 'hsl(var(--muted-foreground) / 0.3)',
                boxShadow: currentSection === index
                  ? `0 0 20px ${section.color === 'primary' ? 'hsl(var(--primary) / 0.5)' :
                    section.color === 'secondary' ? 'hsl(var(--secondary) / 0.5)' :
                      section.color === 'accent' ? 'hsl(var(--accent) / 0.5)' :
                        section.color === 'neon-purple' ? 'hsl(var(--neon-purple) / 0.5)' :
                          section.color === 'neon-blue' ? 'hsl(var(--neon-blue) / 0.5)' :
                            section.color === 'neon-green' ? 'hsl(var(--neon-green) / 0.5)' :
                              section.color === 'neon-orange' ? 'hsl(var(--neon-orange) / 0.5)' :
                                'hsl(var(--primary) / 0.5)'
                  }`
                  : 'none'
              }}
              whileHover={{
                scale: isMobile ? 1.3 : 1.3,
                backgroundColor: section.color === 'primary' ? 'hsl(var(--primary) / 0.7)' :
                  section.color === 'secondary' ? 'hsl(var(--secondary) / 0.7)' :
                    section.color === 'accent' ? 'hsl(var(--accent) / 0.7)' :
                      section.color === 'neon-purple' ? 'hsl(var(--neon-purple) / 0.7)' :
                        section.color === 'neon-blue' ? 'hsl(var(--neon-blue) / 0.7)' :
                          section.color === 'neon-green' ? 'hsl(var(--neon-green) / 0.7)' :
                            section.color === 'neon-orange' ? 'hsl(var(--neon-orange) / 0.7)' :
                              'hsl(var(--primary) / 0.7)'
              }}
              whileTap={{ scale: 0.85 }}
              aria-label={`Go to ${section.title}`}
            >
              {/* Tooltip - Desktop Only */}
              {!isMobile && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="px-3 py-1 bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg text-xs font-rajdhani whitespace-nowrap">
                    {section.title}
                  </div>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Scroll Progress Indicator for Current Section - Repositioned */}
      <div className={`fixed ${isMobile ? 'right-1 top-20' : 'right-2 lg:right-3 top-24'} z-30`}>
        <div className={`${isMobile ? 'w-1 h-24' : 'w-1 lg:w-1.5 h-32 lg:h-36'} bg-background/20 backdrop-blur-xl border border-border/30 rounded-full overflow-hidden`}>
          <motion.div
            className="w-full bg-gradient-to-t from-primary via-secondary to-accent rounded-full"
            animate={{
              height: `${canNavigateNext ? 100 : ((sectionRefs.current[currentSection]?.scrollTop || 0) + (sectionRefs.current[currentSection]?.clientHeight || 0)) / (sectionRefs.current[currentSection]?.scrollHeight || 1) * 100}%`
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Scroll Status Text - Desktop Only */}
        {!isMobile && (
          <div className="mt-1 text-center">
            <div className={`text-xs font-rajdhani ${canNavigateNext ? 'text-primary' : 'text-muted-foreground'}`}>
              {canNavigateNext ? 'Ready' : 'Scroll'}
            </div>
          </div>
        )}
      </div>



      {/* Social Links - Only on Hero Section */}
      {currentSection === 0 && (
        <div className="fixed left-2 sm:left-4 lg:left-6 bottom-4 sm:bottom-6 lg:bottom-8 z-30">
          <div className={`${isMobile
            ? 'flex flex-col gap-1.5 p-1.5'
            : 'flex flex-col gap-2 sm:gap-3 p-2 sm:p-3'
            } rounded-xl bg-background/20 backdrop-blur-xl border border-border/30`}>
            <motion.a
              href="https://github.com/aghoribrahman"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isMobile
                ? 'p-1 rounded-lg'
                : 'p-1.5 sm:p-2 rounded-lg'
                } text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={isMobile ? 14 : 16} className={isMobile ? '' : 'sm:w-5 sm:h-5'} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/mohit--trivedi/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isMobile
                ? 'p-1 rounded-lg'
                : 'p-1.5 sm:p-2 rounded-lg'
                } text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={isMobile ? 14 : 16} className={isMobile ? '' : 'sm:w-5 sm:h-5'} />
            </motion.a>
            <motion.a
              href="https://x.com/Mohit4033"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isMobile
                ? 'p-1 rounded-lg'
                : 'p-1.5 sm:p-2 rounded-lg'
                } text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter size={isMobile ? 14 : 16} className={isMobile ? '' : 'sm:w-5 sm:h-5'} />
            </motion.a>
            <motion.a
              href="mailto:mohit.4033@gmail.com"
              className={`${isMobile
                ? 'p-1 rounded-lg'
                : 'p-1.5 sm:p-2 rounded-lg'
                } text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={isMobile ? 14 : 16} className={isMobile ? '' : 'sm:w-5 sm:h-5'} />
            </motion.a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollPortfolio;