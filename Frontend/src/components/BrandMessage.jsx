import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaHeart, FaLeaf, FaTshirt } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaStar className="text-3xl text-[#e96989]" />,
    title: "Premium Quality",
    description: "We use only the finest fabrics and materials for long-lasting comfort and style."
  },
  {
    icon: <FaHeart className="text-3xl text-[#e96989]" />,
    title: "Unique Designs",
    description: "Stand out with our exclusive patterns you won't find anywhere else."
  },
  {
    icon: <FaLeaf className="text-3xl text-[#e96989]" />,
    title: "Sustainable Fashion",
    description: "Ethically sourced materials with minimal environmental impact."
  },
  {
    icon: <FaTshirt className="text-3xl text-[#e96989]" />,
    title: "Perfect Fit",
    description: "Flattering cuts designed for real bodies and all-day comfort."
  }
];

const BrandMessage = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#fdf2f5] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Impatient Pink?</h2>
          <div className="w-20 h-1 bg-[#e96989] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We create fashionable pieces that are perfect for every occasion. From casual wear to formal attire, our collection is designed to suit your unique style and personality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="/products"
            className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-[#e96989] hover:bg-[#d05878] transition-colors duration-300 shadow-lg"
          >
            Explore Our Collections
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandMessage;