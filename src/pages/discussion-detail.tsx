import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { projectsData } from "../lib/data";
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar, 
  User,
  Send
} from "lucide-react";
import { 
  isDiscussionLiked, 
  toggleDiscussionLike, 
  getCommentsByDiscussionId, 
  addDiscussionComment,
  getUserDiscussions
} from "../lib/localStorage";
import { useToast } from "@/hooks/use-toast";

const DiscussionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Gather all discussions from the system
  const discussionsFromProjects = projectsData.flatMap(project => 
    project.comments.map(comment => ({
      id: `${project.id}-${comment.id}`,
      projectId: project.id,
      projectTitle: project.title,
      projectImage: project.imageUrls[0],
      author: comment.author,
      text: comment.text,
      date: comment.date,
      likes: Math.floor(Math.random() * 50),
      replies: comment.replies ? comment.replies.length : 0
    }))
  );
  
  const userDiscussions = getUserDiscussions();
  const userDiscussionsMapped = userDiscussions.map(d => ({
    id: d.id,
    projectId: null,
    projectTitle: null,
    projectImage: null,
    author: d.author,
    text: d.text,
    title: d.title,
    date: d.createdAt,
    likes: d.likes,
    replies: d.replies
  }));
  
  const allDiscussions = [...discussionsFromProjects, ...userDiscussionsMapped];
  const discussion = allDiscussions.find(d => d.id === id);
  
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [discussionComments, setDiscussionComments] = useState<any[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  
  // Check if discussion exists
  useEffect(() => {
    if (!discussion) {
      toast({
        title: "Discussion not found",
        description: "The discussion you are looking for does not exist.",
        variant: "destructive"
      });
      navigate("/discussions");
      return;
    }
    
    // Check if discussion is liked
    setIsLiked(isDiscussionLiked(id));
    
    // Get comments from localStorage
    const comments = getCommentsByDiscussionId(id);
    setDiscussionComments(comments);
  }, [discussion, id]);
  
  const handleLikeToggle = () => {
    const newLikeState = toggleDiscussionLike(id);
    setIsLiked(newLikeState);
    
    // Animate heart
    const heartIcon = document.getElementById("heart-icon");
    if (heartIcon) {
      heartIcon.classList.add('scale-150');
      setTimeout(() => {
        heartIcon.classList.remove('scale-150');
      }, 300);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim() || !authorName.trim()) {
      toast({
        title: "Cannot submit comment",
        description: "Please provide both your name and a comment.",
        variant: "destructive"
      });
      return;
    }
    
    const newComment = addDiscussionComment({
      discussionId: id,
      text: commentText,
      author: authorName
    });
    
    setDiscussionComments([...discussionComments, newComment]);
    setCommentText("");
    
    toast({
      title: "Comment posted!",
      description: "Your comment has been added to the discussion."
    });
  };
  
  if (!discussion) return null;

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  const childAnimations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="pt-6 pb-20"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          className="flex items-center mb-8 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          onClick={() => navigate("/discussions")}
          variants={childAnimations}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discussions
        </motion.button>
        
        <div className="max-w-4xl mx-auto">
          {/* Discussion Header */}
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8"
            variants={childAnimations}
          >
            <div className="flex items-start">
              <img 
                src={discussion.author.avatar} 
                alt={discussion.author.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {(discussion as any).title || `Comment on ${discussion.projectTitle}`}
                  </h1>
                  <div className="flex space-x-2">
                    <motion.button 
                      className={`p-2 rounded-full ${isLiked ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
                      onClick={handleLikeToggle}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart id="heart-icon" className="h-5 w-5 transition-transform" />
                    </motion.button>
                    <motion.button 
                      className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{discussion.author.name}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(discussion.date).toLocaleDateString()}</span>
                  {discussion.projectTitle && (
                    <>
                      <span className="mx-2">•</span>
                      <span>
                        On <span 
                          className="text-red-500 hover:underline cursor-pointer"
                          onClick={() => navigate(`/project/${discussion.projectId}`)}
                        >
                          {discussion.projectTitle}
                        </span>
                      </span>
                    </>
                  )}
                </div>
                
                <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 mb-4">
                  <p>{discussion.text}</p>
                </div>
                
                <div className="flex items-center pt-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center mr-4">
                    <Heart className="h-4 w-4 mr-1" />
                    <span>{discussion.likes} likes</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{discussion.replies + discussionComments.length} responses</span>
                  </div>
                </div>
              </div>
              
              {discussion.projectImage && (
                <div className="ml-4 flex-shrink-0 h-16 w-16 rounded overflow-hidden">
                  <img 
                    src={discussion.projectImage} 
                    alt={discussion.projectTitle || "Project"} 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Comments Section */}
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
            variants={childAnimations}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Responses ({discussion.replies + discussionComments.length})
            </h2>
            
            {/* Comment Form */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Add a Response
              </h3>
              <form onSubmit={handleSubmitComment}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter your name"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Response
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Share your thoughts about this discussion..."
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Post Response
                  </motion.button>
                </div>
              </form>
            </div>
            
            {/* Comments List */}
            <div className="space-y-6">
              {discussionComments.map((comment, idx) => (
                <motion.div 
                  key={comment.id}
                  className="flex space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt={comment.author} 
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                    </div>
                    <div className="mt-2 ml-2 flex space-x-4 text-xs">
                      <button className="text-gray-500 dark:text-gray-400 hover:text-red-500 flex items-center">
                        <Heart className="h-3 w-3 mr-1" /> Like
                      </button>
                      <button className="text-gray-500 dark:text-gray-400 hover:text-red-500 flex items-center">
                        <MessageCircle className="h-3 w-3 mr-1" /> Reply
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {discussion.replies > 0 && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    This discussion has {discussion.replies} more {discussion.replies === 1 ? 'reply' : 'replies'} from the original source.
                  </p>
                </div>
              )}
              
              {discussion.replies === 0 && discussionComments.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No responses yet. Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Related Discussions */}
          <motion.div 
            className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
            variants={childAnimations}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Related Discussions
            </h2>
            
            <div className="space-y-4">
              {allDiscussions
                .filter(d => d.id !== id)
                .filter(d => discussion.projectId ? d.projectId === discussion.projectId : true)
                .slice(0, 3)
                .map((disc, idx) => (
                  <motion.div 
                    key={disc.id}
                    className="flex space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition cursor-pointer"
                    onClick={() => navigate(`/discussion/${disc.id}`)}
                    whileHover={{ x: 5 }}
                  >
                    <img 
                      src={disc.author.avatar} 
                      alt={disc.author.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {(disc as any).title || `Comment on ${disc.projectTitle}`}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {disc.text}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>{disc.author.name}</span>
                        <span className="mx-1">•</span>
                        <span>{new Date(disc.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              
              {allDiscussions.filter(d => d.id !== id).length === 0 && (
                <p className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                  No related discussions found.
                </p>
              )}
            </div>
            
            <div className="mt-6 text-center">
              <motion.button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/discussions")}
              >
                View All Discussions
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiscussionDetail;