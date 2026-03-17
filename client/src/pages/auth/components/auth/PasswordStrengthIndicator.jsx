import { usePasswordStrength } from "../../hooks/usePasswordStrength";

const PasswordStrengthIndicator = ({ password }) => {
  const { strengthColor, strengthText, strengthPercentage } = usePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${strengthColor} transition-all duration-300`}
            style={{ width: `${strengthPercentage}%` }}
          />
        </div>
        <span className="text-xs font-medium">{strengthText}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Use at least 8 characters with uppercase, lowercase, numbers & symbols
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;