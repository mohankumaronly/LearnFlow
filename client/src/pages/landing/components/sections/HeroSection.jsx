import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Play } from "lucide-react";
import { fadeInUp, staggerContainer } from "../../constants/animations";
import { stats } from "../../constants/features";
import AnimatedButton from "../ui/AnimatedButton";
import StatCard from "../ui/StatCard";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
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
            <AnimatedButton
              onClick={() => navigate('/get-started')}
              icon={ArrowRight}
            >
              Start Learning Free
            </AnimatedButton>
            <AnimatedButton
              onClick={() => navigate('/demo')}
              variant="secondary"
              icon={Play}
            >
              Watch Demo
            </AnimatedButton>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;