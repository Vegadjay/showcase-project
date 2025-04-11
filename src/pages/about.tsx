import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, Heart, Code, Users, Award, Book, HelpCircle } from "lucide-react";

const About = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

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

  const faqs = [
    {
      question: "What is DevShowcase?",
      answer: "DevShowcase is a platform where developers can share their projects, get feedback from peers, and discover inspiring work from other developers. It's a community focused on growth, learning, and collaboration."
    },
    {
      question: "How do I upload a project?",
      answer: "Click on the 'Post Project' button in the navigation bar. Fill out the project details including title, description, technology stack, and upload at least 3 images. Make sure to include links to your live project and repository."
    },
    {
      question: "Is DevShowcase free to use?",
      answer: "Yes, DevShowcase is completely free for developers. We're passionate about supporting the developer community and providing a space for everyone to showcase their work."
    },
    {
      question: "Can I modify or delete my project after posting?",
      answer: "Yes, you can edit or remove your projects at any time through your profile dashboard. We believe in giving users full control over their content."
    },
    {
      question: "How can I get more visibility for my project?",
      answer: "Projects that receive higher engagement (comments, likes) tend to appear in our trending section. Additionally, you can share your project link on social media to attract more visitors."
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Hero section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About DevShowcase
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A platform built by developers, for developers, to showcase amazing projects and connect with the global developer community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/projects">
                <a className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-medium hover:opacity-90 transition">
                  Explore Projects <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800"
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <div className="h-1 w-20 bg-red-500 mx-auto"></div>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              At DevShowcase, we believe in the power of showing your work. Our mission is to create a platform where developers of all experience levels can:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-4">
                    <Code className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Share Knowledge</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Showcase your projects to the world and document your learning journey, helping others learn from your experiences.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-4">
                    <Users className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Build Connections</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with like-minded developers, find collaborators for your next big idea, and join a supportive community.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-4">
                    <Award className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Get Recognition</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Receive feedback on your work, gain recognition from peers, and showcase your talents to potential employers.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-4">
                    <Heart className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Inspire Others</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Be inspired by amazing projects and inspire others with your creativity, problem-solving abilities, and technical skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Team section */}
      <motion.section 
        className="py-16 bg-white dark:bg-gray-900"
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
              <div className="h-1 w-20 bg-red-500 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 mx-auto w-24 h-24 rounded-full overflow-hidden">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-red-500 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ section */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800" 
        id="faq"
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              <HelpCircle className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to action */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-red-500 to-red-700 text-white"
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to showcase your work?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join our community today and start sharing your amazing projects with developers around the world.
          </p>
          <motion.button 
            className="px-8 py-3 bg-white text-red-600 rounded-full font-bold shadow-lg hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.section>

      {/* Terms and Privacy */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            <div id="terms">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                By using DevShowcase, you agree to these terms and conditions. We reserve the right to modify them at any time, so please review them frequently.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All projects and contributions shared on the platform should comply with our community guidelines. Any violation may result in content removal or account suspension.
              </p>
            </div>
            <div id="privacy">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                We respect your privacy and are committed to protecting your personal data. We collect minimal information needed to provide our services.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We use cookies to enhance your experience and may collect anonymous usage statistics to improve our platform. You can adjust your cookie settings at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
