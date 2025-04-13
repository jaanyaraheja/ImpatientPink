import React from 'react';
import heroImage from '../assets/images/heroposter.jpg';

const HeroImage = () => {
  return (
    <section id='home' className="relative w-full mt-16 md:mt-20 lg:mt-24 h-[60vh] md:h-[70vh] lg:h-[80vh] py-2 px-4 md:py-4 md:px-8 box-border bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      <div className="container mx-auto h-full flex items-center justify-center">
        <img 
          src={heroImage} 
          alt="Impatient Pink Cover" 
          className="w-full h-auto max-h-full object-contain rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroImage;