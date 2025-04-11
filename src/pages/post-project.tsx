import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Upload, 
  X as XMark, 
  Link as LinkIcon, 
  Github, 
  Twitter, 
  Calendar, 
  Plus, 
  Trash2,
  Info,
  ArrowLeft
} from "lucide-react";
import { techStackList } from "../lib/data";
import { addUserProject } from "../lib/localStorage";
import { useToast } from "@/hooks/use-toast";

const PostProject = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    owner: {
      name: "",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
    },
    teamWork: false,
    techStack: [] as string[],
    problemSolved: "",
    features: [""],
    developmentChallenges: "",
    timeline: {
      start: "",
      end: ""
    },
    imageUrls: [] as string[],
    links: {
      live: "",
      github: "",
      twitter: ""
    }
  });
  
  const [techInput, setTechInput] = useState("");
  const [suggestedTech, setSuggestedTech] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof typeof formData] as object),
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

  // Handle team work radio selection
  const handleTeamWorkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      teamWork: e.target.value === "team"
    });
  };

  // Handle tech stack
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
  
  // Handle features list
  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""]
    });
  };
  
  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };
  
  const removeFeature = (index: number) => {
    // Don't remove if it's the only feature
    if (formData.features.length <= 1) return;
    
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  // Mock image upload (in a real app, this would upload to a server)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        const filesArray = Array.from(e.target.files || []);
        
        // Create data URLs (in a real app, we'd upload to a server)
        const urls = filesArray.map(file => URL.createObjectURL(file));
        
        setFormData({
          ...formData,
          imageUrls: [...formData.imageUrls, ...urls]
        });
        
        setUploading(false);
      }, 1000);
    }
  };
  
  const removeImage = (index: number) => {
    const updatedImages = [...formData.imageUrls];
    URL.revokeObjectURL(updatedImages[index]); // Clean up object URL
    updatedImages.splice(index, 1);
    
    setFormData({
      ...formData,
      imageUrls: updatedImages
    });
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.shortDescription.trim() ||
      !formData.owner.name.trim() ||
      formData.techStack.length === 0 ||
      !formData.problemSolved.trim() ||
      formData.features.some(f => !f.trim()) ||
      !formData.developmentChallenges.trim() ||
      !formData.timeline.start ||
      !formData.timeline.end ||
      formData.imageUrls.length < 1 ||
      !formData.links.live.trim()
    ) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }
    
    // Add project to localStorage
    try {
      const newProject = addUserProject(formData);
      
      toast({
        title: "Project posted successfully!",
        description: "Your project has been added and is now visible in the projects gallery."
      });
      
      // Redirect to the project detail page
      navigate(`/project/${newProject.id}`);
    } catch (error) {
      toast({
        title: "Error posting project",
        description: "There was an error saving your project. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Calculate timeline as a formatted string
  const generateTimelineString = (): string => {
    if (!formData.timeline.start || !formData.timeline.end) return "";
    
    const start = new Date(formData.timeline.start);
    const end = new Date(formData.timeline.end);
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[start.getMonth()]} ${start.getFullYear()} - ${months[end.getMonth()]} ${end.getFullYear()}`;
  };
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="py-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center mb-6"
          variants={sectionVariants}
        >
          <button
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </button>
        </motion.div>
        
        <motion.div
          className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
          variants={sectionVariants}
        >
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Upload className="mr-3 h-5 w-5 text-red-500" />
              Share Your Project
            </h1>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Basic Project Information */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Project Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Title*
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Name of your project"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Short Description* (1-2 sentences)
                      </label>
                      <input
                        type="text"
                        id="shortDescription"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        placeholder="Brief description of your project"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        maxLength={120}
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formData.shortDescription.length}/120 characters
                      </p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Description*
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Detailed description of your project"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="owner.name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        id="owner.name"
                        name="owner.name"
                        value={formData.owner.name}
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
                  </div>
                </div>
                
                {/* Tech Stack */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Tech Stack*
                  </h2>
                  
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
                      
                      {formData.techStack.length === 0 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Add technologies used in your project
                        </span>
                      )}
                    </div>
                    
                    <div className="relative">
                      <input
                        type="text"
                        value={techInput}
                        onChange={handleTechInputChange}
                        placeholder="Add technologies (e.g. React, Node.js)"
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
                                <span className="text-sm">{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Problem, Features, and Challenges */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Project Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="problemSolved" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Problem Solved*
                      </label>
                      <textarea
                        id="problemSolved"
                        name="problemSolved"
                        value={formData.problemSolved}
                        onChange={handleInputChange}
                        placeholder="Describe the problem your project solves"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Key Features*
                      </label>
                      <div className="space-y-2">
                        {formData.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              placeholder={`Feature ${index + 1}`}
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="ml-2 p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                              disabled={formData.features.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        
                        <button
                          type="button"
                          onClick={addFeature}
                          className="flex items-center text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Feature
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="developmentChallenges" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Development Challenges*
                      </label>
                      <textarea
                        id="developmentChallenges"
                        name="developmentChallenges"
                        value={formData.developmentChallenges}
                        onChange={handleInputChange}
                        placeholder="Describe challenges faced during development"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Timeline */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Timeline*
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="timeline.start" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="timeline.start"
                          name="timeline.start"
                          value={formData.timeline.start}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="timeline.end" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="timeline.end"
                          name="timeline.end"
                          value={formData.timeline.end}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {formData.timeline.start && formData.timeline.end && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Timeline: {generateTimelineString()}
                    </p>
                  )}
                </div>
                
                {/* Project Images */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Project Images*
                  </h2>
                  
                  <div className="p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
                    {formData.imageUrls.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {formData.imageUrls.map((url, index) => (
                          <div key={index} className="relative group rounded-lg overflow-hidden h-28">
                            <img
                              src={url}
                              alt={`Project screenshot ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="p-1 bg-red-600 rounded-full text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8">
                        <div className="mb-4 flex justify-center">
                          <Upload className="h-12 w-12 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Drag and drop your project screenshots here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition">
                          {uploading ? (
                            <span>Uploading...</span>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-2" />
                              {formData.imageUrls.length > 0 ? 'Add More Images' : 'Upload Images'}
                            </>
                          )}
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  
                  {formData.imageUrls.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {formData.imageUrls.length} {formData.imageUrls.length === 1 ? 'image' : 'images'} uploaded
                    </p>
                  )}
                </div>
                
                {/* Project Links */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Project Links
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="links.live" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Live Demo URL*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <LinkIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          id="links.live"
                          name="links.live"
                          value={formData.links.live}
                          onChange={handleInputChange}
                          placeholder="https://myproject.example.com"
                          className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="links.github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GitHub Repository URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Github className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          id="links.github"
                          name="links.github"
                          value={formData.links.github}
                          onChange={handleInputChange}
                          placeholder="https://github.com/username/repository"
                          className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="links.twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Twitter/X URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Twitter className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          id="links.twitter"
                          name="links.twitter"
                          value={formData.links.twitter}
                          onChange={handleInputChange}
                          placeholder="https://twitter.com/username"
                          className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Submit */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
                      <Info className="h-4 w-4 mr-2" />
                      All fields marked with * are required
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => navigate("/projects")}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      >
                        Cancel
                      </button>
                      <motion.button
                        type="submit"
                        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Post Project
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostProject;