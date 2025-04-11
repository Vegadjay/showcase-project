import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLocation } from "wouter";
import { BackgroundBeams } from "./ui/background-beams";
import { ColourfulText } from "./ui/colourful-text";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { MousePointer2, ArrowDown } from "lucide-react";

// Register ScrollToPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

const Hero = () => {
  const [, navigate] = useLocation();
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const scrollButtonRef = useRef(null);

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      const text = headingRef.current as HTMLElement;
      const textElements = Array.from(text.children);
      gsap.fromTo(
        textElements,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }

    // Sub-text animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.8,
          ease: "power2.out",
        }
      );
    }

    // Scroll button animation
    if (scrollButtonRef.current) {
      gsap.fromTo(
        scrollButtonRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.5,
          ease: "power2.out",
        }
      );
    }
  }, []);

  // Split text for character-by-character animation
  const words = "Don't just build — showcase. Turn your code into opportunity and your vision into something others can see.";
  
  const handleBrowseClick = () => {
    navigate("/projects");
  };

  const handleScrollDown = () => {
    // Calculate the scroll position - about 90% down the first viewport
    const targetPosition = window.innerHeight * 0.9;
    
    // Using window.scrollTo with smooth behavior as a fallback
    // in case GSAP's ScrollToPlugin doesn't work
    try {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: targetPosition,
        ease: "power2.inOut",
        onComplete: () => console.log("Scroll complete")
      });
    } catch (error) {
      // Fallback to native smooth scrolling
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  // Animation variants for the scroll button
  const scrollButtonVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute left-1/2 top-0 -z-10 w-full h-full -translate-x-1/2 xl:-top-6" aria-hidden="true">
            <BackgroundBeams />
          </div>
        </div>
      </div>

      {/* Hero content with responsive padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8">
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-poppins text-white bg-clip-text text-transparent overflow-hidden"
          >
            <span className="text-black dark:text-white">Showcase your best</span>{" "}
            <ColourfulText text="projects" />{" "}
            <span className="text-black dark:text-white">in one place</span>
          </h1>
          <div ref={textRef}>
            <TextGenerateEffect words={words} />
          </div>
        </div>
      </div>

      {/* Enhanced scroll down button */}
      <motion.div
        ref={scrollButtonRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={scrollButtonVariants}
        onClick={handleScrollDown}
      >
        <motion.div
          className="flex flex-col items-center gap-2 group"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
            Scroll Down
          </span>
          
          <div className="relative">            
            {/* Circle background */}
            <div className="p-2 rounded-full bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm shadow-lg group-hover:bg-white/20 dark:group-hover:bg-gray-700/40 transition-all duration-300">
              {/* Animated arrows */}
              <div className="relative">
                <ArrowDown className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200" />
                <motion.div
                  className="absolute top-0 left-0"
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, 4, 8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                >
                  <ArrowDown className="h-5 w-5 text-red-500/50" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;