import { motion } from "framer-motion";
import { fadeInUp } from "../constants/animations";
import { trustedInstitutions } from "../constants/roles";

const TrustBadges = () => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="border-t border-gray-200 dark:border-gray-800 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          Trusted by leading educational institutions
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
          {trustedInstitutions.map((uni) => (
            <span key={uni} className="text-lg font-semibold text-gray-400 dark:text-gray-600">
              {uni}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrustBadges;