import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dacdl9uqu/image/upload/v1744390435/rev1_qu0gav.jpg',
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dacdl9uqu/image/upload/v1744390435/rev2_qcbqkq.jpg',
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dacdl9uqu/image/upload/v1744390435/rev3_xpejif.jpg',
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dacdl9uqu/image/upload/v1744390435/rev4_nvglgz.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isAnimating]);

  return (
    <section id="reviews" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#e96989]">
          Customer Reviews
        </h2>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-10 transform hover:scale-110"
            aria-label="Previous review"
          >
            <FaChevronLeft className="text-[#e96989] text-2xl" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-10 transform hover:scale-110"
            aria-label="Next review"
          >
            <FaChevronRight className="text-[#e96989] text-2xl" />
          </button>

          {/* Reviews Slider */}
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full flex-shrink-0 flex justify-center items-center bg-white p-4"
                >
                  <div className="max-w-3xl w-full">
                    <img
                      src={review.image}
                      alt={`Customer Review ${review.id}`}
                      className="w-full h-auto object-contain max-h-[600px] mx-auto"
                      style={{ 
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`h-3 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'bg-[#e96989] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-3'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews; 