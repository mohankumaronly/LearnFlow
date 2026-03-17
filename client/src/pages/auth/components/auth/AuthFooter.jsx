import { Link } from 'react-router-dom';

const AuthFooter = ({ 
  question, 
  linkText, 
  linkTo,
  linkColor = "blue"
}) => {
  return (
    <p className="text-center text-gray-600 dark:text-gray-400">
      {question}{" "}
      <Link to={linkTo} className={`text-${linkColor}-600 dark:text-${linkColor}-400 font-semibold hover:underline`}>
        {linkText}
      </Link>
    </p>
  );
};

export default AuthFooter;