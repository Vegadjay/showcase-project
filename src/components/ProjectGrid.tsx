import { useState, useEffect } from "react";
import { Project } from "../lib/data";
import ProjectCard from "./ProjectCard";
import TechFilter from "./TechFilter";
import { motion } from "framer-motion";
import { GlowSearchInput } from "./ui/glow-input";

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (projectId: number) => void;
}

const ProjectGrid = ({ projects, onProjectClick }: ProjectGridProps) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeTech, setActiveTech] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 16; // Changed to 16 for 4x4 grid

  useEffect(() => {
    let result = projects;

    // Apply tech filter
    if (activeTech !== "All") {
      result = result.filter(project =>
        project.techStack.includes(activeTech)
      );
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techStack.some(tech => tech.toLowerCase().includes(query)) ||
        project.owner.name.toLowerCase().includes(query)
      );
    }

    setFilteredProjects(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeTech, searchQuery, projects]);

  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className="py-6 md:py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1800px]"> {/* Increased max width */}
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-3">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Explore Projects ({filteredProjects.length})
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Page {currentPage} of {Math.ceil(filteredProjects.length / projectsPerPage)}
            </p>
          </div>

          {/* Search Bar */}
          {/* <div className="w-full lg:w-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full lg:w-80 pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
            </div>
          </div> */}

          <GlowSearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Tech Stack Filters */}
        <div className="mb-5">
          <TechFilter activeTech={activeTech} setActiveTech={setActiveTech} />
        </div>

        {/* Project Grid - Updated with smaller gaps */}
        {currentProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.03,
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                className="flex w-full"
              >
                <ProjectCard
                  project={{ ...project, map: [] }}
                  onClick={() => onProjectClick(project.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // No Results State
          <motion.div
            className="flex flex-col items-center justify-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md px-4">
              We couldn't find any projects matching your filters. Try adjusting your search or check back later.
            </p>
          </motion.div>
        )}

        {/* Enhanced Pagination */}
        {filteredProjects.length > projectsPerPage && (
          <div className="mt-8 flex flex-col items-center">
            <Pagination1
              currentPage={currentPage}
              totalPages={Math.ceil(filteredProjects.length / projectsPerPage)}
              onPageChange={handlePageChange}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Showing {indexOfFirstProject + 1} - {Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Enhanced Pagination Component
const Pagination1 = ({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg ${currentPage === page
                ? "bg-red-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              } transition-colors`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default ProjectGrid;