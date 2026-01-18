import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, Linkedin, Mail, Twitter, Home, User, Layers, Folder, Briefcase, FileText, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import HeroSection from './sections/HeroSection';
import Navigation from './Navigation';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import SmoothScroll from '@/components/SmoothScroll';

// Lazy load other sections
const AboutSection = React.lazy(() => import('./sections/AboutSection'));
const TechStackSection = React.lazy(() => import('./sections/TechStackSection'));
const ProjectsSection = React.lazy(() => import('./sections/ProjectsSection'));
const ExperienceSection = React.lazy(() => import('./sections/ExperienceSection'));
const BlogSection = React.lazy(() => import('./sections/BlogSection'));
const ContactSection = React.lazy(() => import('./sections/ContactSection'));

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center text-primary/50">
    <div className="animate-pulse">Loading...</div>
  </div>
);

const ScrollPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    { id: 'hero', component: HeroSection, title: 'Home', color: 'primary', icon: Home },
    { id: 'about', component: AboutSection, title: 'About', color: 'secondary', icon: User },
    { id: 'tech', component: TechStackSection, title: 'Stack', color: 'accent', icon: Layers },
    { id: 'projects', component: ProjectsSection, title: 'Projects', color: 'neon-purple', icon: Folder },
    { id: 'experience', component: ExperienceSection, title: 'Experience', color: 'neon-blue', icon: Briefcase },
    { id: 'blog', component: BlogSection, title: 'Blog', color: 'neon-green', icon: FileText },
    { id: 'contact', component: ContactSection, title: 'Contact', color: 'neon-orange', icon: Phone }
  ];

  const {
    currentSection,
    navigateToSection,
    isTransitioning,
    viewportWidth,
    isMobile,
    canNavigateNext,
    canNavigatePrev
  } = useSectionNavigation({ sectionsLength: sections.length, sectionRefs });

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

  const currentTitle = sections[currentSection].title;

  return (
    <>
      <Helmet>
        <title>Mohit | {currentTitle}</title>
        <meta name="description" content={`Mohit Trivedi - ${currentTitle} Section`} />
      </Helmet>

      <div className="relative w-full h-screen overflow-hidden bg-background" style={{ perspective: '1000px' }}>
        {/* Background Image with Overlay - Parallax Layer 0 (Furthest, 0.05x speed) */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/mohit.png')`,
          }}
          animate={{
            x: viewportWidth > 0 ? -currentSection * viewportWidth * 0.05 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 40,
            mass: 1
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/90" />
          <div className="absolute inset-0 bg-mesh opacity-20" />
        </motion.div>

        {/* Optimized Floating Elements - Parallax Layer 2 (Mid, 0.2x speed) */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          animate={{
            x: viewportWidth > 0 ? -currentSection * viewportWidth * 0.2 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 40,
            mass: 1
          }}
        >
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
        </motion.div>

        {/* Parallax Background Layer - Text (Layer 1, 0.5x speed) */}
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
          style={{ perspective: '1500px' }}
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
              const isActive = index === currentSection;
              const isPast = index < currentSection;

              return (
                <motion.div
                  key={section.id}
                  className="flex-shrink-0 w-screen h-full relative"
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    rotateY: isActive ? 0 : isPast ? 15 : -15,
                    z: isActive ? 0 : -100,
                    opacity: isActive ? 1 : 0.5,
                    filter: isActive ? 'blur(0px)' : 'blur(2px)'
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    mass: 1
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <SmoothScroll
                    ref={(el) => (sectionRefs.current[index] = el)}
                    className="scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
                  >
                    <Suspense fallback={<LoadingFallback />}>
                      <SectionComponent
                        onNavigateToProjects={section.id === 'hero' ? () => navigateToSection(3) : undefined}
                      />
                    </Suspense>
                  </SmoothScroll>

                  {/* Section Color Overlay */}
                  <div
                    className={`absolute inset-0 pointer-events-none opacity-5 bg-gradient-to-br from-${section.color} to-transparent`}
                  />
                </motion.div>
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

        {/* Improved Mobile Navigation - Bottom Bar (Floating & Compressed) */}
        {isMobile && (
          <div className="fixed bottom-8 left-4 right-4 z-50 p-1.5 bg-background/80 backdrop-blur-xl border border-border/30 rounded-2xl shadow-lg shadow-primary/5">
            <div className="flex justify-between items-center overflow-x-auto no-scrollbar gap-1 px-1">
              {sections.map((section, index) => {
                const Icon = section.icon;
                const isActive = currentSection === index;
                return (
                  <motion.button
                    key={index}
                    onClick={() => navigateToSection(index)}
                    className={`flex flex-col items-center justify-center min-w-[50px] py-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} className={`mb-0.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    <span className={`text-[9px] font-rajdhani font-medium whitespace-nowrap ${isActive ? 'text-primary' : ''}`}>
                      {section.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Desktop Navigation Dots - Hidden on Mobile */}
        {!isMobile && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex gap-3 p-3 rounded-2xl bg-background/20 backdrop-blur-xl border border-border/30">
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  onClick={() => navigateToSection(index)}
                  className="relative w-3 h-3 rounded-full transition-all duration-300 group"
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
                    scale: 1.3,
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
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-3 py-1 bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg text-xs font-rajdhani whitespace-nowrap">
                      {section.title}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Scroll Progress Indicator for Current Section - Repositioned (Already done, no change needed) */}
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



        {/* Social Links - Only on Hero Section - Adjusted for Mobile Nav */}
        {currentSection === 0 && (
          <div className={`fixed left-2 sm:left-4 lg:left-6 ${isMobile ? 'bottom-28' : 'bottom-4 sm:bottom-6 lg:bottom-8'} z-30`}>
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
    </>
  );
};

export default ScrollPortfolio;