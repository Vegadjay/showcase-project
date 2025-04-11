import { motion } from "framer-motion";
import { HireListing } from "../lib/data";
import { MapPin, Calendar, BriefcaseBusiness } from "lucide-react";

interface HireCardProps {
  listing: HireListing;
}

const HireCard = ({ listing }: HireCardProps) => {
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
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const handleCardClick = () => {
    window.location.href = `/job-detail?id=${listing.id}`;
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      whileHover={{ y: -2 }}
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-16 md:h-16 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <img 
              src={listing.logo} 
              alt={listing.company} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {listing.title}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <BriefcaseBusiness className="h-4 w-4 mr-1" /> 
                  <span className="text-sm">{listing.company}</span>
                </div>
              </div>
              
              <div className="flex items-center mt-2 md:mt-0">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(listing.status)}`}>
                  {listing.status === 'confidential' ? 'Confidential' : 
                   listing.status === 'interviewing' ? 'Interviewing' : 
                   listing.status === 'hired' ? 'Position Filled' : 'Open'}
                </span>
                {listing.remote && (
                  <span className="ml-2 text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 px-2 py-1 rounded-full font-medium">
                    Remote
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{listing.location}</span>
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4 mr-1" />
              <span>Posted {formatDate(listing.postedAt)}</span>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
              {listing.description}
            </p>
            
            {listing.requirements && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {listing.requirements.slice(0, 2).map((req, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      {req}
                    </li>
                  ))}
                  {listing.requirements.length > 2 && (
                    <li className="text-sm text-gray-500 dark:text-gray-500">
                      +{listing.requirements.length - 2} more
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {listing.salary && (
                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {listing.salary}
                </div>
              )}
              
              <motion.button 
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition btn-hover-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/job-detail?id=${listing.id}`;
                }}
              >
                Apply Now
              </motion.button>
              
              <motion.button 
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/job-detail?id=${listing.id}`;
                }}
              >
                View Details
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HireCard;
