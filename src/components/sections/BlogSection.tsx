import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const BlogSection = () => {
  const blogPosts = [
    {
      title: 'Take control of your sprints with the DevDynamics',
      excerpt: "Managing agile sprints is more than just assigning tasks and checking off boxes. It's about strategic planning, real-time monitoring.",
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'SPRINT',
      link: 'https://devdynamics.ai/blog/take-control-of-your-sprints-with-the-devdynamics/',
      image: 'https://devdynamics.ai/blog/content/images/size/w2000/2024/08/Sprint-Dashboard.jpg'
    },
    {
      title: 'How engineering intelligence can make dev teams more effective',
      excerpt: 'Gartner has some interesting predictions for Software Engineering Intelligence (SEI) platforms. They foresee significant growth in the market over the next few years.',
      date: '2024-01-08',
      readTime: '12 min read',
      category: 'SEI',
      link: 'https://devdynamics.ai/blog/how-engineering-intelligence-can-make-dev-teams-more-effective/',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Top generative AI tools for developer productivity in 2024',
      excerpt: 'Generative AI models refer to systems capable of generating new content or data based on existing information.',
      date: '2024-12-22',
      readTime: '15 min read',
      category: 'Development',
      link: 'https://medium.com/@mohittrivedi/full-stack-development-typescript',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Tools every engineering manager should try',
      excerpt: 'Engineering managers, you definitely know how crucial it is to keep teams organized, productive, and focused on delivering top-notch projects.',
      date: '2024-12-15',
      readTime: '10 min read',
      category: 'UX/UI',
      link: 'https://medium.com/@mohittrivedi/ux-real-estate-tech',
      image: '/api/placeholder/400/250'
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 pb-40 md:pb-12 bg-gradient-to-br from-background via-primary/5 to-background overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-orbitron font-bold mb-3 sm:mb-4">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mb-4 sm:mb-6 px-4 sm:px-0">
            Sharing knowledge about product development, technology, and innovation
          </p>
          <motion.a
            href="https://devdynamics.ai/blog/author/mohit/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-glow text-sm sm:text-base transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <span className="font-rajdhani">Featured on DevDynamics Blog</span>
            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => {
                window.open('https://devdynamics.ai/blog/author/mohit/', '_blank', 'noopener,noreferrer');
              }}
            >
              <div className="card-futuristic h-full flex flex-col overflow-hidden">
                {/* Post Image - Mobile Responsive */}
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <div className="absolute inset-0 bg-mesh opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-orbitron font-bold text-foreground/20">
                      {post.category}
                    </div>
                  </div>

                  {/* Category Badge - Mobile Responsive */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className="px-2 sm:px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-rajdhani font-medium">
                      {post.category}
                    </span>
                  </div>

                  {/* External Link - Mobile Responsive */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                    <motion.a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                    </motion.a>
                  </div>
                </div>

                {/* Post Content - Mobile Responsive */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-orbitron font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 flex-1 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta Information - Mobile Responsive */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span className="text-xs sm:text-sm">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span className="text-xs sm:text-sm">{post.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Button - Mobile Responsive */}
                  {post.link && post.link !== '#' ? (
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Opening link:', post.link);
                        window.open(post.link, '_blank', 'noopener,noreferrer');
                      }}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-glow font-rajdhani font-medium transition-colors group/link text-sm sm:text-base cursor-pointer bg-transparent border-none p-0 outline-none"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                    >
                      Read Article
                      <ArrowRight
                        size={14}
                        className="sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform"
                      />
                    </motion.button>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-muted-foreground font-rajdhani font-medium text-sm sm:text-base">
                      Coming Soon
                      <ArrowRight
                        size={14}
                        className="sm:w-4 sm:h-4 opacity-50"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Posts CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mb-6"
        >
          <Button
            className="btn-hero"
            onClick={() => window.open('https://devdynamics.ai/blog/author/mohit/', '_blank', 'noopener,noreferrer')}
          >
            Visit DevDynamics Blog
            <ExternalLink className="ml-2" size={20} />
          </Button>
        </motion.div>

        {/* Software Engineering Themed Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Blog Topics */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`topic-${i}`}
              className="absolute font-mono text-xs text-primary/25 bg-background/5 px-2 py-1 rounded"
              animate={{
                x: [0, 110, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 13 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
              style={{
                left: `${5 + i * 15}%`,
                top: `${10 + i * 12}%`
              }}
            >
              {i % 6 === 0 ? '#ReactJS' :
                i % 6 === 1 ? '#ProductManagement' :
                  i % 6 === 2 ? '#TypeScript' :
                    i % 6 === 3 ? '#WebDevelopment' :
                      i % 6 === 4 ? '#TechLeadership' :
                        '#SoftwareArchitecture'}
            </motion.div>
          ))}

          {/* Floating Code Snippets */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`snippet-${i}`}
              className="absolute font-mono text-xs text-secondary/30"
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 11 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2.5
              }}
              style={{
                left: `${70 + i * 8}%`,
                top: `${20 + i * 20}%`
              }}
            >
              {i % 4 === 0 ? 'const blog = () => {' :
                i % 4 === 1 ? 'return <Article />' :
                  i % 4 === 2 ? 'useEffect(() => {' :
                    'export default Blog'}
            </motion.div>
          ))}

          {/* Floating Markdown Syntax */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`markdown-${i}`}
              className="absolute font-mono text-xs text-accent/25"
              animate={{
                x: [0, 90, 0],
                y: [0, -35, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 14 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.8
              }}
              style={{
                left: `${15 + i * 16}%`,
                top: `${55 + i * 8}%`
              }}
            >
              {i % 5 === 0 ? '# Heading' :
                i % 5 === 1 ? '**Bold Text**' :
                  i % 5 === 2 ? '`code block`' :
                    i % 5 === 3 ? '[Link](url)' :
                      '> Blockquote'}
            </motion.div>
          ))}

          {/* Floating Reading Stats */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`stats-${i}`}
              className="absolute font-mono text-xs text-neon-green/25 bg-background/5 px-2 py-1 rounded border border-border/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 3
              }}
              style={{
                left: `${80 + i * 5}%`,
                top: `${35 + i * 20}%`
              }}
            >
              {i % 3 === 0 ? '10K+ views' :
                i % 3 === 1 ? '500+ shares' :
                  '50+ comments'}
            </motion.div>
          ))}

          {/* Floating Tech Publication Icons */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`pub-${i}`}
              className="absolute text-neon-purple/20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 16 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 6
              }}
              style={{
                left: `${85 + i * 8}%`,
                top: `${60 + i * 15}%`
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;