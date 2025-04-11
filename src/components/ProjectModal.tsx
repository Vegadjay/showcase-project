import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link as LinkIcon, Github, Twitter, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { Project, projectsData } from "../lib/data";
import ImageCarousel from "./ImageCarousel";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: number | null;
}

const ProjectModal = ({ isOpen, onClose, projectId }: ProjectModalProps) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (projectId) {
      const project = projectsData.find(p => p.id === projectId);
      if (project) {
        setActiveProject(project);
      }
    } else {
      setActiveProject(null);
    }
  }, [projectId]);

  if (!activeProject) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the comment to a backend
    // Since this is frontend only, we'll just clear the input
    setCommentText("");
    // Show a success message or update UI as needed
    alert("Comment submitted! (Note: In this demo, comments are not stored)");
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 overflow-y-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="fixed inset-0 bg-black/70 transition-opacity" 
              onClick={onClose}
            ></div>
            
            <motion.div 
              className="relative bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
              variants={contentVariants}
            >
              <div className="absolute top-4 right-4 z-10">
                <motion.button 
                  className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 focus:outline-none"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              
              {/* Project Details Content */}
              <div className="p-6">
                <div className="relative mb-6">
                  {/* Project Images Slider */}
                  <div className="rounded-lg overflow-hidden">
                    <ImageCarousel images={activeProject.imageUrls} />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{activeProject.title}</h2>
                    
                    <div className="flex items-center mb-6">
                      <div className="flex items-center mr-4">
                        <img 
                          src={activeProject.owner.avatar} 
                          alt={activeProject.owner.name}
                          className="w-10 h-10 rounded-full object-cover mr-2 border-2 border-white dark:border-gray-800"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{activeProject.owner.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Posted on {new Date(activeProject.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center ml-auto">
                        <div className="flex items-center bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-red-700 dark:text-red-300">{activeProject.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                      <p>{activeProject.description}</p>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2">Problem Solved</h3>
                      <p>{activeProject.problemSolved}</p>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2">Features</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {activeProject.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2">Development Challenges</h3>
                      <p>{activeProject.developmentChallenges}</p>
                    </div>
                    
                    {/* Discussion Section */}
                    <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Discussion</h3>
                      
                      {/* Comment Form */}
                      <form onSubmit={handleSubmitComment} className="flex items-start space-x-4 mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&q=80&w=40&h=40" 
                          alt="Your profile" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <textarea 
                            placeholder="Add a comment..." 
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
                            rows={2}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          ></textarea>
                          <div className="mt-2 flex justify-end">
                            <motion.button 
                              type="submit"
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={!commentText.trim()}
                            >
                              Post Comment
                            </motion.button>
                          </div>
                        </div>
                      </form>
                      
                      {/* Comments List */}
                      <div className="space-y-6">
                        {activeProject.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-4">
                            <img 
                              src={comment.author.avatar} 
                              alt={comment.author.name} 
                              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                            />
                            <div>
                              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-gray-900 dark:text-white text-sm">{comment.author.name}</span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                              </div>
                              <div className="mt-2 ml-2 flex space-x-4 text-xs">
                                <button className="text-gray-500 dark:text-gray-400 hover:text-red-500 flex items-center">
                                  <Heart className="h-3 w-3 mr-1" /> Like
                                </button>
                                <button className="text-gray-500 dark:text-gray-400 hover:text-red-500 flex items-center">
                                  <MessageCircle className="h-3 w-3 mr-1" /> Reply
                                </button>
                              </div>
                              
                              {/* Replies */}
                              {comment.replies && comment.replies.map((reply) => (
                                <div key={reply.id} className="mt-3 ml-6 flex space-x-4">
                                  <img 
                                    src={reply.author.avatar} 
                                    alt={reply.author.name} 
                                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                  />
                                  <div>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-gray-900 dark:text-white text-sm">{reply.author.name}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{reply.date}</span>
                                      </div>
                                      <p className="text-sm text-gray-700 dark:text-gray-300">{reply.text}</p>
                                    </div>
                                    <div className="mt-2 ml-2 flex space-x-4 text-xs">
                                      <button className="text-gray-500 dark:text-gray-400 hover:text-red-500 flex items-center">
                                        <Heart className="h-3 w-3 mr-1" /> Like
                                      </button>
                                      <button className="text-gray-500 dark:text-gray-400 hover:text-red-500 flex items-center">
                                        <MessageCircle className="h-3 w-3 mr-1" /> Reply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Project Details</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {activeProject.techStack.map((tech, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs font-medium rounded-md text-gray-800 dark:text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timeline</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{activeProject.timeline}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Links</h4>
                          <div className="space-y-2">
                            <a 
                              href={activeProject.links.live} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center text-sm text-red-600 dark:text-red-400 hover:underline"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                            {activeProject.links.github && (
                              <a 
                                href={activeProject.links.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-red-600 dark:text-red-400 hover:underline"
                              >
                                <Github className="h-4 w-4 mr-2" />
                                GitHub Repository
                              </a>
                            )}
                            {activeProject.links.twitter && (
                              <a 
                                href={activeProject.links.twitter} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-red-600 dark:text-red-400 hover:underline"
                              >
                                <Twitter className="h-4 w-4 mr-2" />
                                Twitter
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Similar Projects</h4>
                        <div className="space-y-3">
                          {projectsData
                            .filter(p => 
                              p.id !== activeProject.id && 
                              p.techStack.some(tech => activeProject.techStack.includes(tech))
                            )
                            .slice(0, 2)
                            .map(project => (
                              <a 
                                key={project.id}
                                className="flex items-center space-x-3 group cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveProject(project);
                                }}
                              >
                                <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                  <img 
                                    src={project.imageUrls[0]} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-red-500 truncate">
                                    {project.title}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {project.techStack[0]}
                                  </p>
                                </div>
                              </a>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
