import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { fadeInUp, staggerContainer } from "../../constants/animations";
import AnimatedButton from "../ui/AnimatedButton";

const CTASection = () => {
  return (
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
          <Link to="/get-started">
            <AnimatedButton variant="outline">
              Get Started Free
            </AnimatedButton>
          </Link>
          <Link to="/demo">
            <AnimatedButton variant="outline">
              Schedule a Demo
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;