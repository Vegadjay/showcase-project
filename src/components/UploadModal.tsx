import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Link as LinkIcon, Github, Twitter, Calendar, Plus, Trash2, X as XMark } from "lucide-react";
import { techStackList } from "../lib/data";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectFormData {
  title: string;
  description: string;
  owner: string;
  teamWork: boolean;
  techStack: string[];
  problem: string;
  timeline: {
    start: string;
    end: string;
  };
  images: { preview: string; file?: File }[];
  links: {
    live: string;
    github: string;
    twitter: string;
  };
}

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    owner: "",
    teamWork: false,
    techStack: [],
    problem: "",
    timeline: {
      start: "",
      end: ""
    },
    images: [],
    links: {
      live: "",
      github: "",
      twitter: ""
    }
  });
  
  const [techInput, setTechInput] = useState("");
  const [suggestedTech, setSuggestedTech] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof ProjectFormData],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleTeamWorkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      teamWork: e.target.value === "team"
    });
  };

  const handleTechInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTechInput(value);
    
    if (value.trim()) {
      const filtered = techStackList
        .filter(tech => tech !== "All")
        .filter(tech => tech.toLowerCase().includes(value.toLowerCase()));
      setSuggestedTech(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestedTech([]);
      setShowSuggestions(false);
    }
  };

  const addTechStack = (tech: string) => {
    if (!formData.techStack.includes(tech) && tech !== "All") {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, tech]
      });
    }
    setTechInput("");
    setSuggestedTech([]);
    setShowSuggestions(false);
  };

  const removeTechStack = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter(t => t !== tech)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Only add up to a maximum of 4 images
      const newImages = filesArray.slice(0, 4 - formData.images.length).map(file => ({
        preview: URL.createObjectURL(file),
        file
      }));
      
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages]
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    
    // Revoke the object URL to avoid memory leaks
    if (newImages[index].preview) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (
      !formData.title ||
      !formData.description ||
      !formData.owner ||
      formData.techStack.length === 0 ||
      !formData.problem ||
      !formData.timeline.start ||
      !formData.timeline.end ||
      formData.images.length < 3 || // Require at least 3 images
      !formData.links.live // Require at least the live link
    ) {
      alert("Please fill in all required fields and upload at least 3 images.");
      return;
    }
    
    // In a real application, this would submit to a backend
    // Since this is frontend only, show a success message and close the modal
    alert("Project submitted successfully! (Note: In this demo, projects are not actually saved)");
    
    // Reset form and close modal
    setFormData({
      title: "",
      description: "",
      owner: "",
      teamWork: false,
      techStack: [],
      problem: "",
      timeline: {
        start: "",
        end: ""
      },
      images: [],
      links: {
        live: "",
        github: "",
        twitter: ""
      }
    });
    onClose();
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
              className="relative bg-white dark:bg-gray-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
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
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload New Project</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Project Title*
                          </label>
                          <input 
                            type="text" 
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter project title" 
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                          />
                        </div>
                        
                        <div className="col-span-2">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description*
                          </label>
                          <textarea 
                            id="description" 
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your project" 
                            rows={4} 
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                          ></textarea>
                        </div>
                        
                        <div>
                          <label htmlFor="owner" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Project Owner*
                          </label>
                          <input 
                            type="text" 
                            id="owner"
                            name="owner" 
                            value={formData.owner}
                            onChange={handleInputChange}
                            placeholder="Your name" 
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Project Type*
                          </label>
                          <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                              <input 
                                type="radio" 
                                name="projectType" 
                                value="individual"
                                checked={!formData.teamWork}
                                onChange={handleTeamWorkChange}
                                className="form-radio text-red-500 focus:ring-red-500" 
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Individual</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input 
                                type="radio" 
                                name="projectType" 
                                value="team"
                                checked={formData.teamWork}
                                onChange={handleTeamWorkChange}
                                className="form-radio text-red-500 focus:ring-red-500" 
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Team</span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeline*</label>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="startDate" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                Start Date
                              </label>
                              <input 
                                type="date" 
                                id="startDate"
                                name="timeline.start"
                                value={formData.timeline.start}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="endDate" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                End Date
                              </label>
                              <input 
                                type="date" 
                                id="endDate"
                                name="timeline.end"
                                value={formData.timeline.end}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tech Stack */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tech Stack*</h3>
                      <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {formData.techStack.map(tech => (
                            <span 
                              key={tech}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                            >
                              {tech} 
                              <button 
                                type="button"
                                className="ml-1 text-red-600 dark:text-red-400 hover:text-red-800"
                                onClick={() => removeTechStack(tech)}
                              >
                                <XMark className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        
                        <div className="relative">
                          <input 
                            type="text"
                            value={techInput}
                            onChange={handleTechInputChange}
                            placeholder="Add technologies used (e.g. React, Node.js)" 
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          {showSuggestions && suggestedTech.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-10 mt-1">
                              <div className="p-1">
                                {suggestedTech.map(tech => (
                                  <div 
                                    key={tech} 
                                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                                    onClick={() => addTechStack(tech)}
                                  >
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{tech}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Problem Solved */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Problem & Solution</h3>
                      <div>
                        <label htmlFor="problem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          What problem does your project solve?*
                        </label>
                        <textarea 
                          id="problem"
                          name="problem"
                          value={formData.problem}
                          onChange={handleInputChange}
                          placeholder="Describe the problem your project addresses" 
                          rows={3} 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        ></textarea>
                      </div>
                    </div>
                    
                    {/* Media Upload */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Media</h3>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Project Images* (Min. 3 images)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {/* Image upload button */}
                          {formData.images.length < 4 && (
                            <label className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleImageUpload}
                                multiple={formData.images.length < 3}
                              />
                              <Plus className="text-2xl text-gray-400" />
                              <span className="mt-1 text-xs text-gray-500">Add Image</span>
                            </label>
                          )}
                          
                          {/* Preview images */}
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative aspect-video rounded-lg overflow-hidden group">
                              <img 
                                src={image.preview} 
                                alt={`Preview ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                  type="button"
                                  className="p-1 bg-white/10 backdrop-blur-sm rounded-full"
                                  onClick={() => removeImage(index)}
                                >
                                  <Trash2 className="h-4 w-4 text-white" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Project Video (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center">
                          <Upload className="h-10 w-10 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Drag and drop a video file, or click to browse
                          </p>
                          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                            Maximum file size: 100MB
                          </p>
                          <motion.button 
                            type="button"
                            className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Upload Video
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Links */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Links</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="liveLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Live Project URL*
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 py-2 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                              <LinkIcon className="h-4 w-4" />
                            </span>
                            <input 
                              type="url" 
                              id="liveLink"
                              name="links.live"
                              value={formData.links.live}
                              onChange={handleInputChange}
                              placeholder="https://yourproject.com" 
                              className="flex-1 px-3 py-2 rounded-r-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            GitHub Repository URL
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 py-2 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                              <Github className="h-4 w-4" />
                            </span>
                            <input 
                              type="url" 
                              id="githubLink"
                              name="links.github"
                              value={formData.links.github}
                              onChange={handleInputChange}
                              placeholder="https://github.com/username/repo" 
                              className="flex-1 px-3 py-2 rounded-r-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="twitterLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Twitter/X Link
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 py-2 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                              <Twitter className="h-4 w-4" />
                            </span>
                            <input 
                              type="url" 
                              id="twitterLink"
                              name="links.twitter"
                              value={formData.links.twitter}
                              onChange={handleInputChange}
                              placeholder="https://twitter.com/username" 
                              className="flex-1 px-3 py-2 rounded-r-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <motion.button 
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        Submit Project
                      </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadModal;
