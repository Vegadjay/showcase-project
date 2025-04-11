import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPages = () => {
    let pages = [];
    
    if (totalPages <= 5) {
      // If there are 5 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Add ellipsis if needed
      if (currentPage > 3) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (currentPage < totalPages - 2) {
        pages.push(-2); // -2 represents ellipsis to differentiate from the first one
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="mt-10 flex justify-center">
      <nav className="flex items-center space-x-1">
        <motion.button 
          className={`px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          whileHover={currentPage > 1 ? { scale: 1.1 } : {}}
          whileTap={currentPage > 1 ? { scale: 0.9 } : {}}
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>
        
        {getPages().map((page, index) => {
          if (page < 0) {
            // Render ellipsis
            return <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-600 dark:text-gray-400">...</span>;
          }
          
          return (
            <motion.button 
              key={page}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentPage === page 
                  ? 'bg-red-500 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => onPageChange(page)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {page}
            </motion.button>
          );
        })}
        
        <motion.button 
          className={`px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          whileHover={currentPage < totalPages ? { scale: 1.1 } : {}}
          whileTap={currentPage < totalPages ? { scale: 0.9 } : {}}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </nav>
    </div>
  );
};

export default Pagination;
