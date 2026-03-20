import { motion } from "framer-motion";
import { GraduationCap, Zap, Clock } from "lucide-react";
import { fadeInUp, staggerContainer } from "../constants/animations";
import { 
  studentFeatures, 
  studentLearningPath, 
  studentSuccessStories,
  studentStats 
} from "../constants/roles";
import FeatureList from "../ui/FeatureList";
import StepTimeline from "../ui/StepTimeline";
import SuccessStory from "./SuccessStory";
import ActionButtons from "./ActionButtons";

const StudentDetails = ({ onContinue, onSignIn, onBack }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-12 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Student Journey</h2>
            <p className="text-blue-100">Start your learning adventure today</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              What you'll get
            </h3>
            <FeatureList features={studentFeatures} />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Your learning path
            </h3>
            <StepTimeline steps={studentLearningPath} color="blue" />
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
          <h3 className="text-xl font-semibold mb-4">Student Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {studentSuccessStories.map((story, idx) => (
              <SuccessStory key={idx} story={story} color="green" />
            ))}
          </div>
        </motion.div>

        <ActionButtons
          role="student"
          onContinue={onContinue}
          onSignIn={onSignIn}
        />
      </div>
    </motion.div>
  );
};

export default StudentDetails;