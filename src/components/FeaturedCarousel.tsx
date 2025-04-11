import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, Star, Code, Calendar, Users } from "lucide-react";
import { Project } from "../lib/data";
import gsap from "gsap";

interface FeaturedCarouselProps {
  projects: Project[];
  onProjectClick: (projectId: number) => void;
}

const FeaturedCarousel = ({ projects, onProjectClick }: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const featuredProjects = projects?.length ? projects.slice(0, Math.min(projects.length, 5)) : [];
  const totalSlides = featuredProjects.length;

  // Handle case when no projects are available
  if (!totalSlides) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">No trending projects available</h2>
      </div>
    );
  }

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(index => (index === 0 ? totalSlides - 1 : index - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex(index => (index === totalSlides - 1 ? 0 : index + 1));
  };

  // Setup autoplay
  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    
    if (!isHovering && totalSlides > 1) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [currentIndex, isHovering, totalSlides]);

  // Initial animations with GSAP
  useEffect(() => {
    if (carouselRef.current) {
      const tl = gsap.timeline();
      
      tl.from(".carousel-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      tl.from(".carousel-container", {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4");
    }
  }, []);

  const rocketAnimation = {
    animate: {
      y: [-5, 0, -5],
      rotate: [0, 3, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
      scale: 0.95,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const techStackVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const techItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
      }
    },
  };

  return (
    <motion.section 
      className="py-12 sm:py-16 relative overflow-hidden"
      ref={carouselRef}
    >
      <div className="absolute inset-0 bg-dot-pattern bg-dot-md opacity-10 dark:opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 sm:mb-12">
          <motion.h2 
            className="carousel-title text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 dark:from-red-400 dark:to-red-600 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Trending Projects 
            <motion.span
              animate={rocketAnimation.animate}
              className="ml-3 inline-block text-4xl sm:text-5xl"
            >
              🚀
            </motion.span>
          </motion.h2>
          <motion.p 
            className="carousel-title mt-3 text-gray-600 dark:text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover trending projects from our innovative community
          </motion.p>
        </div>
        
        <motion.div 
          className="carousel-container relative overflow-hidden rounded-3xl shadow-2xl"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Navigation buttons */}
          {totalSlides > 1 && (
            <>
              <div className="absolute inset-y-0 left-0 z-10 flex items-center">
                <motion.button 
                  onClick={() => {
                    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
                    prevSlide();
                  }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition ml-4 sm:ml-6 text-gray-700 dark:text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                </motion.button>
              </div>
              
              <div className="absolute inset-y-0 right-0 z-10 flex items-center">
                <motion.button 
                  onClick={() => {
                    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
                    nextSlide();
                  }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition mr-4 sm:mr-6 text-gray-700 dark:text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                </motion.button>
              </div>
            </>
          )}
          
          {/* Carousel slides */}
          <div className="relative overflow-hidden h-[450px] sm:h-[550px] lg:h-[650px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <div className="flex flex-col md:flex-row w-full h-full">
                  {/* Main project card - Image and title */}
                  <div className="w-full md:w-2/3 h-full">
                    <motion.div 
                      className="relative h-full rounded-t-xl md:rounded-tr-none md:rounded-l-xl overflow-hidden shadow-2xl group"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Trending badge */}
                      <motion.div 
                        className="absolute top-4 right-4 z-10"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="inline-flex items-center rounded-full bg-red-500/80 backdrop-blur-sm px-3 py-1.5 text-xs sm:text-sm font-medium text-white shadow-lg">
                          <TrendingUp className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" /> Trending
                        </span>
                      </motion.div>
                      
                      {/* Project image */}
                      <div className="overflow-hidden h-full">
                        <motion.img 
                          src={featuredProjects[currentIndex].imageUrls[0]} 
                          alt={featuredProjects[currentIndex].title} 
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
                      
                      {/* Project info */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-white"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <motion.h3 
                          className="text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-2 mb-4"
                        >
                          {featuredProjects[currentIndex].title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-base sm:text-lg text-gray-200 line-clamp-3 mb-6"
                        >
                          {featuredProjects[currentIndex].shortDescription}
                        </motion.p>
                        
                        <motion.div className="flex items-center mt-6 sm:mt-8">
                          <div className="flex items-center">
                            <motion.img 
                              src={featuredProjects[currentIndex].owner.avatar} 
                              alt={featuredProjects[currentIndex].owner.name} 
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-md"
                            />
                            <span className="ml-3 text-base sm:text-lg font-medium">
                              {featuredProjects[currentIndex].owner.name}
                            </span>
                          </div>
                          
                          <div className="ml-auto flex items-center bg-white/10 backdrop-blur-sm py-1 px-2 sm:py-1.5 sm:px-3 rounded-full">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 mr-1" fill="#FBBF24" />
                            <span className="text-xs sm:text-sm font-medium">{featuredProjects[currentIndex].rating.toFixed(1)}</span>
                          </div>
                        </motion.div>
                        
                        <motion.button
                          onClick={() => onProjectClick(featuredProjects[currentIndex].id)}
                          className="mt-6 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg text-base sm:text-lg font-medium transition shadow-xl"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Explore Project
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Tech stack and project details */}
                  <div className="w-full md:w-1/3 h-1/2 md:h-full">
                    <motion.div 
                      className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm h-full p-6 sm:p-8 md:p-10 shadow-xl rounded-b-xl md:rounded-bl-none md:rounded-r-xl"
                    >
                      {/* Tech Stack section - visible on all screens */}
                      <motion.div variants={techStackVariants} initial="hidden" animate="visible">
                        <motion.h4 
                          className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
                        >
                          <Code className="mr-2 h-6 w-6 text-red-500" /> Tech Stack
                        </motion.h4>
                        
                        <motion.div className="flex flex-wrap gap-2 sm:gap-3">
                          {featuredProjects[currentIndex].techStack.map((tech, index) => (
                            <motion.span 
                              key={index} 
                              className="px-3 py-2 text-base bg-red-100/80 dark:bg-red-900/30 font-medium rounded-lg text-red-800 dark:text-red-300 shadow-sm"
                              variants={techItemVariants}
                              whileHover={{ scale: 1.05, y: -2 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.div>
                      
                      {/* Overview - hide on smaller screens if needed */}
                      <div className="hidden sm:block">
                        <motion.h4 
                          className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3"
                          custom={5}
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          Overview
                        </motion.h4>
                        
                        <motion.p 
                          className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 line-clamp-4 sm:line-clamp-6"
                          custom={6}
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {featuredProjects[currentIndex].description}
                        </motion.p>
                      </div>
                      
                      {/* Project metadata */}
                      <motion.div 
                        className="flex flex-wrap gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300"
                        custom={7}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 text-red-500" />
                          <span>Timeline: {featuredProjects[currentIndex].timeline}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 text-red-500" />
                          <span>{featuredProjects[currentIndex].teamWork ? 'Team Project' : 'Solo Project'}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Pagination dots */}
          {totalSlides > 1 && (
            <div className="mt-4 flex justify-center space-x-2 pb-2">
              {featuredProjects.map((_, index) => (
                <motion.button 
                  key={index} 
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-red-500 shadow-md shadow-red-500/50 scale-110' 
                      : 'bg-gray-300/50 dark:bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  aria-label={`Go to slide ${index + 1}`}
                ></motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedCarousel;