import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle } from "lucide-react";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "../../constants/animations";
import { studentFeatures } from "../../constants/features";
import AnimatedButton from "../ui/AnimatedButton";

const StudentsSection = () => {
  const navigate = useNavigate();

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
                  {['Python', 'JavaScript', 'AI/ML'].map((skill, index) => {
                    const colors = [
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    ];
                    return (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.1 }}
                        className={`px-3 py-1 ${colors[index]} rounded-full text-sm`}
                      >
                        {skill}
                      </motion.div>
                    );
                  })}
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
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
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