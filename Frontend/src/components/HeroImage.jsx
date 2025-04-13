import React from 'react';
import heroImage from '../assets/images/heroposter.jpg';

const HeroImage = () => {
  return (
    <section id='home' className="mt-10 hero-image relative w-full h-[100vh] p-8 box-border bg-white overflow-hidden">
      <div className="container">
        <img src={heroImage} alt="Impatient Pink Cover" className="hero-img w-full h-full object-cover max-w-[99.9%]" />
      </div>
    </section>
  );
};

export default HeroImage;