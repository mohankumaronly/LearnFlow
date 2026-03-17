import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Code2, 
  Bot, 
  Users, 
  ChevronRight, 
  Star, 
  Download, 
  MessageCircle, 
  Award,
  BookOpen,
  Terminal,
  Linkedin,
  Youtube,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun
} from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

// Custom hook for smooth scrolling
const useSmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
};

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </motion.button>
  );
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-white dark:bg-primary-dark text-gray-900 dark:text-white transition-colors overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full bg-white/80 dark:bg-primary-dark/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="font-bold text-xl">LearnFlow</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'For Teachers', 'For Students'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Link 
                    to={`/#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signin" className="hidden md:block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Sign In
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup" className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                  Get Started
                </Link>
              </motion.div>
              
              {/* Mobile menu button */}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation with Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-primary-dark border-t border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-2 space-y-2">
                {['Features', 'For Teachers', 'For Students', 'Pricing'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={`/#${item.toLowerCase().replace(' ', '-')}`} 
                      className="block py-2 text-gray-600 dark:text-gray-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-2 space-y-2">
                  <Link to="/signin" className="block w-full px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg text-center">
                    Sign In
                  </Link>
                  <Link to="/signup" className="block w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center">
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">The Future of Learning is Here</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Learn, Practice, Connect
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block sm:inline"> All in One Place</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Transform your learning experience with video courses, coding practice, AI assistance, 
              and a vibrant community. Everything you need to succeed in one platform.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/demo')}
                className="px-8 py-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats with animation */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              {[
                { value: "10K+", label: "Active Students" },
                { value: "500+", label: "Video Courses" },
                { value: "50+", label: "Coding Languages" },
                { value: "24/7", label: "AI Support" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <motion.section 
        id="features"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Excel</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Powerful features designed for both teachers and students</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Youtube className="w-6 h-6 text-red-600 dark:text-red-400" />,
                bgColor: "bg-red-100 dark:bg-red-900/30",
                title: "Video Learning",
                description: "Watch high-quality courses with interactive features. Download, comment, and bookmark videos.",
                features: ["4K Video Streaming", "Download for Offline", "Interactive Comments"]
              },
              {
                icon: <Terminal className="w-6 h-6 text-green-600 dark:text-green-400" />,
                bgColor: "bg-green-100 dark:bg-green-900/30",
                title: "Coding Platform",
                description: "Practice coding in 50+ languages with our powerful online IDE and compiler.",
                features: ["50+ Languages", "Real-time Execution", "Code Collaboration"]
              },
              {
                icon: <Bot className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
                bgColor: "bg-purple-100 dark:bg-purple-900/30",
                title: "AI Learning Assistant",
                description: "Get instant help from our AI tutor. Ask questions, get code explanations, and more.",
                features: ["24/7 Availability", "Code Debugging", "Concept Explanations"]
              },
              {
                icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
                bgColor: "bg-blue-100 dark:bg-blue-900/30",
                title: "Learning Community",
                description: "Share your progress, connect with peers, and showcase achievements.",
                features: ["Progress Sharing", "Study Groups", "Achievement Badges"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {feature.features.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" /> {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* For Teachers Section */}
      <motion.section 
        id="for-teachers"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInLeft}>
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6"
              >
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">For Teachers & Admins</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">Create Engaging Learning Experiences</motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Powerful tools to create courses, assessments, and track student progress.
              </motion.p>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Video Course Creation",
                    description: "Upload and manage courses with Cloudinary integration"
                  },
                  {
                    title: "Test & Assessment Builder",
                    description: "Create MCQ tests and coding challenges with auto-grading"
                  },
                  {
                    title: "Analytics Dashboard",
                    description: "Track student performance and engagement metrics"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: 10 }}
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/for-teachers')}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Start Teaching
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
            
            <motion.div 
              variants={slideInRight}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Course Analytics</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Last 30 days</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { label: "Video Completion Rate", value: 78, color: "bg-blue-500" },
                      { label: "Test Pass Rate", value: 92, color: "bg-green-500" },
                      { label: "Active Students", value: 65, color: "bg-purple-500" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                      >
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.label}</span>
                          <span className="font-semibold">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.value}%` }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className={`${item.color} h-2 rounded-full`}
                          ></motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* For Students Section */}
      <motion.section 
        id="for-students"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={slideInLeft}
              className="order-2 lg:order-1"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-1">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.img 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      src="/api/placeholder/40/40" 
                      alt="Student" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Computer Science Student</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    {['Python', 'JavaScript', 'AI/ML'].map((skill, index) => (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.1 }}
                        className={`px-3 py-1 ${
                          index === 0 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                          index === 1 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                        } rounded-full text-sm`}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400">Learning Streak</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">15 days 🔥</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-between items-center mt-2"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400">Completed Courses</span>
                      <span className="font-bold">12</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex justify-between items-center mt-2"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400">Coding Challenges</span>
                      <span className="font-bold">89</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={slideInRight}
              className="order-1 lg:order-2"
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full mb-6"
              >
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">For Students</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">Your Personal Learning Journey</motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Everything you need to master new skills and track your progress.
              </motion.p>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Personalized Learning Path",
                    description: "AI-recommended courses based on your goals"
                  },
                  {
                    title: "Progress Tracking",
                    description: "Visual insights into your learning journey"
                  },
                  {
                    title: "Peer Collaboration",
                    description: "Connect with fellow learners and form study groups"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: 10 }}
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/for-students')}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Start Learning
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold mb-4"
          >
            Ready to Transform Your Learning?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-white/90 mb-8"
          >
            Join thousands of students and teachers already using LearnFlow
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/signup"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started Free
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/demo"
                className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Schedule a Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div variants={fadeInUp}>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="font-bold text-xl">LearnFlow</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Transform your learning experience with our all-in-one platform.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                {['Features', 'Pricing', 'For Teachers', 'For Students'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <Link to={`/#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <Link to={`/${item.toLowerCase()}`} className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                {['Privacy', 'Terms', 'Security'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <Link to={`/${item.toLowerCase()}`} className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            variants={fadeInUp}
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm"
          >
            <p>&copy; 2024 LearnFlow. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;