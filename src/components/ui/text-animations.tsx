import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedTextSection = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  
  // Text splitting animation variants for heading
  const headingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    }
  };
  
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      rotateX: 90
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  // Words animation for paragraph
  const paragraphVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.8
      }
    }
  };
  
  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10
      }
    }
  };
  
  useEffect(() => {
    // Import GSAP only after component mounts
    const loadGSAP = async () => {
      const gsap = await import('gsap');
      
      // Add shimmer effect to heading after initial animation
      if (headingRef.current) {
        const tl = gsap.default.timeline({
          repeat: -1,
          repeatDelay: 4,
          delay: 2
        });
        
        tl.fromTo(
          headingRef.current,
          {
            backgroundImage: "linear-gradient(90deg, #111827 0%, #111827 100%)",
            backgroundSize: "200% 100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent"
          },
          {
            backgroundImage: "linear-gradient(90deg, #111827 0%,rgb(246, 90, 59) 50%, #111827 100%)",
            backgroundPosition: "0% 0%",
            duration: 1,
            ease: "power1.inOut"
          }
        );
        
        tl.to(
          headingRef.current,
          {
            backgroundPosition: "100% 0%",
            duration: 1.5,
            ease: "power1.inOut"
          }
        );
      }
      
      // Add floating effect to paragraph
      if (paragraphRef.current) {
        gsap.default.to(paragraphRef.current, {
          y: "-=5",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2
        });
      }
    };
    
    loadGSAP();
  }, []);
  
  // Split heading text into individual letters for animation
  const headingText = "Ready to showcase your project?";
  const headingLetters = headingText.split("");
  
  // Split paragraph text into words for animation
  const paragraphText = "Join our community of developers and get feedback on your work";
  const paragraphWords = paragraphText.split(" ");
  
  return (
    <div className="text-center">
      <motion.div
        className="overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariants}
      >
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white inline-block"
        >
          {headingLetters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h2>
      </motion.div>
      
      <motion.div
        className="overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={paragraphVariants}
      >
        <p 
          ref={paragraphRef}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          {paragraphWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mx-1"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </div>
  );
};

export default AnimatedTextSection;