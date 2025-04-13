import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSection = () => {

  const whatsappLink = import.meta.env.VITE_WHATSAPP_URI;

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-gradient-to-r from-[#e96989]/30 to-[#e96989]/10 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center brightness-75"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Elevate Your Style with <span className="text-[#e96989]">Impatient Pink</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Custom fashion designs that reflect your unique personality. Let's create something extraordinary together.
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#e96989] text-white text-lg md:text-xl font-semibold rounded-lg shadow-lg hover:bg-[#d05878] transition-colors duration-300"
          >
            <FaWhatsapp className="text-2xl" />
            Chat on WhatsApp
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            ></motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-[#e96989]/20 blur-xl"></div>
      <div className="absolute bottom-40 right-32 w-24 h-24 rounded-full bg-[#e96989]/15 blur-xl"></div>
    </section>
  );
};

export default HeroSection;