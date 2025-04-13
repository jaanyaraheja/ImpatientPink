import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-[#333] text-white py-8 text-center">
      <p>&copy; 2025 Impatient Pink. All rights reserved.</p>
      <p>
        <a href="#" className="text-white mx-2.5 no-underline transition-colors duration-300 hover:text-[#e96989]">Privacy Policy</a> | 
        <a href="#" className="text-white mx-2.5 no-underline transition-colors duration-300 hover:text-[#e96989]">Terms of Service</a> | 
        <a href="#" className="text-white mx-2.5 no-underline transition-colors duration-300 hover:text-[#e96989]">FAQ</a>
      </p>
    </footer>
  );
};

export default Footer;