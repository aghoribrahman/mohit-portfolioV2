import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const ProjectsSection = () => {
    const projects = [
        {
            title: 'AyrexandFields Property Listing',
            description: 'Premium property listing website connecting buyers with luxury real estate opportunities.',
            image: '/project/aurex.webp',
            technologies: ['React', 'Next.js', 'Tailwind CSS', 'PostgreSQL'],
            github: '#',
            live: 'https://aurexfield.com/',
            color: 'primary'
        },
        {
            title: 'Bhoomi Tour and Travels',
            description: 'Efficient cab booking service platform offering seamless travel experiences and tour packages.',
            image: '/project/bhoomi.webp',
            technologies: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
            github: '#',
            live: 'https://bhoomitourandtravels.com/',
            color: 'secondary'
        },
        {
            title: 'Cubikpulse Digital Marketing',
            description: 'Dynamic website for a digital marketing agency showcasing services, portfolio, and client success stories.',
            image: '/project/cubikpulse.webp',
            technologies: ['React', 'Framer Motion', 'Tailwind', 'SEO'],
            github: '#',
            live: 'http://cubikpulse.com/',
            color: 'accent'
        },
        {
            title: 'BrickBix Real Estate Platform',
            description: 'Real estate platform, Specifically designed for real estate professionals',
            image: '/project/brickbix.webp',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'AI/ML'],
            github: '#',
            live: 'https://brickbix.in/',
            color: 'neon-purple'
        },
        {
            title: 'Medical Equipment Marketplace',
            description: 'B2B platform connecting healthcare providers with medical equipment suppliers globally.',
            image: '/project/carentmedico.webp',
            technologies: ['Next.js', 'TypeScript', 'Stripe', 'AWS'],
            github: '#',
            live: 'https://carentmedico.com/',
            color: 'neon-blue'
        }
    ];

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-background via-secondary/5 to-background overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8 sm:mb-12 gpu-accelerated"
                >
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-orbitron font-bold mb-3 sm:mb-4">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
                        Showcasing innovative solutions that solve real-world problems
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ y: 100, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative gpu-accelerated"
                        >
                            <div className="card-futuristic h-full flex flex-col overflow-hidden">
                                {/* Project Image - Mobile Responsive */}
                                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                                    <div className="absolute inset-0 bg-mesh opacity-30" />
                                    {project.image && project.image !== '/api/placeholder/600/400' ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-4xl sm:text-5xl lg:text-6xl font-orbitron font-bold text-foreground/20">
                                                {project.title.split(' ')[0]}
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 sm:p-2 bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Github size={14} className="sm:w-4 sm:h-4" />
                                        </motion.a>
                                        <motion.a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 sm:p-2 bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                                        </motion.a>
                                    </div>
                                </div>

                                {/* Project Content - Mobile Responsive */}
                                <div className="flex-1 p-4 sm:p-6 flex flex-col">
                                    <h3 className="text-lg sm:text-xl font-orbitron font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 flex-1 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Technologies - Mobile Responsive */}
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 sm:px-3 py-1 text-xs bg-muted/30 rounded-full font-rajdhani"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA Button - Mobile Responsive */}
                                    <motion.button
                                        className="w-full group/btn relative z-10 border border-primary/50 hover:bg-primary/10 text-sm sm:text-base py-2 sm:py-3 cursor-pointer bg-transparent rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-foreground hover:text-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (project.live && project.live !== '#') {
                                                window.open(project.live, '_blank', 'noopener,noreferrer');
                                            }
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                    >
                                        View Project
                                        <ChevronRight
                                            size={14}
                                            className="group-hover/btn:translate-x-1 transition-transform sm:w-4 sm:h-4"
                                        />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Projects Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="text-center mt-8 mb-4 sm:mt-12"
                >
                    <motion.button
                        className="btn-hero mb-4 inline-flex items-center gap-2 px-2 py-2 font-orbitron font-medium text-foreground bg-transparent border-2 border-primary rounded-lg transition-all duration-300 overflow-hidden relative"
                        onClick={(e) => {
                            e.preventDefault();
                            window.open('https://github.com/aghoribrahman', '_blank', 'noopener,noreferrer');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Github className="mr-2" size={20} />
                        View All Projects on GitHub
                        <ExternalLink className="ml-2" size={20} />
                    </motion.button>
                </motion.div>

                {/* Software Engineering Themed Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating Git Commands */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`git-${i}`}
                            className="absolute font-mono text-xs text-primary/25 bg-background/5 px-2 py-1 rounded"
                            animate={{
                                x: [0, 100, 0],
                                opacity: [0.2, 0.6, 0.2]
                            }}
                            transition={{
                                duration: 12 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 2
                            }}
                            style={{
                                left: `${5 + i * 15}%`,
                                top: `${10 + i * 12}%`
                            }}
                        >
                            {i % 6 === 0 ? 'git commit -m "feat:"' :
                                i % 6 === 1 ? 'git push origin main' :
                                    i % 6 === 2 ? 'git merge feature' :
                                        i % 6 === 3 ? 'git pull --rebase' :
                                            i % 6 === 4 ? 'git checkout -b' :
                                                'git status'}
                        </motion.div>
                    ))}

                    {/* Floating Docker Commands */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={`docker-${i}`}
                            className="absolute font-mono text-xs text-secondary/30"
                            animate={{
                                y: [0, -50, 0],
                                opacity: [0.3, 0.7, 0.3]
                            }}
                            transition={{
                                duration: 15 + i * 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 3
                            }}
                            style={{
                                left: `${70 + i * 10}%`,
                                top: `${20 + i * 25}%`
                            }}
                        >
                            {i % 3 === 0 ? 'docker build -t app .' :
                                i % 3 === 1 ? 'docker run -p 3000:3000' :
                                    'docker-compose up -d'}
                        </motion.div>
                    ))}

                    {/* Floating API Status Codes */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={`status-${i}`}
                            className="absolute font-mono text-xs text-accent/25 bg-background/5 px-2 py-1 rounded border border-border/20"
                            animate={{
                                x: [0, 80, 0],
                                y: [0, -30, 0],
                                opacity: [0.2, 0.5, 0.2]
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 1.5
                            }}
                            style={{
                                left: `${15 + i * 20}%`,
                                top: `${60 + i * 8}%`
                            }}
                        >
                            {i % 4 === 0 ? '200 OK' :
                                i % 4 === 1 ? '201 Created' :
                                    i % 4 === 2 ? '404 Not Found' :
                                        '500 Server Error'}
                        </motion.div>
                    ))}

                    {/* Floating Framework Logos */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={`framework-${i}`}
                            className="absolute text-neon-purple/20"
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 20 + i * 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 4
                            }}
                            style={{
                                left: `${80 + i * 5}%`,
                                top: `${40 + i * 15}%`
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;