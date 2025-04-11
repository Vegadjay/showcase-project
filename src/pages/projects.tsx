import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import ProjectGrid from "../components/ProjectGrid";
import { projectsData } from "../lib/data";

const Projects = () => {
  const [, setLocation] = useLocation();
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parse URL query parameters
    const searchParams = new URLSearchParams(location.split('?')[1] || '');
    const projectIdParam = searchParams.get('project');
    const showUploadParam = searchParams.get('upload');

    if (projectIdParam) {
      const projectId = parseInt(projectIdParam);
      if (!isNaN(projectId)) {
        // Handle project ID logic here
      }
    }
    
    if (showUploadParam === 'true') {
      // Handle upload logic here
    }
  }, [location]);

  const pageVariants = {
    initial: { 
      opacity: 0,
      y: 0 // Changed from default to prevent content jump
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0,
      y: 0,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23f1f1f1%22%20fill-opacity%3D%220.8%22%20%2F%3E%3C%2Fsvg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23333%22%20fill-opacity%3D%220.6%22%20%2F%3E%3C%2Fsvg%3E')]"
    >
      {/* Hero Section with reduced padding */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-8" // Reduced margin
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-4">
              Discover Amazing Projects
            </h1>
            <p className="text-lg text-black dark:text-white">
              Browse through our collection of developer projects, filter by technology, or search for specific projects.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* ProjectGrid with smooth entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <ProjectGrid 
          projects={projectsData} 
          onProjectClick={(projectId) => {
            setLocation(`/project/${projectId}`);
          }}
        />
      </motion.div>

      {/* Call to Action with reduced padding */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="md:w-2/3 mb-4 md:mb-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-2">
                Have a project to showcase?
              </h2>
              <p className="text-black dark:text-white">
                Share your work with the community and get valuable feedback from fellow developers.
              </p>
            </div>
            <motion.button 
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLocation("/post-project")}
            >
              Upload Your Project
            </motion.button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Projects;