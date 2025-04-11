import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  MapPin, 
  Calendar, 
  BriefcaseBusiness, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Download, 
  CheckCircle2, 
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { hireListingsData, HireListing } from "../lib/data";

const JobDetail = () => {
  const [location, setLocation] = useLocation();
  const [listing, setListing] = useState<HireListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [saved, setSaved] = useState(false);

  // Parse job ID from URL
  useEffect(() => {
    const id = new URLSearchParams(location.split("?")[1]).get("id");
    if (id) {
      const jobId = parseInt(id);
      const foundListing = hireListingsData.find(job => job.id === jobId);
      if (foundListing) {
        setListing(foundListing);
      }
    }
    setLoading(false);
  }, [location]);

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'interviewing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hired':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'confidential':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const handleShare = () => {
    if (navigator.share && listing) {
      navigator.share({
        title: `${listing.title} at ${listing.company}`,
        text: `Check out this job opportunity: ${listing.title} at ${listing.company}`,
        url: window.location.href,
      }).catch((error) => {
        console.log('Error sharing:', error);
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleSaved = () => {
    setSaved(!saved);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Job listing not found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The job listing you're looking for doesn't exist or has been removed.
        </p>
        <button 
          onClick={() => setLocation("/hire")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Back to job listings
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-800 pb-12"
    >
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <button 
            onClick={() => setLocation("/hire")}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to listings
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                <img 
                  src={listing.logo} 
                  alt={listing.company} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {listing.title}
                </h1>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <BriefcaseBusiness className="h-4 w-4 mr-1" /> 
                  <span>{listing.company}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.button
                onClick={handleShare}
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="h-4 w-4 mr-2" /> Share
              </motion.button>
              <motion.button
                onClick={toggleSaved}
                className={`flex items-center px-3 py-2 rounded-lg text-sm ${saved ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${saved ? 'fill-current' : ''}`} /> 
                {saved ? 'Saved' : 'Save Job'}
              </motion.button>
              <motion.button
                className="flex items-center px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium btn-hover-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Overview */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-red-500" />
                  <span className="text-gray-700 dark:text-gray-300">{listing.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-red-500" />
                  <span className="text-gray-700 dark:text-gray-300">Posted {formatDate(listing.postedAt)}</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                    {listing.status === 'confidential' ? 'Confidential' : 
                     listing.status === 'interviewing' ? 'Interviewing' : 
                     listing.status === 'hired' ? 'Position Filled' : 'Open'}
                  </span>
                  {listing.remote && (
                    <span className="ml-2 px-2.5 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full text-xs font-medium">
                      Remote
                    </span>
                  )}
                </div>
                {listing.salary && (
                  <div className="flex items-center">
                    <span className="px-2.5 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-medium">
                      {listing.salary}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Job Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Job Description
                </h2>
                <div className="prose prose-red dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {listing.description}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    We are looking for a talented developer to join our team and help us build amazing products. 
                    This is a {listing.remote ? 'remote' : 'on-site'} position that offers competitive compensation 
                    and benefits. The ideal candidate will be passionate about technology and have a strong desire 
                    to learn and grow with our company.
                  </p>
                </div>
              </div>
              
              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {listing.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Additional Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Additional Information
                </h2>
                <div className={`prose prose-red dark:prose-invert max-w-none overflow-hidden transition-all duration-300 ${showMore ? 'max-h-none' : 'max-h-40'}`}>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our company culture values creativity, collaboration, and continuous learning. 
                    We offer flexible working hours, professional development opportunities, and a 
                    supportive environment where you can thrive.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Benefits include:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Competitive salary and bonus structure</li>
                    <li>Health insurance and retirement plans</li>
                    <li>Professional development budget</li>
                    <li>Flexible working hours</li>
                    <li>Regular team events and activities</li>
                    {listing.remote && <li>Remote work setup allowance</li>}
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    We are an equal opportunity employer and value diversity at our company. 
                    We do not discriminate on the basis of race, religion, color, national origin, 
                    gender, sexual orientation, age, marital status, veteran status, or disability status.
                  </p>
                </div>
                <button 
                  className="flex items-center mt-4 text-red-500 hover:text-red-600 transition"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? (
                    <>Show less <ChevronUp className="ml-1 h-4 w-4" /></>
                  ) : (
                    <>Show more <ChevronDown className="ml-1 h-4 w-4" /></>
                  )}
                </button>
              </div>
            </div>
            
            {/* Application Instructions */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                How to Apply
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Please submit your resume and a brief cover letter explaining why you're interested in 
                this position and how your experience aligns with our requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium btn-hover-effect"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.button>
                <motion.button
                  className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-4 w-4 mr-2" /> Download Job Description
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Info */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                About the Company
              </h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                  <img 
                    src={listing.logo} 
                    alt={listing.company} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {listing.company}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Technology Company
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                We are a leading technology company focused on building innovative solutions 
                that help businesses grow and succeed in the digital age.
              </p>
              <div className="flex justify-between">
                <motion.button
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                  whileHover={{ x: 3 }}
                >
                  Visit Company Website →
                </motion.button>
              </div>
            </div>
            
            {/* Similar Jobs */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Similar Jobs
              </h3>
              <div className="space-y-4">
                {hireListingsData
                  .filter(job => job.id !== listing.id)
                  .slice(0, 3)
                  .map(job => (
                    <div 
                      key={job.id} 
                      className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0"
                      onClick={() => setLocation(`/job-detail?id=${job.id}`)}
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white hover:text-red-500 dark:hover:text-red-400 cursor-pointer">
                        {job.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span>{job.company}</span>
                        <span className="mx-2">•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  ))}
              </div>
              <button 
                className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                onClick={() => setLocation("/hire")}
              >
                View All Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetail;