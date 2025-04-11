import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ChevronRight, 
  Heart, 
  Code, 
  Users, 
  Award, 
  Book, 
  HelpCircle, 
  ArrowRight,
  Filter,
  Search
} from "lucide-react";
import { GlowSearchInput } from "../components/ui/glow-input";

const About = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("mission");

  // Team members data
  const teamMembers = [
    {
      name: "Jay Vegad",
      role: "Founder & Lead Developer",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100&h=100",
      bio: "Full stack developer with expertise in React and Node.js. Passionate about building tools for the developer community."
    },
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      bio: "Designer focused on creating intuitive user experiences. Previously worked at major tech companies designing developer tools."
    },
    {
      name: "David Lee",
      role: "Community Manager",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
      bio: "Dedicated to building a thriving developer community. Organizes events and ensures quality discussions."
    }
  ];

  // Mission points data
  const missionPoints = [
    {
      title: "Share Knowledge",
      description: "Showcase your projects to the world and document your learning journey, helping others learn from your experiences.",
      icon: <Code className="h-6 w-6 text-red-600 dark:text-red-400" />,
      color: "from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40"
    },
    {
      title: "Build Connections",
      description: "Connect with like-minded developers, find collaborators for your next big idea, and join a supportive community.",
      icon: <Users className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
      color: "from-rose-100 to-rose-200 dark:from-rose-900/40 dark:to-rose-800/40"
    },
    {
      title: "Get Recognition",
      description: "Receive feedback on your work, gain recognition from peers, and showcase your talents to potential employers.",
      icon: <Award className="h-6 w-6 text-red-600 dark:text-red-400" />,
      color: "from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40"
    },
    {
      title: "Inspire Others",
      description: "Be inspired by amazing projects and inspire others with your creativity, problem-solving abilities, and technical skills.",
      icon: <Heart className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
      color: "from-rose-100 to-rose-200 dark:from-rose-900/40 dark:to-rose-800/40"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "What is DevShowcase?",
      answer: "DevShowcase is a platform where developers can share their projects, get feedback from peers, and discover inspiring work from other developers. It's a community focused on growth, learning, and collaboration.",
      color: "from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40"
    },
    {
      question: "How do I upload a project?",
      answer: "Click on the 'Post Project' button in the navigation bar. Fill out the project details including title, description, technology stack, and upload at least 3 images. Make sure to include links to your live project and repository.",
      color: "from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40"
    },
    {
      question: "Is DevShowcase free to use?",
      answer: "Yes, DevShowcase is completely free for developers. We're passionate about supporting the developer community and providing a space for everyone to showcase their work.",
      color: "from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40"
    },
    {
      question: "Can I modify or delete my project after posting?",
      answer: "Yes, you can edit or remove your projects at any time through your profile dashboard. We believe in giving users full control over their content.",
      color: "from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40"
    },
    {
      question: "How can I get more visibility for my project?",
      answer: "Projects that receive higher engagement (comments, likes) tend to appear in our trending section. Additionally, you can share your project link on social media to attract more visitors.",
      color: "from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40"
    }
  ];

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
      className="min-h-screen bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23fee2e2%22%20fill-opacity%3D%220.8%22%20%2F%3E%3C%2Fsvg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23450a0a%22%20fill-opacity%3D%220.6%22%20%2F%3E%3C%2Fsvg%3E')]"
    >
      {/* Hero Section - Styled with Red Theme */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block p-2 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
              <Code className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent mb-4">
              About DevShowcase
            </h1>
            <p className="text-lg text-black dark:text-white">
              A platform built by developers, for developers, to showcase amazing projects and connect with the global developer community.
            </p>
          </motion.div>
          
          {/* Search component */}
          <div className="max-w-md mx-auto mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <GlowSearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  placeholder="Search about DevShowcase..."
                />
              </div>
              
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-3 rounded-lg flex items-center transition ${
                    filterCategory === "mission" 
                      ? "bg-red-600 text-white dark:bg-red-700 dark:text-white shadow-md" 
                      : "bg-white text-red-700 border border-red-200 dark:bg-slate-800 dark:text-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30"
                  }`}
                  onClick={() => setFilterCategory("mission")}
                >
                  <Filter className="h-4 w-4 mr-2" /> Mission
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg flex items-center transition ${
                    filterCategory === "team" 
                      ? "bg-red-600 text-white dark:bg-red-700 dark:text-white shadow-md" 
                      : "bg-white text-red-700 border border-red-200 dark:bg-slate-800 dark:text-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30"
                  }`}
                  onClick={() => setFilterCategory("team")}
                >
                  <Users className="h-4 w-4 mr-2" /> Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Pills */}
      <section className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-slate-500 dark:text-slate-400 self-center mr-1">
                <Filter className="h-4 w-4 inline mr-1" /> Section:
              </span>
              
              {/* Category Filters */}
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterCategory === "mission" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterCategory("mission")}
              >
                Our Mission
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterCategory === "team" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterCategory("team")}
              >
                Team
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterCategory === "faq" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterCategory("faq")}
              >
                FAQ
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterCategory === "legal" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setFilterCategory("legal")}
              >
                Legal
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Sections */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Mission Content */}
            {filterCategory === "mission" && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Our Mission</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    At DevShowcase, we believe in the power of showing your work. Our mission is to create a platform where developers of all experience levels can thrive.
                  </p>
                </div>
                
                {missionPoints.map((point, index) => (
                  <motion.div 
                    key={index}
                    className={`bg-gradient-to-r ${point.color} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-red-100 dark:border-red-900`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.1)" }}
                  >
                    <div className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                      <div className="flex items-start">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-4">
                          {point.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                            {point.title}
                          </h3>
                          <p className="text-black dark:text-white">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Team Content */}
            {filterCategory === "team" && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Meet Our Team</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Talented individuals working together to build the best platform for developers.
                  </p>
                </div>
                
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={index}
                    className={`bg-gradient-to-r ${index % 2 === 0 ? 
                      "from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40" : 
                      "from-rose-100 to-rose-200 dark:from-rose-900/40 dark:to-rose-800/40"
                    } rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-red-100 dark:border-red-900`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.1)" }}
                  >
                    <div className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                      <div className="flex">
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className="w-16 h-16 rounded-lg mr-4 border-2 border-red-200 dark:border-red-800 shadow-sm object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-black dark:text-white">
                                {member.name}
                              </h3>
                              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                                {member.role}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-black dark:text-white mb-4">
                            {member.bio}
                          </p>
                          
                          <motion.button 
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            Contact
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* FAQ Content */}
            {filterCategory === "faq" && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <HelpCircle className="h-8 w-8 text-red-600 dark:text-red-400 mr-3" />
                    <h2 className="text-2xl font-bold text-black dark:text-white">Frequently Asked Questions</h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Have questions? We've got answers to help you get started.
                  </p>
                </div>
                
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index}
                    className={`bg-gradient-to-r ${faq.color} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-red-100 dark:border-red-900`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.1)" }}
                  >
                    <div className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                      <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-black dark:text-white">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Legal Content */}
            {filterCategory === "legal" && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Legal Information</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Important information about using our platform.
                  </p>
                </div>
                
                <motion.div 
                  className="bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-red-100 dark:border-red-900"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.1)" }}
                >
                  <div className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                      Terms of Service
                    </h3>
                    <div className="w-12 h-1 bg-red-500 mb-4"></div>
                    <p className="text-black dark:text-white mb-4">
                      By using DevShowcase, you agree to these terms and conditions. We reserve the right to modify them at any time, so please review them frequently.
                    </p>
                    <p className="text-black dark:text-white">
                      All projects and contributions shared on the platform should comply with our community guidelines. Any violation may result in content removal or account suspension.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-r from-rose-100 to-rose-200 dark:from-rose-900/40 dark:to-rose-800/40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-red-100 dark:border-red-900"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.05 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.1)" }}
                >
                  <div className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                      Privacy Policy
                    </h3>
                    <div className="w-12 h-1 bg-red-500 mb-4"></div>
                    <p className="text-black dark:text-white mb-4">
                      We respect your privacy and are committed to protecting your personal data. We collect minimal information needed to provide our services.
                    </p>
                    <p className="text-black dark:text-white">
                      We use cookies to enhance your experience and may collect anonymous usage statistics to improve our platform. You can adjust your cookie settings at any time.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
            
            {/* No results state */}
            {filterCategory !== "mission" && 
             filterCategory !== "team" && 
             filterCategory !== "faq" && 
             filterCategory !== "legal" && (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-900">
                <HelpCircle className="h-16 w-16 text-red-400 dark:text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">No content found</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We couldn't find that section. Please try a different filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-6 py-12 md:px-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to showcase your work?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join our community today and start sharing your amazing projects with developers around the world.
              </p>
              <motion.button 
                className="px-8 py-3 bg-white text-red-600 rounded-lg font-medium shadow-md flex items-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;