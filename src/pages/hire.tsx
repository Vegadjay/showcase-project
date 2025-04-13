import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hireListingsData } from "../lib/data";
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
      color: getRandomCardColor(),
    }));
    
    setListings(enhancedListings);
  }, []);
  
  // Card background colors array with red theme (matching discussions page)
  const cardColors = [
    "from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40",
    "from-rose-100 to-rose-200 dark:from-rose-900/40 dark:to-rose-800/40",
    "from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40",
    "from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40",
    "from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40",
    "from-red-50 to-rose-200 dark:from-red-950/40 dark:to-rose-800/40",
    "from-rose-50 to-red-200 dark:from-rose-950/40 dark:to-red-800/40",
    "from-red-100 to-pink-200 dark:from-red-900/40 dark:to-pink-800/40",
  ];
  
  // Get random card color from our array for consistent styling
  function getRandomCardColor() {
    return cardColors[Math.floor(Math.random() * cardColors.length)];
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

  const listingVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23fee2e2%22%20fill-opacity%3D%220.8%22%20%2F%3E%3C%2Fsvg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23450a0a%22%20fill-opacity%3D%220.6%22%20%2F%3E%3C%2Fsvg%3E')]"
    >
      {/* Hero Section - Styled like Discussions page */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent mb-4">
              Hire Talented Developers
            </h1>
            <p className="text-lg text-black dark:text-white">
              Find the perfect talent for your next project or join a team working on exciting challenges.
            </p>
          </motion.div>
          
          {/* Search and Filters */}
          <div className="max-w-md mx-auto mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
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
      
      {/* Additional Filter Pills */}
      <section className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400 self-center mr-1">
                <Filter className="h-4 w-4 inline mr-1" /> Status:
              </span>
              
              {/* Status Filters */}
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === "all" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-100 dark:border-red-900"
                }`}
                onClick={() => setFilterStatus("all")}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === "open" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-100 dark:border-red-900"
                }`}
                onClick={() => setFilterStatus("open")}
              >
                Open
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === "interviewing" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-100 dark:border-red-900"
                }`}
                onClick={() => setFilterStatus("interviewing")}
              >
                Interviewing
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === "hired" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-100 dark:border-red-900"
                }`}
                onClick={() => setFilterStatus("hired")}
              >
                Hired
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === "confidential" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-100 dark:border-red-900"
                }`}
                onClick={() => setFilterStatus("confidential")}
              >
                Confidential
              </button>
              
              <span className="text-sm text-slate-600 dark:text-slate-400 self-center ml-4 mr-1">
                <MapPin className="h-4 w-4 inline mr-1" /> Location:
              </span>
              
              {/* Remote Filter */}
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterRemote === true 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-100 dark:border-red-900"
                }`}
                onClick={() => setFilterRemote(filterRemote === true ? null : true)}
              >
                Remote
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterRemote === false 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-100 dark:border-red-900"
                }`}
                onClick={() => setFilterRemote(filterRemote === false ? null : false)}
              >
                On-site
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Listings Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {filteredListings.length > 0 ? (
              <div className="space-y-6">
                {filteredListings.map((listing, index) => (
                  <motion.div 
                    key={listing.id}
                    className={`bg-gradient-to-r ${listing.color} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-red-100 dark:border-red-900`}
                    variants={listingVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.1)" }}
                  >
                    <div className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                      <div className="flex">
                        <img 
                          src={listing.companyLogo || "/images/company/default.jpg"} 
                          alt={listing.company}
                          className="w-10 h-10 rounded-full mr-4 border-2 border-red-200 dark:border-red-800 shadow-sm object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-black dark:text-white">
                                {listing.title}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                <span className="text-red-600 dark:text-red-400">{listing.company}</span> · {listing.postedDate}
                              </p>
                            </div>
                            <div className="flex-shrink-0 h-12 w-12 rounded overflow-hidden border border-red-200 dark:border-red-900 shadow-sm">
                              <img 
                                src={listing.companyLogo || "/images/company/default.jpg"} 
                                alt={listing.company}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          
                          <p className="text-black dark:text-white mb-4">
                            {listing.description}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" /> 
                              {listing.location} {listing.remote && '(Remote)'}
                            </div>
                            
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" /> 
                              {listing.employmentType}
                            </div>
                            
                            {listing.salary && (
                              <div className="flex items-center">
                                <span className="mr-1">$</span> 
                                {listing.salary}
                              </div>
                            )}
                            
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              listing.status === 'open' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              listing.status === 'interviewing' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              listing.status === 'hired' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            }`}>
                              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </span>
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
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">No listings found</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Try adjusting your search or filters to find more opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Post a Job CTA - Updated to match Discussions styling */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl overflow-hidden shadow-lg">
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