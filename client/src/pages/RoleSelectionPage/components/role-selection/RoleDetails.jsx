import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import StudentDetails from "./StudentDetails";
import ProfessorDetails from "./ProfessorDetails";
import { ROLES } from "../constants/roles";

const RoleDetails = ({ selectedRole, onBack, onContinue, onSignIn }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [selectedRole]); 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 
          hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to roles
      </button>

      {selectedRole === ROLES.STUDENT ? (
        <StudentDetails
          onContinue={onContinue}
          onSignIn={() => onSignIn(ROLES.STUDENT)}
          onBack={onBack}
        />
      ) : (
        <ProfessorDetails
          onContinue={onContinue}
          onSignIn={() => onSignIn(ROLES.PROFESSOR)}
          onBack={onBack}
        />
      )}
    </motion.div>
  );
};

export default RoleDetails;