import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import FeaturedCarousel from "../components/FeaturedCarousel";
import ProjectGrid from "../components/ProjectGrid";
import { projectsData } from "../lib/data";
import { useLocation } from "wouter";
import AnimatedTextSection from "@/components/ui/text-animations";

const Home = () => {
  const [, setLocation] = useLocation();

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23f1f1f1%22%20fill-opacity%3D%220.8%22%20%2F%3E%3C%2Fsvg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23333%22%20fill-opacity%3D%220.6%22%20%2F%3E%3C%2Fsvg%3E')]"
    >
      <Hero />
      <FeaturedCarousel 
        projects={projectsData.slice(0, 3)} 
        onProjectClick={(projectId) => {
          setLocation(`/project/${projectId}`);
        }} 
      />
      <ProjectGrid 
        projects={projectsData.slice(0, 8)} 
        onProjectClick={(projectId) => {
          setLocation(`/project/${projectId}`);
        }}
      />
      
      {/* View All Projects Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <motion.button 
          className="px-8 py-3 border-2 border-red-500 bg-transparent text-red-500 dark:border-red-400 dark:text-red-400 rounded-lg font-bold relative group transition duration-300"
          onClick={() => setLocation("/projects")}
        >
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-500 to-red-700 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-300 rounded-lg" />
          <span className="relative group-hover:text-white transition-colors duration-300">View All Projects</span>
        </motion.button>
      </div>
      
      {/* Animated CTA section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-300 blur-[100px] opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to showcase your project?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join our community of developers and get feedback on your work
          </motion.p> */}
          <AnimatedTextSection />
          <motion.button 
            className="px-8 py-3 bg-white text-red-600 rounded-full font-bold shadow-lg hover:bg-gray-100 transition blur-sm z-100 hover:shadow-xl hover:blur-0 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            onClick={() => setLocation("/post-project")}
          >
            Upload Your Project
          </motion.button>
        </div>
      </section>
      
      {/* Animated stats section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-red-500 mb-2">500+</div>
              <div className="text-lg text-gray-600 dark:text-gray-400">Projects Showcased</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-red-500 mb-2">2,500+</div>
              <div className="text-lg text-gray-600 dark:text-gray-400">Active Developers</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-red-500 mb-2">15+</div>
              <div className="text-lg text-gray-600 dark:text-gray-400">Technologies</div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;