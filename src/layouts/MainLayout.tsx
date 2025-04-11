import { ReactNode, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectModal from "../components/ProjectModal";
import UploadModal from "../components/UploadModal";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = (e: Event) => {
      if (isProjectModalOpen || isUploadModalOpen) {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isProjectModalOpen, isUploadModalOpen]);

  const openProjectModal = (projectId: number) => {
    setSelectedProject(projectId);
    setIsProjectModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    document.body.style.overflow = "";
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onUploadClick={openUploadModal} />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          window.scrollTo(0, 0);
        }}
      >
        {children}
      </motion.main>
      <Footer />

      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={closeProjectModal} 
        projectId={selectedProject} 
      />
      
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={closeUploadModal} 
      />
    </div>
  );
};

export default MainLayout;
