import { useState } from "react";
import { motion } from "framer-motion";
import { hireListingsData } from "../lib/data";
import HireCard from "../components/HireCard";
import { Search, Briefcase, MapPin, Filter } from "lucide-react";

const Hire = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterRemote, setFilterRemote] = useState<boolean | null>(null);
  
  // Filter listings based on search query and filters
  const filteredListings = hireListingsData.filter(listing => {
    // Search filter
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      filterStatus === "all" || 
      filterStatus === listing.status;
    
    // Remote filter
    const matchesRemote = 
      filterRemote === null || 
      listing.remote === filterRemote;
    
    return matchesSearch && matchesStatus && matchesRemote;
  });

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="bg-slate-50 dark:bg-slate-900"
    >
      {/* Hero Section */}
      <section className="py-10 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Hire Talented Developers
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Find the perfect talent for your next project or join a team working on exciting challenges.
            </p>
          </motion.div>
          
          {/* Search and Filters */}
          <div className="max-w-5xl mx-auto mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Search positions, companies, or locations..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-400 dark:placeholder-slate-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-slate-500 dark:text-slate-400 self-center mr-1">
                <Filter className="h-4 w-4 inline mr-1" /> Filters:
              </span>
              
              {/* Status Filters */}
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === "all" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterStatus("all")}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === "open" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterStatus("open")}
              >
                Open
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === "interviewing" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterStatus("interviewing")}
              >
                Interviewing
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === "hired" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterStatus("hired")}
              >
                Hired
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === "confidential" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterStatus("confidential")}
              >
                Confidential
              </button>
              
              {/* Remote Filter */}
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterRemote === true 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterRemote(filterRemote === true ? null : true)}
              >
                Remote
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterRemote === false 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterRemote(filterRemote === false ? null : false)}
              >
                On-site
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Listings */}
      <section className="py-8 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {filteredListings.length > 0 ? (
              <div className="space-y-6">
                {filteredListings.map((listing, index) => (
                  <motion.div 
                    key={listing.id}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                  >
                    <HireCard listing={listing} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <Briefcase className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-2">No listings found</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Try adjusting your search or filters to find more opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Post a Job CTA */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-6 py-12 md:px-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Looking to hire developers?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Post your job listing and reach thousands of skilled developers ready for their next opportunity.
              </p>
              <motion.button 
                className="px-6 py-3 bg-white text-red-600 font-medium rounded-lg shadow-md hover:bg-slate-50 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Post a Job
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Hire;
