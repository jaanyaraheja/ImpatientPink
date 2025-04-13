import React from 'react';
import { motion } from 'framer-motion';
import { FaRibbon, FaUserTie, FaHandsHelping } from 'react-icons/fa';
import logo from '../assets/images/logo.jpeg';
import founder from '../assets/images/founder.jpg';
import founder2 from '../assets/images/founder2.jpg';

const About = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const aboutSections = [
    {
      id: 1,
      title: "Our Brand Story",
      description: "Impatient Pink was born from a passion for unique, trend-setting fashion. Built for bold individuals, the brand redefines modern style with an artistic edge.",
      image: logo,
      icon: <FaRibbon className="text-4xl text-[#e96989] mb-4" />,
      reverse: false
    },
    {
      id: 2,
      title: "Meet the Founder: Shivani Gambhir",
      description: "A NIFT graduate with an eye for detail, Shivani Gambhir founded Impatient Pink to bring creative, fashion-forward designs to life. Her journey started from the vibrant world of fashion school to building a brand that speaks individuality.",
      image: founder,
      icon: <FaUserTie className="text-4xl text-[#e96989] mb-4" />,
      reverse: true
    },
    {
      id: 3,
      title: "Co-Founder: Suman Saluja",
      description: "Suman Saluja, Shivani's mother, built her fashion career from an at-home retail studio to managing the business operations of Impatient Pink. Her experience blends creativity with business strategy, making the brand flourish.",
      image: founder2,
      icon: <FaHandsHelping className="text-4xl text-[#e96989] mb-4" />,
      reverse: false
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Impatient Pink</h2>
          <div className="w-20 h-1 bg-[#e96989] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the passion and people behind our unique fashion brand
          </p>
        </motion.div>

        {aboutSections.map((section, index) => (
          <motion.div
            key={section.id}
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 mb-16 last:mb-0`}
          >
            <div className="lg:w-1/3">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#e96989]/10 to-[#e96989]/30 mix-blend-overlay"></div>
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="max-w-lg mx-auto lg:mx-0">
                {section.icon}
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{section.description}</p>
                
                {index === 0 && (
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="bg-[#fdf2f5] px-4 py-2 rounded-full">
                      <span className="text-[#e96989] font-medium">Trend-Setting</span>
                    </div>
                    <div className="bg-[#fdf2f5] px-4 py-2 rounded-full">
                      <span className="text-[#e96989] font-medium">Unique Designs</span>
                    </div>
                    <div className="bg-[#fdf2f5] px-4 py-2 rounded-full">
                      <span className="text-[#e96989] font-medium">Artistic Edge</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-[#fdf2f5] rounded-xl p-8 md:p-12 mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            To empower individuals to express their unique personalities through fashion that blends contemporary trends with timeless elegance, while maintaining sustainable and ethical practices.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;