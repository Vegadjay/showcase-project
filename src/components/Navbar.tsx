import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "../context/ThemeContext";
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
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white to-gray-50 dark:from-slate-600 dark:to-black backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center group">
                <span 
                  className="text-2xl font-bold bg-clip-text text-transparent transition-all duration-300 transform group-hover:scale-105"
                  style={{
                    backgroundSize: "200% auto",
                    animation: "gradient 3s linear infinite"
                  }}
                >
                  <img src="/codefolio.png" alt="logo" className="w-24 h-18" />
                </span>
                <style jsx>{`
                  @keyframes gradient {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                  }
                `}</style>
              </a>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map(link => (
              <Link key={link.path} href={link.path}>
                <a className="relative group">
                  <span className={`text-gray-800 dark:text-gray-200 group-hover:text-red-500 dark:group-hover:text-red-400 font-medium transition-colors duration-300 ${
                    location === link.path ? 'text-red-500 dark:text-red-400' : ''
                  }`}>
                    {link.label}
                  </span>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 ${
                    location === link.path ? 'w-full' : 'group-hover:w-full'
                  }`}></span>
                </a>
              </Link>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:rotate-12"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' 
                ? <Sun className="h-5 w-5 transition-all duration-300 hover:text-yellow-400" /> 
                : <Moon className="h-5 w-5 transition-all duration-300 hover:text-blue-400" />
              }
            </button>
            
            <button 
              onClick={onUploadClick}
              className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-inner"
            >
              Post Project
            </button>
          </div>
          
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:rotate-12"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' 
                ? <Sun className="h-5 w-5 transition-all duration-300 hover:text-yellow-400" /> 
                : <Moon className="h-5 w-5 transition-all duration-300 hover:text-blue-400" />
              }
            </button>
            <button 
              onClick={toggleMenu}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 active:scale-95"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen 
                ? <X className="h-6 w-6 transition-all duration-300 transform rotate-90 hover:rotate-180" /> 
                : <Menu className="h-6 w-6 transition-all duration-300 hover:text-red-500" />
              }
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black border-b border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-500"
          style={{
            animation: "slideDown 0.3s ease-out forwards"
          }}
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link, index) => (
              <Link key={link.path} href={link.path}>
                <a 
                  className={`block py-2 px-3 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500 transition-all duration-300 transform hover:translate-x-2 ${
                    location === link.path ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20' : ''
                  }`}
                  onClick={closeMenu}
                  style={{
                    animation: `slideIn 0.3s ease-out forwards ${index * 0.05}s`
                  }}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <button 
              className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-md"
              onClick={() => {
                onUploadClick();
                closeMenu();
              }}
              style={{
                animation: "fadeIn 0.5s ease-out forwards 0.3s"
              }}
            >
              Post Project
            </button>
          </div>
          <style jsx>{`
            @keyframes slideDown {
              from { max-height: 0; opacity: 0; }
              to { max-height: 400px; opacity: 1; }
            }
            @keyframes slideIn {
              from { opacity: 0; transform: translateX(-20px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </nav>
  );
};

export default Navbar;