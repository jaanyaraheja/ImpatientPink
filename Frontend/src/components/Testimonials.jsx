import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    quote: "This Mom Duo always gives life to the vibe in my mind. Their attention to detail is unmatched!",
    author: "Riya Sharma",
    role: "Fashion Blogger",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/43.jpg"
  },
  {
    id: 2,
    quote: "Can't find this level of personalisation anywhere else. They brought my dream outfit to life exactly how I envisioned it!",
    author: "Saloni Patel",
    role: "Corporate Executive",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 3,
    quote: "Impatient Pink always keeps me on trend! I get compliments every time I wear their pieces.",
    author: "Priya Malhotra",
    role: "Event Planner",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fafafa]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-[#e96989] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex mb-4 text-[#e96989]">
                <FaQuoteLeft className="text-2xl opacity-70" />
              </div>
              <p className="text-lg text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`text-lg ${i < testimonial.rating ? 'text-[#FFD700]' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
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
            Shop Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;