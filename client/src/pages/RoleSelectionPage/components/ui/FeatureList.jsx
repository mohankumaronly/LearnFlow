import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { fadeInUp } from "../constants/animations";

const FeatureList = ({ features, icon: Icon }) => {
  return (
    <ul className="space-y-3">
      {features.map((feature, idx) => {
        const FeatureIcon = feature.icon || Icon;
        return (
          <motion.li
            key={idx}
            variants={fadeInUp}
            className="flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              {FeatureIcon && <FeatureIcon className="w-4 h-4 text-gray-500" />}
              {feature.text || feature}
            </span>
          </motion.li>
        );
      })}
    </ul>
  );
};

export default FeatureList;