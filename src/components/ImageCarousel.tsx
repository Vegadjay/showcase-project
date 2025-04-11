import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  // Auto play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [currentIndex, isAutoPlaying]);
  
  // Pause auto play when user interacts
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    // Resume after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative h-80 bg-gray-100 dark:bg-gray-800 group">
      {/* Main Image */}
      <motion.img 
        key={currentIndex}
        src={images[currentIndex]} 
        alt={`Project screenshot ${currentIndex + 1}`} 
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Navigation Arrows - Only show on hover */}
      <div className="absolute inset-y-0 left-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.button 
          className="ml-2 p-2 rounded-full bg-white/70 dark:bg-black/70 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-black"
          onClick={() => {
            handleUserInteraction();
            prevSlide();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.button 
          className="mr-2 p-2 rounded-full bg-white/70 dark:bg-black/70 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-black"
          onClick={() => {
            handleUserInteraction();
            nextSlide();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button 
            key={index}
            onClick={() => {
              handleUserInteraction();
              goToSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageCarousel;
