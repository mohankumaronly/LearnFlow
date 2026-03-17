import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setShowDetails(true);
  };

  const handleContinue = () => {
    if (selectedRole === "student") {
      navigate("/student-signup");
    } else if (selectedRole === "professor") {
      navigate("/professor-signup");
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
    setShowDetails(false);
  };

  const handleSignIn = (role) => {
    navigate(`/${role}-signin`);
  };

  return {
    selectedRole,
    showDetails,
    handleRoleSelect,
    handleContinue,
    handleBack,
    handleSignIn
  };
};