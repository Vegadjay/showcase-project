import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hireListingsData } from "../lib/data";
import HireCard from "../components/HireCard";
import { Search, Briefcase, MapPin, Filter } from "lucide-react";
import { GlowSearchInput } from "../components/ui/glow-input";

const Hire = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRemote, setFilterRemote] = useState(null);
  const [listings, setListings] = useState([]);
  
  // Load listings on initial load
  useEffect(() => {
    // Add random color to each listing for card styling
    const enhancedListings = hireListingsData.map(listing => ({
      ...listing,
      color: getRandomColor(),
    }));
    
    setListings(enhancedListings);
  }, []);
  
  // Get random pastel color for card accents - updated with new colors
  function getRandomColor() {
    const colors = [
      "from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40",
      "from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40",
      "from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40",
      "from-teal-100 to-teal-200 dark:from-teal-900/40 dark:to-teal-800/40",
      "from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40",
      "from-indigo-50 to-indigo-200 dark:from-indigo-950/40 dark:to-indigo-800/40",
      // Kept a few original colors
      "from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40",
      "from-rose-100 to-rose-200 dark:from-rose-900/40 dark:to-rose-800/40",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Filter listings based on search query and filters
  const filteredListings = listings.filter(listing => {
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
      className="min-h-screen"
    >
      {/* Hero Section - Added dotted background */}
      <section className="py-10 bg-gradient-to-r from-red-50 to-rose-50 dark:bg-gradient-to-r dark:from-slate-900 dark:to-red-950 relative">
        {/* Dotted background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-red-800 dark:text-red-200 mb-4">
              Hire Talented Developers
            </h1>
            <p className="text-lg text-red-700 dark:text-red-300">
              Find the perfect talent for your next project or join a team working on exciting challenges.
            </p>
          </motion.div>
          
          {/* Search and Filters */}
          <div className="max-w-md mx-auto mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                {/* Replaced standard input with GlowSearchInput */}
                <GlowSearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
              
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-3 rounded-lg flex items-center transition ${
                    filterStatus === "all" 
                      ? "bg-red-600 text-white dark:bg-red-700 dark:text-white shadow-md" 
                      : "bg-white text-red-700 border border-red-200 dark:bg-slate-800 dark:text-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30"
                  }`}
                  onClick={() => setFilterStatus("all")}
                >
                  <Filter className="h-4 w-4 mr-2" /> All
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg flex items-center transition ${
                    filterRemote === true 
                      ? "bg-red-600 text-white dark:bg-red-700 dark:text-white shadow-md" 
                      : "bg-white text-red-700 border border-red-200 dark:bg-slate-800 dark:text-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30"
                  }`}
                  onClick={() => setFilterRemote(filterRemote === true ? null : true)}
                >
                  <MapPin className="h-4 w-4 mr-2" /> Remote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Filter Pills - Added dotted background */}
      <section className="py-4 bg-slate-50 dark:bg-slate-900 relative">
        {/* Dotted background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.05)_1px,_transparent_1px)] bg-[length:16px_16px] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-slate-500 dark:text-slate-400 self-center mr-1">
                <Filter className="h-4 w-4 inline mr-1" /> Status:
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
              
              <span className="text-sm text-slate-500 dark:text-slate-400 self-center ml-4 mr-1">
                <MapPin className="h-4 w-4 inline mr-1" /> Location:
              </span>
              
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
      
      {/* Listings - Added dotted background */}
      <section className="py-8 bg-slate-50 dark:bg-slate-900 relative">
        {/* Dotted background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.05)_1px,_transparent_1px)] bg-[length:16px_16px] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {filteredListings.length > 0 ? (
              <div className="space-y-6">
                {filteredListings.map((listing, index) => (
                  <motion.div 
                    key={listing.id}
                    className={`bg-gradient-to-r ${listing.color} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-red-100 dark:border-red-900`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.1)" }}
                  >
                    <div className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                      <div className="flex">
                        <img 
                          src={listing.companyLogo || "/images/company/default.jpg"} 
                          alt={listing.company}
                          className="w-12 h-12 rounded-lg mr-4 border-2 border-red-200 dark:border-red-800 shadow-sm object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                {listing.title}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                <span className="text-red-600 dark:text-red-400">{listing.company}</span> · {listing.postedDate}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                listing.status === 'open' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                listing.status === 'interviewing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                listing.status === 'hired' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                              }`}>
                                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">
                            {listing.description}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-red-500 dark:text-red-400" /> 
                              {listing.location} {listing.remote && '(Remote)'}
                            </div>
                            
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1 text-red-500 dark:text-red-400" /> 
                              {listing.employmentType}
                            </div>
                            
                            {listing.salary && (
                              <div className="flex items-center">
                                <span className="text-red-500 dark:text-red-400 mr-1">$</span> 
                                {listing.salary}
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {listing.skills && listing.skills.map((skill, i) => (
                              <span key={i} className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-red-100 dark:border-red-900/50">
                            <motion.button 
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-colors"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              Apply Now
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-900">
                <Briefcase className="h-16 w-16 text-red-400 dark:text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-2">No listings found</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Try adjusting your search or filters to find more opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Post a Job CTA - Added dotted background */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900 relative">
        {/* Dotted background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.05)_1px,_transparent_1px)] bg-[length:16px_16px] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-2xl overflow-hidden shadow-lg relative">
            {/* Dotted background overlay inside the CTA box */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:12px_12px]"></div>
            <div className="px-6 py-12 md:px-12 text-center text-white relative z-10">
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