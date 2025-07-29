import { useState } from 'react';
import { screenSizes } from '../../utils';
import LargeHeader from './LargeHeader';
import SmallHeader from './SmallHeader';

export default function Header() {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= screenSizes.lg);
  const [isScrolled, setIsScrolled] = useState(false);

  setInterval(() => {
    setIsLarge(window.innerWidth >= screenSizes.lg);
    setIsScrolled(window.scrollY >= 50);
  }, 1000);
  return isLarge ? (
    <LargeHeader isScrolled={isScrolled} />
  ) : (
    <SmallHeader isScrolled={isScrolled} />
  );
}
