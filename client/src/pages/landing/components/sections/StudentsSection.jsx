import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle, User } from "lucide-react";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "../../constants/animations";
import { studentFeatures } from "../../constants/features";
import AnimatedButton from "../ui/AnimatedButton";
import Mohan from "../../../../assets/images/Mohan.jpg";
import { useState } from "react";

const StudentsSection = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
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
                  {/* Perfect Circle Image Container */}
                  <div className="relative">
                    {!imageError ? (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/50 dark:ring-blue-400/50"
                      >
                        <img 
                          src={Mohan} 
                          alt="Mohan - Student" 
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-white dark:ring-gray-800"
                      >
                        <User className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Mohan</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Computer Science Student</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4 flex-wrap">
                  {['Python', 'JavaScript', 'AI/ML'].map((skill, index) => {
                    const colors = [
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    ];
                    return (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`px-3 py-1 ${colors[index]} rounded-full text-sm font-medium cursor-default`}
                      >
                        {skill}
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-between items-center group"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400">Learning Streak</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      15 days 
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 2 }}
                      >
                        🔥
                      </motion.span>
                    </span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400">Completed Courses</span>
                    <span className="font-bold text-gray-900 dark:text-white">12</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400">Coding Challenges</span>
                    <span className="font-bold text-gray-900 dark:text-white">89</span>
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
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Your Personal Learning Journey
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Everything you need to master new skills and track your progress.
            </motion.p>
            
            <div className="space-y-4">
              {studentFeatures.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="flex gap-4 group cursor-pointer"
                >
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <AnimatedButton
              onClick={() => navigate('/get-started')}
              className="mt-8"
            >
              Start Learning
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default StudentsSection;