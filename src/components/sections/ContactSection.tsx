import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      const response = await fetch('https://formbold.com/s/3dpnb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState({ isSubmitting: false, isSubmitted: true, error: null });
        // Reset form data
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormState(prev => ({ ...prev, isSubmitted: false }));
        }, 5000);
      } else {
        throw new Error('Failed to send message. Please try again.');
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error: error instanceof Error ? error.message : 'An error occurred. Please try again.'
      });

      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, error: null }));
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mohit@example.com',
      link: 'mailto:mohit@example.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9630319444',
      link: 'tel:+919630319444'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Indore, India',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: Github, link: 'https://github.com/aghoribrahman', label: 'GitHub' },
    { icon: Linkedin, link: 'https://www.linkedin.com/in/mohit--trivedi/', label: 'LinkedIn' },
    { icon: Twitter, link: 'https://x.com/Mohit4033', label: 'Twitter' }
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
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Ready to build something amazing together? Let's discuss your next project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-orbitron font-semibold mb-4 sm:mb-6">
                Get in Touch
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects,
                or just having a conversation about technology and product development.
              </p>
            </div>

            {/* Contact Details - Mobile Responsive */}
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.link}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all duration-300 group"
                >
                  <div className="p-2 sm:p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <info.icon size={20} className="sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-rajdhani font-medium text-foreground text-sm sm:text-base">
                      {info.label}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links - Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-6 sm:pt-8"
            >
              <h4 className="font-orbitron font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Follow Me</h4>
              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-full bg-muted/20 hover:bg-primary/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <social.icon
                      size={18}
                      className="sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Mobile Responsive */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card-futuristic relative z-20"
          >
            <h3 className="text-xl sm:text-2xl font-orbitron font-semibold mb-4 sm:mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-rajdhani font-medium mb-2">
                    Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-muted/20 border-border/50 focus:border-primary relative z-10"
                    style={{ pointerEvents: 'auto' }}
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-rajdhani font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-muted/20 border-border/50 focus:border-primary relative z-10"
                    style={{ pointerEvents: 'auto' }}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-rajdhani font-medium mb-2">
                  Subject *
                </label>
                <Input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-muted/20 border-border/50 focus:border-primary relative z-10"
                  style={{ pointerEvents: 'auto' }}
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <label className="block text-sm font-rajdhani font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-muted/20 border-border/50 focus:border-primary resize-none relative z-10"
                  style={{ pointerEvents: 'auto' }}
                />
              </motion.div>

              {/* Form Status Messages */}
              {formState.isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-accent/20 border border-accent/40 rounded-lg text-center"
                >
                  <p className="text-accent font-rajdhani font-medium">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {formState.error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-destructive/20 border border-destructive/40 rounded-lg text-center"
                >
                  <p className="text-destructive font-rajdhani font-medium">
                    ❌ {formState.error}
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className={`btn-hero w-full group ${formState.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {formState.isSubmitting ? (
                    <>
                      <motion.div
                        className="mr-2 w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50"
        >
          <p className="text-muted-foreground mb-4">
            Prefer a quick chat? Schedule a call instead.
          </p>
          <Button
            variant="outline"
            className="border-primary/50 hover:bg-primary/10"
            onClick={() => {
              window.location.href = 'mailto:mohit.4033@gmail.com?subject=Schedule a Call&body=Hi Mohit,%0D%0A%0D%0AI would like to schedule a call to discuss...';
            }}
          >
            Schedule a Call
          </Button>
        </motion.div>

        {/* Software Engineering Themed Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Contact Methods - Constrained */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`contact-${i}`}
              className="absolute font-mono text-xs text-primary/20 bg-background/5 px-1.5 py-0.5 rounded hidden lg:block"
              animate={{
                x: [0, 60, 0],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
              style={{
                left: i < 2 ? `${10 + i * 20}%` : `${75 + (i - 2) * 10}%`,
                top: `${15 + i * 25}%`
              }}
            >
              {i % 3 === 0 ? 'email.send()' :
                i % 3 === 1 ? 'phone.call()' :
                  'linkedin.connect()'}
            </motion.div>
          ))}

          {/* Floating Communication Protocols - Reduced */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`protocol-${i}`}
              className="absolute font-mono text-xs text-secondary/25 hidden md:block"
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 10 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2.5
              }}
              style={{
                left: `${75 + i * 15}%`,
                top: `${25 + i * 30}%`
              }}
            >
              {i % 2 === 0 ? 'HTTP/2.0' : 'WebSocket'}
            </motion.div>
          ))}

          {/* Floating Response Codes - Simplified */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`response-${i}`}
              className="absolute font-mono text-xs text-accent/20 hidden lg:block"
              animate={{
                x: [0, 50, 0],
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 14 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5
              }}
              style={{
                left: `${15 + i * 25}%`,
                top: `${60 + i * 12}%`
              }}
            >
              {i % 3 === 0 ? 'message.sent = true' :
                i % 3 === 1 ? 'response.time < 24h' :
                  'status: "available"'}
            </motion.div>
          ))}

          {/* Floating Network Icons */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`network-${i}`}
              className="absolute text-neon-blue/25"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 16 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 5
              }}
              style={{
                left: `${80 + i * 6}%`,
                top: `${40 + i * 15}%`
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </motion.div>
          ))}

          {/* Floating API Endpoints */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`endpoint-${i}`}
              className="absolute font-mono text-xs text-neon-green/25 bg-background/5 px-2 py-1 rounded border border-border/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 9 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 3
              }}
              style={{
                left: `${15 + i * 30}%`,
                top: `${75 + i * 5}%`
              }}
            >
              {i % 3 === 0 ? 'POST /contact' :
                i % 3 === 1 ? 'GET /availability' :
                  'PUT /schedule'}
            </motion.div>
          ))}

          {/* Floating Social Media APIs */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`social-${i}`}
              className="absolute text-neon-purple/20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 18 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 6
              }}
              style={{
                left: `${85 + i * 8}%`,
                top: `${25 + i * 30}%`
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;