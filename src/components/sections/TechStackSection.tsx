import React from 'react';
import { motion } from 'framer-motion';

const TechStackSection = () => {
  const techCategories = [
    {
      title: 'Frontend',
      color: 'emerald',
      gradient: 'linear-gradient(to right, #10b981, #34d399)',
      technologies: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 90 }
      ]
    },
    {
      title: 'Backend',
      color: 'green',
      gradient: 'linear-gradient(to right, #22c55e, #4ade80)',
      technologies: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'Django', level: 80 },
        { name: 'PostgreSQL', level: 85 }
      ]
    },
    {
      title: 'Tools & Cloud',
      color: 'lime',
      gradient: 'linear-gradient(to right, #84cc16, #a3e635)',
      technologies: [
        { name: 'AWS', level: 80 },
        { name: 'Docker', level: 75 },
        { name: 'Git', level: 95 },
        { name: 'Figma', level: 85 }
      ]
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 pb-40 md:pb-12 bg-gradient-to-br from-background via-primary/5 to-background overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-orbitron font-bold mb-3 sm:mb-4">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl px-4 sm:px-0">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="card-futuristic space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-orbitron font-semibold mb-2">
                  {category.title}
                </h3>
                <div
                  className="w-12 sm:w-16 h-1 mx-auto rounded-full"
                  style={{ background: category.gradient }}
                />
              </div>

              <div className="space-y-3 sm:space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: categoryIndex * 0.2 + techIndex * 0.1
                    }}
                    whileHover={{ x: 10 }}
                    className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all duration-300"
                  >
                    <span className="font-rajdhani font-medium text-sm sm:text-base">{tech.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 sm:w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: category.gradient }}
                          initial={{ width: 0 }}
                          animate={{ width: `${tech.level}%` }}
                          transition={{
                            duration: 1.5,
                            delay: categoryIndex * 0.2 + techIndex * 0.1 + 0.5
                          }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground w-6 sm:w-8">
                        {tech.level}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Tech Icons - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            Always learning and exploring new technologies
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 lg:gap-6 flex-wrap max-w-4xl mx-auto">
            {['WebSockets', 'GraphQL', 'Redis', 'Kubernetes', 'AI/ML'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-muted/20 rounded-full text-xs sm:text-sm font-rajdhani border border-border/50"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'hsl(var(--primary) / 0.2)',
                  borderColor: 'hsl(var(--primary))'
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.01, 1]
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.2,
                  repeat: Infinity
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Software Engineering Themed Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Import Statements - Constrained */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`import-${i}`}
              className="absolute font-mono text-xs text-primary/20 hidden lg:block"
              animate={{
                x: [0, 80, 0],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
              style={{
                left: i < 2 ? `${10 + i * 20}%` : `${70 + (i - 2) * 15}%`,
                top: `${15 + i * 20}%`
              }}
            >
              {i % 3 === 0 ? 'import React' :
                i % 3 === 1 ? 'import { useState }' :
                  'import axios'}
            </motion.div>
          ))}

          {/* Floating Package.json Dependencies - Reduced */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`package-${i}`}
              className="absolute font-mono text-xs text-secondary/25 bg-background/5 px-1.5 py-0.5 rounded border border-border/20 hidden md:block"
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 3
              }}
              style={{
                left: `${75 + i * 15}%`,
                top: `${35 + i * 30}%`
              }}
            >
              {i % 2 === 0 ? '"react": "^18"' : '"typescript": "^5"'}
            </motion.div>
          ))}

          {/* Floating Console Logs - Simplified */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`console-${i}`}
              className="absolute font-mono text-xs text-accent/20 hidden lg:block"
              animate={{
                x: [0, 60, 0],
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5
              }}
              style={{
                left: `${20 + i * 25}%`,
                top: `${65 + i * 8}%`
              }}
            >
              {i % 3 === 0 ? 'console.log()' :
                i % 3 === 1 ? 'console.error()' :
                  'console.info()'}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;