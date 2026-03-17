import { useState, useEffect } from 'react';

export const usePasswordStrength = (password) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let score = 0;
    if (!password) {
      setStrength(0);
      return;
    }
    
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    
    setStrength(score);
  }, [password]);

  const getStrengthColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 2) return "Weak";
    if (strength <= 4) return "Medium";
    return "Strong";
  };

  const getStrengthPercentage = () => (strength / 5) * 100;

  return {
    strength,
    strengthColor: getStrengthColor(),
    strengthText: getStrengthText(),
    strengthPercentage: getStrengthPercentage()
  };
};