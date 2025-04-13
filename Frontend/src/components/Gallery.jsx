import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import product1 from '../assets/images/product1.jpg';
import blackSaree from '../assets/images/blacksaree.jpg';
import blueShirt from '../assets/images/blueshirt.jpg';

const galleryItems = [
  {
    id: 1,
    image: product1,
    title: "Kids",
    description: "Adorable outfits for your little ones",
    cta: "View Collection",
    link: "/products?category=kids"
  },
  {
    id: 2,
    image: blackSaree,
    title: "Ethnic Wear",
    description: "Traditional elegance redefined",
    cta: "Explore Styles",
    link: "/products?category=ethnic"
  },
  {
    id: 3,
    image: blueShirt,
    title: "Formal Wear",
    description: "Sharp looks for professional settings",
    cta: "Browse Options",
    link: "/products?category=shirt"
  }
];

const Gallery = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Collections</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated fashion categories designed for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={item.link} className="block h-full">
                <div className="aspect-w-4 aspect-h-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-200 mb-4">{item.description}</p>
                    <span className="inline-flex items-center text-white font-medium hover:text-[#e96989] transition-colors duration-300">
                      {item.cta}
                      <FiArrowRight className="ml-2" />
                    </span>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold text-white text-shadow-lg">{item.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#e96989] hover:bg-[#d05878] transition-colors duration-300"
          >
            View All Collections
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;