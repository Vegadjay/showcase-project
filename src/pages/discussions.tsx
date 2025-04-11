import { useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "../lib/data";
import { Search, MessageCircle, ThumbsUp, Users, Filter } from "lucide-react";

const Discussions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "popular">("latest");
  
  // Generate discussions from project comments
  const discussions = projectsData
    .flatMap(project => 
      project.comments.map(comment => ({
        id: `${project.id}-${comment.id}`,
        projectId: project.id,
        projectTitle: project.title,
        projectImage: project.imageUrls[0],
        author: comment.author,
        text: comment.text,
        date: comment.date,
        likes: Math.floor(Math.random() * 50), // Mock data for likes
        replies: comment.replies ? comment.replies.length : 0
      }))
    )
    .sort((a, b) => {
      if (sortOrder === "latest") {
        // Sort by date (assuming dates like "2 days ago", "1 week ago")
        const aTime = parseTimeAgo(a.date);
        const bTime = parseTimeAgo(b.date);
        return aTime - bTime;
      } else {
        // Sort by likes
        return b.likes - a.likes;
      }
    });
  
  // Simple function to parse relative time strings for sorting
  function parseTimeAgo(timeAgo: string): number {
    const number = parseInt(timeAgo.split(' ')[0]);
    if (timeAgo.includes('minute')) return number * 60 * 1000;
    if (timeAgo.includes('hour')) return number * 60 * 60 * 1000;
    if (timeAgo.includes('day')) return number * 24 * 60 * 60 * 1000;
    if (timeAgo.includes('week')) return number * 7 * 24 * 60 * 60 * 1000;
    if (timeAgo.includes('month')) return number * 30 * 24 * 60 * 60 * 1000;
    return 0;
  }
  
  // Filter discussions based on search query
  const filteredDiscussions = discussions.filter(discussion =>
    discussion.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const discussionVariants = {
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
              Discussions
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Join the conversation about projects, share your thoughts, and connect with other developers.
            </p>
          </motion.div>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Search discussions..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-400 dark:placeholder-slate-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
              </div>
              
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    sortOrder === "latest" 
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                  onClick={() => setSortOrder("latest")}
                >
                  <Filter className="h-4 w-4 mr-2" /> Latest
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    sortOrder === "popular" 
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                  onClick={() => setSortOrder("popular")}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" /> Popular
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Discussions List */}
      <section className="py-8 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {filteredDiscussions.length > 0 ? (
              <div className="space-y-6">
                {filteredDiscussions.map((discussion, index) => (
                  <motion.div 
                    key={discussion.id}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700"
                    variants={discussionVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex">
                      <img 
                        src={discussion.author.avatar} 
                        alt={discussion.author.name}
                        className="w-10 h-10 rounded-full mr-4 border border-slate-200 dark:border-slate-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                              {discussion.author.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Commented on <span className="text-red-500">{discussion.projectTitle}</span> · {discussion.date}
                            </p>
                          </div>
                          <div className="flex-shrink-0 h-12 w-12 rounded overflow-hidden border border-slate-200 dark:border-slate-700">
                            <img 
                              src={discussion.projectImage} 
                              alt={discussion.projectTitle}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 mb-4">
                          {discussion.text}
                        </p>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <button className="flex items-center mr-4 hover:text-red-500 transition-colors">
                            <ThumbsUp className="h-4 w-4 mr-1" /> {discussion.likes}
                          </button>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" /> {discussion.replies}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <MessageCircle className="h-16 w-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-2">No discussions found</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Try adjusting your search or check back later for new discussions.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Start a Discussion CTA */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Want to start a discussion?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Head over to a project page and leave a comment to start engaging with the community.
            </p>
            <motion.button 
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium rounded-lg shadow hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Projects
            </motion.button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Discussions;