import { motion } from 'framer-motion';
import { Download, ArrowRight, Code, Zap } from 'lucide-react';

import TextBlockAnimation from '@/components/ui/text-block-animation';

interface HeroSectionProps {
  onNavigateToProjects?: () => void;
}

const HeroSection = ({ onNavigateToProjects }: HeroSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/60" />
      </div>

      {/* Enhanced Software Engineering Themed Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Floating Code Symbols - Positioned to avoid center content */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute font-mono text-lg ${i % 3 === 0 ? 'text-primary/20' :
              i % 3 === 1 ? 'text-secondary/20' :
                'text-accent/20'
              }`}
            animate={{
              x: [0, 80 + i * 10, 0],
              y: [0, -60 - i * 8, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
            style={{
              left: i < 3 ? `${5 + i * 8}%` : `${75 + (i - 3) * 8}%`,
              top: `${10 + i * 15}%`,
              filter: `blur(${i % 2 === 0 ? '1px' : '0px'})`
            }}
          >
            {i % 6 === 0 ? '<>' : i % 6 === 1 ? '{}' : i % 6 === 2 ? '[]' : i % 6 === 3 ? '/>' : i % 6 === 4 ? '=>' : '()'}
          </motion.div>
        ))}

        {/* Floating Binary Streams */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute font-mono text-xs text-neon-green/20"
            animate={{
              y: [100, -100],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: '100%'
            }}
          >
            {Array.from({ length: 8 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
          </motion.div>
        ))}

        {/* Floating Terminal Cursors - Positioned at edges */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`cursor-${i}`}
            className="absolute w-2 h-4 bg-accent/30"
            animate={{
              opacity: [0, 1, 0],
              scaleY: [1, 1.2, 1]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
            style={{
              left: i < 2 ? `${5 + i * 10}%` : `${85 + (i - 2) * 8}%`,
              top: `${20 + i * 20}%`
            }}
          />
        ))}

        {/* Floating Git Branch Visualization */}
        {[...Array(3)].map((_, i) => (
          <motion.svg
            key={`git-${i}`}
            className="absolute text-neon-blue/25"
            width="80"
            height="50"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              rotate: [0, 45, 0]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
            style={{
              left: `${15 + i * 30}%`,
              top: `${50 + i * 15}%`
            }}
          >
            <path
              d="M10 25 Q40 15 70 25 Q40 35 10 25"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <circle cx="10" cy="25" r="4" fill="currentColor" />
            <circle cx="70" cy="25" r="4" fill="currentColor" />
            <circle cx="40" cy="15" r="2" fill="currentColor" opacity="0.7" />
          </motion.svg>
        ))}

        {/* Floating Function Declarations - Positioned at corners */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`func-${i}`}
            className="absolute font-mono text-xs text-purple-400/20 hidden md:block"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [0.8, 1.0, 0.8],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 10 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2
            }}
            style={{
              left: i === 0 ? '5%' : i === 1 ? '85%' : '90%',
              top: `${5 + i * 30}%`
            }}
          >
            {i % 3 === 0 ? 'const fn = () =>' : i % 3 === 1 ? 'function()' : 'async/await'}
          </motion.div>
        ))}

        {/* Floating API Endpoints - Bottom corners only */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`api-${i}`}
            className="absolute font-mono text-xs text-secondary/20 bg-background/5 px-2 py-1 rounded hidden lg:block"
            animate={{
              x: [0, 60, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2.5
            }}
            style={{
              left: i === 0 ? '5%' : '80%',
              top: '85%'
            }}
          >
            {i === 0 ? 'GET /api/users' : 'POST /api/data'}
          </motion.div>
        ))}

        {/* Floating Database Icons */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`db-${i}`}
            className="absolute text-accent/30"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 4
            }}
            style={{
              left: `${80 + i * 10}%`,
              top: `${60 + i * 15}%`
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
              <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main Content - Restructured to match image layout - Compact */}
      <div className="relative z-20 flex flex-col justify-center min-h-screen px-4 sm:px-6 py-4 sm:py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6 lg:space-y-8"
        >
          {/* Greeting - Top positioned */}
          <div className="flex items-center justify-center">
            <TextBlockAnimation animateOnScroll={false} delay={0.1} blockColor="#f59e0b" duration={0.6}>
              <div className="flex items-center gap-2">
                <Zap className="text-accent" size={16} />
                <span className="text-accent font-rajdhani font-medium text-sm">Hey there, I'm</span>
              </div>
            </TextBlockAnimation>
          </div>

          {/* Large Name Title - Center positioned - Reduced Size */}
          <div className="flex justify-center">
            <TextBlockAnimation animateOnScroll={false} delay={0.3} blockColor="#6366f1" duration={0.8}>
              <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-orbitron font-black relative leading-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent relative z-10 px-1">MOHIT TRIVEDI</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent opacity-10 blur-2xl">
                  MOHIT TRIVEDI
                </div>
              </h1>
            </TextBlockAnimation>
          </div>

          {/* Subtitle - Reduced Size */}
          <div className="flex justify-center">
            <TextBlockAnimation animateOnScroll={false} delay={0.6} blockColor="#10b981" duration={0.8}>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-rajdhani font-medium text-muted-foreground">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Product Leader & Full-Stack Developer
                </span>
              </h2>
            </TextBlockAnimation>
          </div>

          {/* Tagline - Reduced Size */}
          <div className="flex justify-center">
            <TextBlockAnimation animateOnScroll={false} delay={0.9} blockColor="#ec4899" duration={0.8}>
              <p className="text-sm sm:text-base md:text-lg font-rajdhani">
                <span className="text-muted-foreground">Building Products with </span>
                <span className="text-accent font-semibold">Purpose </span>
                <span className="text-muted-foreground">and </span>
                <span className="text-secondary font-semibold">Precision</span>
              </p>
            </TextBlockAnimation>
          </div>

          {/* Stats Row - Horizontal layout - Reduced Size */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center gap-6 sm:gap-8 lg:gap-12 flex-wrap"
          >
            {[
              { number: '4+', label: 'Years Experience', color: 'primary' },
              { number: '50+', label: 'Projects Shipped', color: 'secondary' },
              { number: '1K+', label: 'Agents Onboarded', color: 'accent' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className={`text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-orbitron font-black text-${stat.color} mb-1`}>
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-rajdhani font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Side by side - Compact */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <motion.button
              className="group relative px-4 py-2.5 font-orbitron font-semibold text-xs sm:text-sm bg-gradient-to-r from-primary via-secondary to-accent rounded-lg text-background overflow-hidden"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigateToProjects}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className="relative z-10 flex items-center justify-center gap-1.5">
                <Code size={12} />
                <span className="whitespace-nowrap">View My Work</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform w-3 h-3" />
              </div>
            </motion.button>

            <motion.a
              href="/Mohit Trivedi Product.pdf"
              download="Mohit_Trivedi_Resume.pdf"
              className="group px-4 py-2.5 font-rajdhani font-semibold text-xs sm:text-sm border-2 border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary rounded-lg backdrop-blur-sm bg-background/20 transition-all duration-300 inline-block text-center"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center gap-1.5">
                <Download size={12} />
                <span className="whitespace-nowrap">Download Resume</span>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Indicator - Middle Left Side */}
      <div className="absolute left-6 lg:left-8 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex flex-col items-center">
        <motion.div
          className="flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {/* Scroll Text - Smaller and more compact */}

          <motion.span
            className="text-[10px] lg:text-xs font-rajdhani font-medium text-muted-foreground/60 tracking-wider transform -rotate-90 whitespace-nowrap"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll horizontally
          </motion.span>

          {/* Tech Stack Tags - Bottom positioned - Compact */}
          {/* Tech Stack Tags - Responsive Layout */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Small screens: Below buttons layout */}
            <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap lg:hidden mt-4">
              {[
                { name: 'React', color: 'primary' },
                { name: 'Node.js', color: 'secondary' },
                { name: 'Python', color: 'accent' },
                { name: 'TypeScript', color: 'primary' },
                { name: 'AWS', color: 'secondary' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={`px-2.5 py-1 rounded-full border border-${tech.color}/30 bg-${tech.color}/10 backdrop-blur-sm`}
                  whileHover={{
                    scale: 1.05,
                    borderColor: `hsl(var(--${tech.color}))`,
                    backgroundColor: `hsl(var(--${tech.color}) / 0.2)`
                  }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    y: [0, -1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className={`text-xs font-rajdhani font-medium text-${tech.color}`}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Large screens: Distributed layout */}
            <div className="hidden lg:block">
              <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
                {/* Left side - First 2 tech tags */}
                <div className="flex flex-col gap-3">
                  {[
                    { name: 'React', color: 'primary' },
                    { name: 'Node.js', color: 'secondary' }
                  ].map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className={`px-3 py-1.5 rounded-full border border-${tech.color}/30 bg-${tech.color}/10 backdrop-blur-sm`}
                      whileHover={{
                        scale: 1.05,
                        borderColor: `hsl(var(--${tech.color}))`,
                        backgroundColor: `hsl(var(--${tech.color}) / 0.2)`
                      }}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        x: [0, -2, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className={`text-sm font-rajdhani font-medium text-${tech.color}`}>
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Center - Middle tech tag */}
                <div className="flex justify-center">
                  <motion.div
                    className="px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.05,
                      borderColor: `hsl(var(--accent))`,
                      backgroundColor: `hsl(var(--accent) / 0.2)`
                    }}
                    animate={{
                      opacity: [0.6, 1, 0.6],
                      y: [0, -2, 0]
                    }}
                    transition={{
                      duration: 3,
                      delay: 0.4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-sm font-rajdhani font-medium text-accent">
                      Python
                    </span>
                  </motion.div>
                </div>

                {/* Right side - Last 2 tech tags */}
                <div className="flex flex-col gap-3">
                  {[
                    { name: 'TypeScript', color: 'primary' },
                    { name: 'AWS', color: 'secondary' }
                  ].map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className={`px-3 py-1.5 rounded-full border border-${tech.color}/30 bg-${tech.color}/10 backdrop-blur-sm`}
                      whileHover={{
                        scale: 1.05,
                        borderColor: `hsl(var(--${tech.color}))`,
                        backgroundColor: `hsl(var(--${tech.color}) / 0.2)`
                      }}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        x: [0, 2, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: (index + 3) * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className={`text-sm font-rajdhani font-medium text-${tech.color}`}>
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animated Arrow - Smaller */}
          <motion.div
            className="flex items-center gap-0.5 mt-1"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-4 lg:w-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="w-0 h-0 border-l-2 lg:border-l-3 border-l-primary border-t-1 border-b-1 border-t-transparent border-b-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Scroll Dots Indicator - Smaller and more compact */}
          <div className="flex flex-col gap-1 mt-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 h-0.5 lg:w-1 lg:h-1 rounded-full bg-muted-foreground/30"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Decorative Elements - Repositioned to avoid overlap */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Large decorative circle - moved further from content */}
        <motion.div
          className="absolute bottom-10 right-5 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 border border-primary/15 rounded-full hidden md:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-2 left-1/2 w-2 h-2 bg-primary/50 rounded-full transform -translate-x-1/2" />
          <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-secondary/50 rounded-full transform -translate-x-1/2" />
        </motion.div>

        {/* Small decorative circle - repositioned */}
        <motion.div
          className="absolute top-10 left-5 w-24 h-24 sm:w-32 sm:h-32 border border-accent/20 rounded-full hidden md:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-1 left-1/2 w-1 h-1 bg-accent/50 rounded-full transform -translate-x-1/2" />
        </motion.div>

        {/* Medium decorative circle - repositioned */}
        <motion.div
          className="absolute top-1/3 right-2 w-16 h-16 sm:w-20 sm:h-20 border border-secondary/20 rounded-full hidden lg:block"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;