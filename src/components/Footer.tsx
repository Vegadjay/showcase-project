import { Link } from "wouter";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-4">DevShowcase</h3>
            <p className="text-gray-400 text-sm mb-4">A platform for developers to showcase their projects, get feedback, and connect with others.</p>
            <p className="text-white font-medium italic">Thank you Outlier for this amazing hackathon! ❤️</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-red-400 transition">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-gray-400 hover:text-red-400 transition">Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/discussions">
                  <a className="text-gray-400 hover:text-red-400 transition">Discussions</a>
                </Link>
              </li>
              <li>
                <Link href="/hire">
                  <a className="text-gray-400 hover:text-red-400 transition">Hire Talent</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-red-400 transition">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/about#faq">
                  <a className="text-gray-400 hover:text-red-400 transition">FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="/about#privacy">
                  <a className="text-gray-400 hover:text-red-400 transition">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/about#terms">
                  <a className="text-gray-400 hover:text-red-400 transition">Terms of Service</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/vegadjay" className="text-gray-400 hover:text-slate-500 transition flex items-center">
                  <Github className="mr-2 h-4 w-4" /> github.com/vegadjay
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/vegadjay/" className="text-gray-400 hover:text-blue-400 transition flex items-center">
                  <Linkedin className="mr-2 h-4 w-4" /> linkedin.com/vegadjay
                </a>
              </li>
              <li>
                <a href="https://x.com/JAY_VEGAD_" className="text-gray-400 hover:text-slate-700 transition flex items-center">
                  <Twitter className="mr-2 h-4 w-4" /> x.com/JAY_VEGAD_
                </a>
              </li>
              <li>
                <a href="mailto:contact@devshowcase.com" className="text-gray-400 hover:text-red-400 transition flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> contact@devshowcase.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} DevShowcase. All rights reserved.</p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/vegadjay" className="text-gray-400 hover:text-white transition">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://x.com/JAY_VEGAD_" className="text-gray-400 hover:text-white transition">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/vegadjay/" className="text-gray-400 hover:text-white transition">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:contact@devshowcase.com" className="text-gray-400 hover:text-white transition">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
