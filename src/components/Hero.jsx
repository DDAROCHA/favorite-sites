import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <motion.h2 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        Hello! 👋 I'm Diego
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1 }}
      >
        Passionate about building <strong>modern applications</strong> with focus on 
        <strong> Artificial Intelligence</strong>, clean design, high performance and scalability.
      </motion.p>

      {/* Botón pulsando */}
      <motion.a 
        href="mailto:ddarocha@jdnservice.com" 
        className="cta-button"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Get in Touch
      </motion.a>
    </section>
  );
}

export default Hero;
