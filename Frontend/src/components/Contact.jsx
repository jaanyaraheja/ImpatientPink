import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const contactMethods = [
    {
      icon: <FaInstagram className="text-3xl" />,
      title: "Instagram",
      value: "@impatientpink",
      link: "https://www.instagram.com/impatientpink/",
      color: "bg-gradient-to-br from-pink-500 to-purple-600"
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email",
      value: "impatientpink@gmail.com",
      link: "mailto:impatientpink@gmail.com",
      color: "bg-[#e96989]"
    },
    {
      icon: <FaPhoneAlt className="text-3xl" />,
      title: "Phone",
      value: "+91 98184 05428",
      link: "tel:+919818405428",
      color: "bg-green-500"
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Studio",
      value: "Ardee City, Gurugram, India",
      link: "https://maps.app.goo.gl/HcWRDiPjUj3nwXTUA?g_st=com.google.maps.preview.copy",
      color: "bg-blue-500"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <div className="w-20 h-1 bg-[#e96989] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or want to discuss a custom design? Reach out through any of these channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <a
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`${method.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{method.title}</h3>
                <p className="text-lg text-center text-[#e96989] font-medium">{method.value}</p>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#fdf2f5] rounded-xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Send Us a Message</h3>
          <form className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e96989] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e96989] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e96989] focus:border-transparent"
                placeholder="Tell us about your design ideas..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto px-8 py-3 bg-[#e96989] text-white font-medium rounded-lg hover:bg-[#d05878] transition-colors duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;