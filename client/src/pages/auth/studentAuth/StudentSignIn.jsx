import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Github,
  Twitter,
  Chrome
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const StudentSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to student dashboard (you'll create this later)
      navigate("/student-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-primary-dark text-gray-900 dark:text-white transition-colors">
      {/* Simple Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-primary-dark/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-xl">LearnFlow</span>
            </Link>
            
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">Student Sign In</h2>
              </div>
              <p className="text-blue-100 text-sm">Welcome back! Continue your learning journey</p>
            </div>

            {/* Form */}
            <div className="p-8">
              {/* Social Login */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-medium">GitHub</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">Twitter</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Chrome className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium">Google</span>
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                        transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium">Password</label>
                    <Link to="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                        transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                    text-white rounded-xl font-semibold hover:opacity-90 
                    transition-opacity disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In as Student
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/student-signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    Sign up as Student
                  </Link>
                </p>
              </form>

              {/* Switch to Professor */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Are you a teacher?{" "}
                  <Link to="/professor-signin" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                    Sign in as Professor
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Preview */}
          <motion.div 
            variants={fadeInUp}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {[
              { label: "Video Courses", value: "500+" },
              { label: "Coding Languages", value: "50+" },
              { label: "AI Support", value: "24/7" }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{item.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;