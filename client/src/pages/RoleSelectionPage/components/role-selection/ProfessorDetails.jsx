import { motion } from "framer-motion";
import { School, Zap, Clock } from "lucide-react";
import { fadeInUp, staggerContainer } from "../constants/animations";
import { 
  professorFeatures, 
  professorGettingStarted, 
  professorSuccessStories 
} from "../constants/roles";
import FeatureList from "../ui/FeatureList";
import StepTimeline from "../ui/StepTimeline";
import SuccessStory from "./SuccessStory";
import ActionButtons from "./ActionButtons";

const ProfessorDetails = ({ onContinue, onSignIn, onBack }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-12 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
            <School className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Professor Journey</h2>
            <p className="text-purple-100">Empower the next generation of learners</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              Teaching tools
            </h3>
            <FeatureList features={professorFeatures} />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              Getting started
            </h3>
            <StepTimeline steps={professorGettingStarted} color="purple" />
          </div>
        </motion.div>

        {/* Teacher Success */}
        <motion.div variants={fadeInUp} className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
          <h3 className="text-xl font-semibold mb-4">Successful Educators</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {professorSuccessStories.map((story, idx) => (
              <SuccessStory key={idx} story={story} color="purple" />
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <ActionButtons
          role="professor"
          onContinue={onContinue}
          onSignIn={onSignIn}
          gradient="from-purple-500 to-pink-500"
        />
      </div>
    </motion.div>
  );
};

export default ProfessorDetails;