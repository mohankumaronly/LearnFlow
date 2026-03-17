import { Link } from 'react-router-dom';

const RoleSwitch = ({ 
  question, 
  linkText, 
  linkTo,
  linkColor = "purple"
}) => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {question}{" "}
        <Link to={linkTo} className={`text-${linkColor}-600 dark:text-${linkColor}-400 font-semibold hover:underline`}>
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default RoleSwitch;