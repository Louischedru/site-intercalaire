import { useState } from 'react';
import { screenSizes } from '../../utils';
import LargeHeader from './LargeHeader';
import SmallHeader from './SmallHeader';

export default function Header() {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= screenSizes.lg);
  setInterval(() => {
    setIsLarge(window.innerWidth >= screenSizes.lg);
  }, 2000);
  return isLarge ? <LargeHeader /> : <SmallHeader />;
}
