"use client";
import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Heart, Link } from "lucide-react";
import { isProjectLiked, toggleProjectLike } from "@/lib/localStorage";
import { ArrowRight } from "lucide-react";

type Project = {
  map(arg0: (project: any) => import("react/jsx-runtime").JSX.Element): React.ReactNode;
  id: number;
  title: string;
  shortDescription: string;
  imageUrls: string[];
  techStack: string[];
  rating: number;
  owner: {
    name: string;
    avatar: string;
  };
};

export function ThreeDProjectCard({ project, onClick }: { project: Project; onClick?: (id: number) => void }) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Check if project is liked on mount
    setIsLiked(isProjectLiked(project.id));
  }, [project.id]);

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newIsLiked = toggleProjectLike(project.id);
    setIsLiked(newIsLiked);
  };

  const handleProjectOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick(project.id);
    } else {

      window.open(`/${project.id}`, '_blank');
    }
  };

  return (
    <CardContainer 
      className="inter-var w-full cursor-pointer"
    >
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-4xl dark:hover:shadow-red-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[300px] md:w-[380px] h-auto rounded-xl p-4 border transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-3 right-3 z-10">
          <CardItem
            translateZ="80"
            className="inline-flex items-center rounded-full bg-red-500/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-white"
            onClick={handleProjectOpen}
          >
            {project.techStack[0]}
          </CardItem>
        </div>

        <CardItem
          translateZ="50"
          className="text-lg font-bold text-neutral-600 dark:text-white line-clamp-1"
          onClick={handleProjectOpen}
        >
          {project.title}
        </CardItem>
        
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-xs max-w-full mt-1 dark:text-neutral-300 line-clamp-2"
          onClick={handleProjectOpen}
        >
          {project.shortDescription}
        </CardItem>
        
        <CardItem translateZ="100" className="w-full mt-3"
         onClick={handleProjectOpen}
         >
          <img
            src={project.imageUrls[0]}
            className="h-48 w-full object-cover rounded-lg group-hover/card:shadow-xl"
            alt={project.title}
          />
        </CardItem>
        
        <div className="flex justify-between items-center mt-4">
          <CardItem translateZ="40" className="flex items-center">
            <img
             onClick={handleProjectOpen}
              src={project.owner.avatar}
              className="w-5 h-5 rounded-full object-cover"
              alt={project.owner.name}
            />
            <span className="ml-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-24">
              {project.owner.name}
            </span>
          </CardItem>
          
          <CardItem translateZ="40" className="flex items-center">
            <div className="flex items-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                {project.rating.toFixed(1)}
              </span>
            </div>
            <button
              onClick={handleLikeToggle}
              className={`flex items-center transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400 dark:text-gray-600'}`}
            >
              <Heart className={`h-3 w-3 transition-transform hover:scale-110 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </CardItem>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <CardItem
            translateZ={20}
            as="button"
            onClick={handleProjectOpen}
            className="w-full py-3 px-6 text-lg font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2"
          >
            View Details
            <ArrowRight className="w-5 h-5" />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

// Demo usage with sample data
export function ThreeDCardDemo() {
  const handleProjectClick = (id: number) => {
    // Navigate to project detail page
    window.location.href = `/project/${id}`;
  };

  const sampleProject: Project = {
    id: 1,
    title: "Interactive Portfolio Website",
    shortDescription: "A responsive portfolio website with 3D animations and interactive elements",
    imageUrls: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    techStack: ["React", "Three.js", "Tailwind CSS"],
    rating: 4.8,
    owner: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    map: function (arg0: (project: any) => import("react/jsx-runtime").JSX.Element): React.ReactNode {
      throw new Error("Function not implemented.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sampleProject.map((project) => (
        <ThreeDProjectCard 
          key={project.id} 
          project={project} 
          onClick={handleProjectClick}
        />
      ))}
    </div>
  );
}

export default ThreeDProjectCard;