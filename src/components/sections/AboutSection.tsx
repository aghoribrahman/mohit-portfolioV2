import React from 'react';
import { motion } from 'framer-motion';
import { User, Target, Lightbulb, Rocket } from 'lucide-react';

const AboutSection = () => {
  const skills = [
    { name: 'Product Management', level: 95, color: 'neon-green' },
    { name: 'Full-Stack Development', level: 90, color: 'green-400' },
    { name: 'UI/UX Design', level: 85, color: 'emerald-400' },
    { name: 'Team Leadership', level: 88, color: 'lime-400' }
  ];

  const achievements = [
    { icon: Target, title: 'Product Strategy', desc: 'Led product roadmaps for multiple SaaS platforms' },
    { icon: Lightbulb, title: 'Innovation', desc: 'Pioneered AI-driven solutions for real estate tech' },
    { icon: Rocket, title: 'Scale', desc: 'Onboarded 1000+ agents across multiple platforms' },
    { icon: User, title: 'Leadership', desc: 'Mentored 10+ developers and product managers' }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-background via-muted/10 to-background overflow-y-auto">
      <div className="absolute inset-0 bg-mesh opacity-20" />
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column - Text Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div>
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-orbitron font-bold mb-3 sm:mb-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              About <span className="text-gradient">Me</span>
            </motion.h2>
            <motion.p
              className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              I'm a passionate Product Manager and Full-Stack Developer with 4+ years of experience
              building innovative digital solutions. I thrive at the intersection of technology and
              user experience, creating products that solve real-world problems.
            </motion.p>
          </div>

          <motion.div
            className="space-y-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl font-orbitron font-semibold">Skills & Expertise</h3>
            <div className="space-y-3 sm:space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                  className="space-y-2 sm:space-y-3 p-3 sm:p-4 rounded-xl bg-background/30 backdrop-blur-sm border border-border/30"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-rajdhani font-semibold text-base sm:text-lg">{skill.name}</span>
                    <span className={`text-${skill.color} font-bold text-base sm:text-lg`}>{skill.level}%</span>
                  </div>
                  <div className="h-2 sm:h-3 bg-muted/50 rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-full relative"
                      style={{
                        background: skill.color === 'neon-green' ? 'linear-gradient(to right, #10b981, #34d399)' :
                          skill.color === 'green-400' ? 'linear-gradient(to right, #22c55e, #4ade80)' :
                            skill.color === 'emerald-400' ? 'linear-gradient(to right, #10b981, #34d399)' :
                              'linear-gradient(to right, #84cc16, #a3e635)'
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1.5, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Achievements Grid - Mobile Responsive */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.15 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="card-glass text-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 p-4 sm:p-6">
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div className="p-3 sm:p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <achievement.icon
                      size={24}
                      className="sm:w-8 sm:h-8 text-primary group-hover:text-primary-glow transition-colors duration-300"
                    />
                  </div>
                </div>
                <h4 className="font-orbitron font-bold text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                  {achievement.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {achievement.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Software Engineering Themed Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Code Comments - Constrained */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`comment-${i}`}
            className="absolute font-mono text-xs text-primary/15 hidden lg:block"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
            style={{
              left: i < 2 ? `${15 + i * 15}%` : `${70 + (i - 2) * 15}%`,
              top: `${25 + i * 20}%`
            }}
          >
            {i % 3 === 0 ? '// TODO' : i % 3 === 1 ? '/* Clean */' : '// Fixed'}
          </motion.div>
        ))}

        {/* Floating Variable Declarations - Reduced */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`var-${i}`}
            className="absolute font-mono text-xs text-secondary/20 bg-background/5 px-1.5 py-0.5 rounded hidden md:block"
            animate={{
              x: [0, 60, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
            style={{
              left: `${65 + i * 20}%`,
              top: `${35 + i * 25}%`
            }}
          >
            {i % 2 === 0 ? 'let skills = []' : 'const exp = 4'}
          </motion.div>
        ))}

        {/* Floating Class Definitions - Simplified */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`class-${i}`}
            className="absolute font-mono text-xs text-accent/25 hidden lg:block"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3
            }}
            style={{
              left: `${25 + i * 40}%`,
              top: `${65 + i * 10}%`
            }}
          >
            {i % 2 === 0 ? 'class Dev {' : 'interface {}'}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;