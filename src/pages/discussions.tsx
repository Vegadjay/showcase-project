import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projectsData } from "../lib/data";
import { Filter, MessageCircle, ThumbsUp, Users, Send } from "lucide-react";
import { GlowSearchInput } from "../components/ui/glow-input";

const Discussions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [discussions, setDiscussions] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [activeDiscussion, setActiveDiscussion] = useState(null);
  
  // Card background colors array with red theme
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
  
  // Load discussions and liked status from localStorage on initial load
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("discussionLikes") || "{}");
    
    // Generate discussions from project comments
    const generatedDiscussions = projectsData
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
          replies: comment.replies ? comment.replies : [],
          isLiked: savedLikes[`${project.id}-${comment.id}`] === true,
          color: getRandomCardColor(), // Using our new function for consistent colors
        }))
      )
      .sort((a, b) => sortDiscussions(a, b, sortOrder));
    
    setDiscussions(generatedDiscussions);
  }, [sortOrder]);
  
  // Watch sortOrder changes to resort discussions
  useEffect(() => {
    setDiscussions(prev => 
      [...prev].sort((a, b) => sortDiscussions(a, b, sortOrder))
    );
  }, [sortOrder]);
  
  // Simple function to parse relative time strings for sorting
  function parseTimeAgo(timeAgo) {
    const number = parseInt(timeAgo.split(' ')[0]);
    if (timeAgo.includes('minute')) return number * 60 * 1000;
    if (timeAgo.includes('hour')) return number * 60 * 60 * 1000;
    if (timeAgo.includes('day')) return number * 24 * 60 * 60 * 1000;
    if (timeAgo.includes('week')) return number * 7 * 24 * 60 * 60 * 1000;
    if (timeAgo.includes('month')) return number * 30 * 24 * 60 * 60 * 1000;
    return 0;
  }
  
  // Sort discussions based on sortOrder
  function sortDiscussions(a, b, order) {
    if (order === "latest") {
      // Sort by date
      const aTime = parseTimeAgo(a.date);
      const bTime = parseTimeAgo(b.date);
      return aTime - bTime;
    } else {
      // Sort by likes
      return b.likes - a.likes;
    }
  }
  
  // Get random card color from our array for consistent styling
  function getRandomCardColor() {
    return cardColors[Math.floor(Math.random() * cardColors.length)];
  }
  
  // Toggle like status
  const handleLike = (discussionId) => {
    setDiscussions(prev => {
      const newDiscussions = prev.map(discussion => {
        if (discussion.id === discussionId) {
          const wasLiked = discussion.isLiked;
          return {
            ...discussion,
            likes: wasLiked ? discussion.likes - 1 : discussion.likes + 1,
            isLiked: !wasLiked
          };
        }
        return discussion;
      });
      
      // Save liked status to localStorage
      const savedLikes = JSON.parse(localStorage.getItem("discussionLikes") || "{}");
      const discussion = prev.find(d => d.id === discussionId);
      savedLikes[discussionId] = !discussion.isLiked;
      localStorage.setItem("discussionLikes", JSON.stringify(savedLikes));
      
      return newDiscussions;
    });
  };
  
  // Add new comment to a discussion
  const handleAddComment = (discussionId) => {
    if (!newComment.trim()) return;
    
    setDiscussions(prev => {
      return prev.map(discussion => {
        if (discussion.id === discussionId) {
          const newReply = {
            id: `reply-${Date.now()}`,
            author: {
              name: "You",
              avatar: "/images/avatar/default.jpg" // Default avatar
            },
            text: newComment,
            date: "Just now"
          };
          
          return {
            ...discussion,
            replies: [...discussion.replies, newReply]
          };
        }
        return discussion;
      });
    });
    
    setNewComment("");
    setActiveDiscussion(null);
  };
  
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
      className="min-h-screen bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23fee2e2%22%20fill-opacity%3D%220.8%22%20%2F%3E%3C%2Fsvg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23450a0a%22%20fill-opacity%3D%220.6%22%20%2F%3E%3C%2Fsvg%3E')]"
    >
      {/* Hero Section - Updated with red theme styling */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent mb-4">
              Discussions
            </h1>
            <p className="text-lg text-black dark:text-white">
              Join the conversation about projects, share your thoughts, and connect with other developers.
            </p>
          </motion.div>
          
          {/* Search and Filter */}
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
                    sortOrder === "latest" 
                      ? "bg-red-600 text-white dark:bg-red-700 dark:text-white shadow-md" 
                      : "bg-white text-red-700 border border-red-200 dark:bg-slate-800 dark:text-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30"
                  }`}
                  onClick={() => setSortOrder("latest")}
                >
                  <Filter className="h-4 w-4 mr-2" /> Latest
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg flex items-center transition ${
                    sortOrder === "popular" 
                      ? "bg-red-600 text-white dark:bg-red-700 dark:text-white shadow-md" 
                      : "bg-white text-red-700 border border-red-200 dark:bg-slate-800 dark:text-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30"
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
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {filteredDiscussions.length > 0 ? (
              <div className="space-y-6">
                {filteredDiscussions.map((discussion, index) => (
                  <motion.div 
                    key={discussion.id}
                    className={`bg-gradient-to-r ${discussion.color} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-red-100 dark:border-red-900`}
                    variants={discussionVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.1)" }}
                  >
                    <div className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                      <div className="flex">
                        <img 
                          src={discussion.author.avatar} 
                          alt={discussion.author.name}
                          className="w-10 h-10 rounded-full mr-4 border-2 border-red-200 dark:border-red-800 shadow-sm"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-black dark:text-white">
                                {discussion.author.name}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Commented on <span className="text-red-600 dark:text-red-400">{discussion.projectTitle}</span> · {discussion.date}
                              </p>
                            </div>
                            <div className="flex-shrink-0 h-12 w-12 rounded overflow-hidden border border-red-200 dark:border-red-900 shadow-sm">
                              <img 
                                src={discussion.projectImage} 
                                alt={discussion.projectTitle}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <p className="text-black dark:text-white mb-4">
                            {discussion.text}
                          </p>
                          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <button 
                              className={`flex items-center mr-4 hover:text-red-600 dark:hover:text-red-400 transition-colors ${
                                discussion.isLiked ? 'text-red-600 dark:text-red-400' : ''
                              }`}
                              onClick={() => handleLike(discussion.id)}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" fill={discussion.isLiked ? "currentColor" : "none"} /> 
                              {discussion.likes}
                            </button>
                            <button 
                              className="flex items-center hover:text-red-600 dark:hover:text-red-400 transition-colors"
                              onClick={() => setActiveDiscussion(activeDiscussion === discussion.id ? null : discussion.id)}
                            >
                              <MessageCircle className="h-4 w-4 mr-1" /> 
                              {discussion.replies.length}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Comments Section */}
                      {activeDiscussion === discussion.id && (
                        <div className="mt-6 pt-4 border-t border-red-100 dark:border-red-900/50">
                          {/* Existing Replies */}
                          {discussion.replies.length > 0 && (
                            <div className="space-y-4 mb-4">
                              <h4 className="text-sm font-medium text-black dark:text-white mb-2">
                                Replies ({discussion.replies.length})
                              </h4>
                              {discussion.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start pl-6 border-l-2 border-red-200 dark:border-red-800">
                                  <img 
                                    src={reply.author.avatar} 
                                    alt={reply.author.name}
                                    className="w-8 h-8 rounded-full mr-3 border border-red-200 dark:border-red-800"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                      <h5 className="text-sm font-medium text-black dark:text-white mr-2">
                                        {reply.author.name}
                                      </h5>
                                      <span className="text-xs text-slate-500 dark:text-slate-500">
                                        {reply.date}
                                      </span>
                                    </div>
                                    <p className="text-sm text-black dark:text-white">
                                      {reply.text}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Add Comment Form */}
                          <div className="flex items-center mt-4">
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              className="flex-1 py-2 px-4 rounded-lg border border-red-200 dark:border-red-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddComment(discussion.id);
                                }
                              }}
                            />
                            <button
                              className="ml-2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                              onClick={() => handleAddComment(discussion.id)}
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-900">
                <MessageCircle className="h-16 w-16 text-red-400 dark:text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">No discussions found</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Try adjusting your search or check back later for new discussions.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Discussions;