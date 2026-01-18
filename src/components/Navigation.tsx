import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  sections: Array<{ id: string; title: string; component: React.ComponentType }>;
  currentSection: number;
  onNavigate: (index: number) => void;
  isMobile?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ sections, currentSection, onNavigate, isMobile }) => {
  // Hide navigation on mobile screens
  if (isMobile) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-center justify-center">
        {/* Floating Navigation Container - Compact */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-xl bg-background/10 border border-border/20 shadow-lg max-w-[90vw]">
          {/* Enhanced Logo - Floating */}
          <motion.div
            className="relative group flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-base sm:text-lg lg:text-xl font-orbitron font-black text-gradient relative z-10">
              MT
            </div>
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Floating Navigation Links - Desktop Only */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1 overflow-hidden">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => onNavigate(index)}
                className={`relative px-1.5 lg:px-2 xl:px-3 py-1 lg:py-1.5 font-rajdhani font-medium hover:font-bold rounded-full transition-all duration-300 text-xs whitespace-nowrap ${currentSection === index
                  ? 'text-primary bg-primary/20 shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/20'
                  }`}
              >
                {section.title}
                {currentSection === index && (
                  <motion.div
                    layoutId="activeFloatingTab"
                    className="absolute inset-0 bg-primary/20 rounded-full border border-primary/40"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Current Section Indicator - Mobile - Compact */}
          <div className="md:hidden flex items-center gap-1 sm:gap-1.5 flex-1 min-w-0">
            <span className="text-xs font-rajdhani font-medium text-foreground truncate">
              {sections[currentSection]?.title}
            </span>
            <div className="flex gap-0.5 flex-shrink-0">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${currentSection === index ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;