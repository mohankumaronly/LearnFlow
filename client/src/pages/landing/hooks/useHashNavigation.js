import { useNavigate, useLocation } from 'react-router-dom';

export const useHashNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHashClick = (e, hash, closeMenu) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/${hash}`);
    }
    if (closeMenu) closeMenu();
  };

  return { handleHashClick };
};