import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { motion, useAnimation } from "framer-motion";
import { projectsData } from "../lib/data";
import { getUserProjects } from "../lib/localStorage";
import { 
  Link as LinkIcon, 
  Github, 
  Twitter,
  Calendar, 
  Heart, 
  MessageCircle, 
  Share2, 
  ArrowLeft, 
  User, 
  Send
} from "lucide-react";
import ImageCarousel from "../components/ImageCarousel";
import { isProjectLiked, toggleProjectLike, getCommentsByProjectId, addProjectComment } from "../lib/localStorage";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const projectId = parseInt(id);
  const { toast } = useToast();
  
  // Find project from both static data and user generated data
  const staticProject = projectsData.find(p => p.id === projectId);
  const userProjects = getUserProjects();
  const userProject = userProjects.find(p => p.id === projectId);
  const project = staticProject || userProject;
  
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [projectComments, setProjectComments] = useState<any[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  
  // Refs for GSAP animations
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Check if project exists
  useEffect(() => {
    if (!project) {
      toast({
        title: "Project not found",
        description: "The project you are looking for does not exist.",
        variant: "destructive"
      });
      navigate("/projects");
      return;
    }
    
    // Check if project is liked
    setIsLiked(isProjectLiked(projectId));
    
    // Get comments from localStorage
    const comments = getCommentsByProjectId(projectId);
    setProjectComments(comments);
    
    // GSAP animations
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
    );
    
    gsap.fromTo(
      featuresRef.current?.children || [],
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );
    
    gsap.fromTo(
      sidebarRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );
    
  }, [project, projectId]);
  
  const handleLikeToggle = () => {
    const newLikeState = toggleProjectLike(projectId);
    setIsLiked(newLikeState);
    
    // Animate heart
    const heartIcon = document.getElementById("heart-icon");
    if (heartIcon) {
      heartIcon.classList.add('scale-150');
      setTimeout(() => {
        heartIcon.classList.remove('scale-150');
      }, 300);
    }
  };
  
  // Share functionality
  const handleShare = async () => {
    if (!project) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: project.title,
          text: project.shortDescription || project.description.substring(0, 100) + '...',
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support navigator.share
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Project link has been copied to clipboard."
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim() || !authorName.trim()) {
      toast({
        title: "Cannot submit comment",
        description: "Please provide both your name and a comment.",
        variant: "destructive"
      });
      return;
    }
    
    const newComment = addProjectComment({
      projectId,
      text: commentText,
      author: authorName
    });
    
    setProjectComments([...projectComments, newComment]);
    setCommentText("");
    
    toast({
      title: "Comment posted!",
      description: "Your comment has been added to the project."
    });
  };
  
  if (!project) return null;

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  const childAnimations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="pt-6 pb-20"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          className="flex items-center mb-8 text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
          onClick={() => navigate("/projects")}
          variants={childAnimations}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </motion.button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <motion.div className="lg:col-span-8" variants={childAnimations}>
            {/* Project Title */}
            <h1 
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4"
            >
              {project.title}
            </h1>
            
            {/* Author and Date */}
            <div className="flex items-center mb-6">
              <img 
                src={project.owner.avatar} 
                alt={project.owner.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <p className="font-medium text-neutral-900 dark:text-white">
                  {project.owner.name}
                </p>
                <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="ml-auto flex space-x-2">
                <motion.button 
                  className={`p-2 rounded-full ${isLiked ? 'bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-400' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'}`}
                  onClick={handleLikeToggle}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isLiked ? 
                    <Heart id="heart-icon" className="h-5 w-5 transition-transform fill-current" /> : 
                    <Heart id="heart-icon" className="h-5 w-5 transition-transform" />
                  }
                </motion.button>
                <motion.button 
                  className="p-2 rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
            
            {/* Project Images Slider */}
            <div className="rounded-lg overflow-hidden mb-8 shadow-lg">
              <ImageCarousel images={project.imageUrls} />
            </div>
            
            {/* Project Description */}
            <div 
              ref={descriptionRef}
              className="prose prose-lg max-w-none text-neutral-700 dark:text-neutral-300 mb-10">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Project Overview</h2>
              <p>{project.description}</p>
              
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-3">Problem Solved</h3>
              <p>{project.problemSolved}</p>
              
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-3">Key Features</h3>
              <ul 
                ref={featuresRef}
                className="space-y-2"
              >
                {project.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-3">Development Challenges</h3>
              <p>{project.developmentChallenges}</p>
            </div>
            
            {/* Comments Section */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-10">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Discussion
              </h3>
              
              {/* Comment Form */}
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                  Leave a Comment
                </h4>
                <form onSubmit={handleSubmitComment}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        className="pl-10 w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Your Comment
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Share your thoughts about this project..."
                      rows={4}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Post Comment
                    </motion.button>
                  </div>
                </form>
              </div>
              
              {/* Comments List */}
              <div className="space-y-6">
                {[...project.comments, ...projectComments].map((comment, idx) => (
                  <motion.div 
                    key={comment.id || idx}
                    className="flex space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <img 
                      src={comment.author?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"} 
                      alt={comment.author?.name || comment.author} 
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="comment-card bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-neutral-900 dark:text-white">
                            {comment.author?.name || comment.author}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {comment.date ? new Date(comment.date).toLocaleDateString() : comment.date}
                          </span>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300">{comment.text}</p>
                      </div>
                      <div className="mt-2 ml-2 flex space-x-4 text-xs">
                        <button className="text-neutral-500 dark:text-neutral-400 hover:text-primary flex items-center">
                          <Heart className="h-3 w-3 mr-1" /> Like
                        </button>
                        <button className="text-neutral-500 dark:text-neutral-400 hover:text-primary flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" /> Reply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {project.comments.length === 0 && projectComments.length === 0 && (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-3" />
                    <p className="text-neutral-500 dark:text-neutral-400">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div 
            ref={sidebarRef}
            className="lg:col-span-4" 
            variants={childAnimations}>
            {/* Project Info Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                Project Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Project Type
                  </h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {project.teamWork ? 'Team Project' : 'Individual Project'}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Timeline
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {typeof project.timeline === 'string' 
                      ? project.timeline 
                      : `${new Date(project.timeline.start).toLocaleDateString()} - ${new Date(project.timeline.end).toLocaleDateString()}`
                    }
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                    Project Links
                  </h4>
                  <div className="space-y-2">
                    <a 
                      href={project.links.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary dark:text-primary-400 hover:underline"
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      View Live Demo
                    </a>
                    {project.links.github && (
                      <a 
                        href={project.links.github} 
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="flex items-center text-sm text-primary dark:text-primary-400 hover:underline"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        GitHub Repository
                      </a>
                    )}
                    {project.links.twitter && (
                      <a 
                        href={project.links.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary dark:text-primary-400 hover:underline"
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Similar Projects */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                Similar Projects
              </h3>
              
              <div className="space-y-4">
                {projectsData
                  .filter(p => 
                    p.id !== projectId && 
                    p.techStack.some(tech => project.techStack.includes(tech))
                  )
                  .slice(0, 3)
                  .map((p, idx) => (
                    <motion.div 
                      key={p.id}
                      className="group flex items-center space-x-3 p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition cursor-pointer"
                      whileHover={{ x: 5 }}
                      onClick={() => navigate(`/project/${p.id}`)}
                    >
                      <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={p.imageUrls[0]} 
                          alt={p.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate group-hover:text-primary transition">
                          {p.title}
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          by {p.owner.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                {projectsData.filter(p => 
                  p.id !== projectId && 
                  p.techStack.some(tech => project.techStack.includes(tech))
                ).length === 0 && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                    No similar projects found.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail; 