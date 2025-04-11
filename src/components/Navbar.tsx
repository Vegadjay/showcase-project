import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

interface NavbarProps {
  onUploadClick: () => void;
}

const Navbar = ({ onUploadClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/discussions", label: "Discussions" },
    { path: "/hire", label: "Hire" },
    { path: "/about", label: "About" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <motion.span 
                  className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  DevShowcase
                </motion.span>
              </a>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map(link => (
              <Link key={link.path} href={link.path}>
                <a className={`text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition ${location === link.path ? 'text-red-500 dark:text-red-400' : ''}`}>
                  {link.label}
                </a>
              </Link>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <motion.button 
              onClick={onUploadClick}
              className="bg-gradient-to-r from-red-500 to-red-700 text-white px-5 py-2 rounded-full font-medium transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Post Project
            </motion.button>
          </div>
          
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
              onClick={toggleMenu}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link key={link.path} href={link.path}>
                <a 
                  className={`block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500 ${location === link.path ? 'text-red-500 dark:text-red-400' : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <button 
              className="w-full mt-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-md font-medium"
              onClick={() => {
                onUploadClick();
                closeMenu();
              }}
            >
              Post Project
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
