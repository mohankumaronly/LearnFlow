import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordField = ({
  name,
  value,
  onChange,
  placeholder = "••••••••",
  label = "Password",
  showForgotPassword = false,
  forgotPasswordLink = "/forgot-password",
  forgotPasswordColor = "blue",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
        {showForgotPassword && (
          <a href={forgotPasswordLink} className={`text-sm text-${forgotPasswordColor}-600 dark:text-${forgotPasswordColor}-400 hover:underline`}>
            Forgot password?
          </a>
        )}
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            transition-all"
          placeholder={placeholder}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;