import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Award, CheckCircle, BookOpen } from "lucide-react";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "../../constants/animations";
import { teacherFeatures, teacherAnalytics } from "../../constants/features";
import AnimatedButton from "../ui/AnimatedButton";

const TeachersSection = () => {
  const navigate = useNavigate();

  return (
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
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              Create Engaging Learning Experiences
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Powerful tools to create courses, assessments, and track student progress.
            </motion.p>
            
            <div className="space-y-4">
              {teacherFeatures.map((item, index) => (
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
              Start Teaching
            </AnimatedButton>
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
                  {teacherAnalytics.map((item, index) => (
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
                        />
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
  );
};

export default TeachersSection;