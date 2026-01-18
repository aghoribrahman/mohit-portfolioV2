import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Co-Founder',
      company: 'BrickBix',
      location: 'Indore, India',
      period: '2022 - Present',
      description: 'Led product strategy and development for real estate SaaS platform. Managed cross-functional teams and increased user engagement by 150%.',
      achievements: [
        'Launched distribution platform for real estate agents',
        'Implemented AI-based real estate recommendations',
        'Onboarded 300+ real estate agents',

      ],
      color: 'primary'
    },
    {
      title: 'Full-Stack Developer',
      company: 'MERN',
      location: 'Remote',
      period: '2020 - 2022',
      description: 'Developed custom web applications for various clients including healthcare, e-commerce, and fintech sectors.',
      achievements: [
        'Built 20+ production applications',
        'Maintained 99.9% uptime across all projects',
        'Established long-term client relationships'
      ],
      color: 'secondary'
    },
    {
      title: 'Technical Writer',
      company: 'DevDynamics',
      location: 'Remote',
      period: '2019 - 2021',
      description: 'Created technical documentation and developer guides for API platforms and developer tools.',
      achievements: [
        'Authored 10+ technical articles',
        'Improved developer onboarding by 80%',

      ],
      color: 'accent'
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-background via-accent/5 to-background overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-orbitron font-bold mb-3 sm:mb-4">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Building innovative products and leading teams across diverse industries
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line - Mobile Responsive */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="relative flex items-start gap-4 sm:gap-8 flex-row"
              >
                {/* Timeline Dot - Mobile Responsive */}
                <div className="absolute left-4 sm:left-8 transform -translate-x-1/2">
                  <motion.div
                    className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-${exp.color} border-2 sm:border-4 border-background shadow-lg`}
                    whileHover={{ scale: 1.2 }}
                    style={{ boxShadow: `0 0 20px hsl(var(--${exp.color}))` }}
                  />
                </div>

                {/* Content Card - Mobile Responsive */}
                <motion.div
                  className="flex-1 ml-8 sm:ml-16"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="card-futuristic">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-orbitron font-semibold mb-1">
                          {exp.title}
                        </h3>
                        <h4 className="text-base sm:text-lg lg:text-xl text-primary mb-2">{exp.company}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="sm:w-4 sm:h-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} className="sm:w-4 sm:h-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-2">
                      <h5 className="font-rajdhani font-semibold text-foreground text-sm sm:text-base">
                        Key Achievements:
                      </h5>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.3 + i * 0.1 + 0.5 }}
                            className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                          >
                            <ChevronRight size={14} className="sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-8 sm:mt-12"
        >
          <div className="card-futuristic inline-block">
            <h3 className="text-xl font-orbitron font-semibold mb-4">
              Want to know more about my experience?
            </h3>
            <motion.a
              href="/Mohit Trivedi Product.pdf"
              download="Mohit_Trivedi_Resume.pdf"
              className="btn-hero inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Full Resume
            </motion.a>
          </div>
        </motion.div>

        {/* Software Engineering Themed Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Career Milestones */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`milestone-${i}`}
              className="absolute font-mono text-xs text-primary/25 bg-background/5 px-2 py-1 rounded"
              animate={{
                x: [0, 120, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 14 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2.5
              }}
              style={{
                left: `${5 + i * 18}%`,
                top: `${8 + i * 15}%`
              }}
            >
              {i % 5 === 0 ? 'promoted to senior' :
                i % 5 === 1 ? 'led team of 10+' :
                  i % 5 === 2 ? 'shipped 50+ features' :
                    i % 5 === 3 ? 'mentored developers' :
                      'scaled to 1M+ users'}
            </motion.div>
          ))}

          {/* Floating Performance Metrics */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`metric-${i}`}
              className="absolute font-mono text-xs text-secondary/30"
              animate={{
                y: [0, -60, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 3
              }}
              style={{
                left: `${70 + i * 8}%`,
                top: `${25 + i * 20}%`
              }}
            >
              {i % 4 === 0 ? '99.9% uptime' :
                i % 4 === 1 ? '200% revenue ↑' :
                  i % 4 === 2 ? '150% engagement ↑' :
                    '80% faster onboarding'}
            </motion.div>
          ))}

          {/* Floating Tech Stack Evolution */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`evolution-${i}`}
              className="absolute font-mono text-xs text-accent/25"
              animate={{
                x: [0, 100, 0],
                y: [0, -40, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 16 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${55 + i * 8}%`
              }}
            >
              {i % 6 === 0 ? 'React → Next.js' :
                i % 6 === 1 ? 'JS → TypeScript' :
                  i % 6 === 2 ? 'REST → GraphQL' :
                    i % 6 === 3 ? 'SQL → NoSQL' :
                      i % 6 === 4 ? 'Monolith → Microservices' :
                        'On-premise → Cloud'}
            </motion.div>
          ))}

          {/* Floating Achievement Badges */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`badge-${i}`}
              className="absolute text-neon-blue/25"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 18 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 5
              }}
              style={{
                left: `${75 + i * 8}%`,
                top: `${45 + i * 15}%`
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;