import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const AnimatedSocialLinks = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  
  const socialLinks = [
    { 
      id: 'github', 
      label: 'github.com/vegadjay', 
      href: 'https://github.com/vegadjay',
      icon: Github 
    },
    { 
      id: 'linkedin', 
      label: 'linkedin.com/vegadjay', 
      href: 'https://linkedin.com/vegadjay',
      icon: Linkedin 
    },
    { 
      id: 'twitter', 
      label: 'x.com/JAY_VEGAD_', 
      href: 'https://x.com/JAY_VEGAD_',
      icon: Twitter 
    },
    { 
      id: 'email', 
      label: 'contact@devshowcase.com', 
      href: 'mailto:contact@devshowcase.com',
      icon: Mail 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="relative overflow-hidden p-2">
      {/* Background glow effect */}
      {hoveredLink && (
        <motion.div 
          className="absolute inset-0 opacity-20 blur-md z-0"
          layoutId="linkGlow"
          initial={{ backgroundColor: "#f87171" }}
          animate={{ 
            backgroundColor: 
              hoveredLink === 'github' ? "#333333" : 
              hoveredLink === 'linkedin' ? "#0077b5" : 
              hoveredLink === 'twitter' ? "#1da1f2" : 
              "#f87171"
          }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <div className="relative z-10">
        <motion.h4 
          className="text-lg font-semibold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Connect
        </motion.h4>
        
        <motion.ul 
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            
            return (
              <motion.li key={link.id} variants={linkVariants}>
                <motion.a 
                  href={link.href} 
                  className="text-gray-400 hover:text-red-400 transition flex items-center relative p-1 rounded-md"
                  onHoverStart={() => setHoveredLink(link.id)}
                  onHoverEnd={() => setHoveredLink(null)}
                  whileHover={{ 
                    x: 5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: hoveredLink === link.id ? [0, -10, 10, -10, 0] : 0,
                      scale: hoveredLink === link.id ? 1.2 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                  </motion.div>
                  
                  <motion.span
                    animate={{ 
                      fontWeight: hoveredLink === link.id ? 600 : 400
                    }}
                  >
                    {link.label}
                  </motion.span>
                  
                  {hoveredLink === link.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px bg-red-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      layoutId="underline"
                    />
                  )}
                </motion.a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
};

export default AnimatedSocialLinks;