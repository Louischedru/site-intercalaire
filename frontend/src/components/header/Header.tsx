import { useEffect, useState } from 'react';
import { screenSizes } from '../../utils';
import LargeHeader from './LargeHeader';
import SmallHeader from './SmallHeader';
import { useLocation } from 'react-router-dom';
import * as simpleImageCalls from '../../api-calls/SimpleImage';

export default function Header() {
  const location = useLocation();

  const [isLarge, setIsLarge] = useState(window.innerWidth >= screenSizes.lg);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHome, setIsHome] = useState(location.pathname == '/');
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const imageKey =
      location.pathname == '/nos-projets'
        ? 'page-headers.nos-projets'
        : location.pathname == '/captations'
          ? 'page-headers.captations'
          : location.pathname == 'a-venir'
            ? 'page-headers.a-venir'
            : null;

    const getImage = async () => {
      try {
        if (!imageKey) throw Error('No image key selected');
        const response = await simpleImageCalls.getOne(imageKey || '');
        setBgImage(response?.url);
      } catch (error) {
        console.log(error);
      }
    };

    if (imageKey) getImage();
    else setBgImage(null);

    setIsHome(location.pathname == '/');
  }, [location]);

  useEffect(() => {
    if (!bgImage) return;
    document.body.style.backgroundImage = bgImage
      ? `url("${bgImage}")`
      : 'none';
    console.log(document.body.style.backgroundImage, bgImage);
  }, [bgImage]);

  setInterval(() => {
    setIsLarge(window.innerWidth >= screenSizes.lg);
    setIsScrolled(window.scrollY >= 50);
  }, 1000);

  return isLarge ? (
    <LargeHeader isScrolled={isScrolled} isHome={isHome} />
  ) : (
    <SmallHeader isScrolled={isScrolled} isHome={isHome} />
  );
}
