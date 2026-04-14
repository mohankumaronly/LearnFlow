import SimpleNav from "./components/layout/SimpleNav";
import RoleSelectionCards from "./components/role-selection/RoleSelectionCards";
import RoleDetails from "./components/role-selection/RoleDetails";
import TrustBadges from "./components/role-selection/TrustBadges";
import { useRoleSelection } from "./hooks/useRoleSelection";
import { useDarkMode } from "./hooks/useDarkMode";
import { GraduationCap, School } from "lucide-react";
import { 
  studentFeatures, 
  professorFeatures, 
  studentStats, 
  professorStats 
} from "./components/constants/roles";

const roles = [
  {
    id: "student",
    title: "Student",
    icon: GraduationCap,
    lightBg: "bg-blue-50",
    darkBg: "dark:bg-blue-900/20",
    description: "Start your learning journey with personalized courses and AI assistance",
    features: studentFeatures,
    stats: studentStats
  },
  {
    id: "professor",
    title: "Professor / Teacher",
    icon: School,
    lightBg: "bg-purple-50",
    darkBg: "dark:bg-purple-900/20",
    description: "Create engaging courses and track student progress with powerful tools",
    features: professorFeatures,
    stats: professorStats
  }
];

const RoleSelection = () => {
  const {
    selectedRole,
    showDetails,
    handleRoleSelect,
    handleContinue,
    handleBack,
    handleSignIn
  } = useRoleSelection();

  useDarkMode();

  return (
    <div className="min-h-screen bg-white dark:bg-primary-dark text-gray-900 dark:text-white transition-colors">
      <SimpleNav />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {!showDetails ? (
            <RoleSelectionCards
              roles={roles}
              selectedRole={selectedRole}
              onRoleSelect={handleRoleSelect}
            />
          ) : (
            <RoleDetails
              selectedRole={selectedRole}
              onBack={handleBack}
              onContinue={handleContinue}
              onSignIn={handleSignIn}
            />
          )}
        </div>
      </div>
      <TrustBadges />
    </div>
  );
};

export default RoleSelection;