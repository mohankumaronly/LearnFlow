import { useState } from 'react';

export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return { isMenuOpen, setIsMenuOpen, closeMenu, toggleMenu };
};