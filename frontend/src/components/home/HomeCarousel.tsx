import { useEffect, useState } from 'react';
import * as carousel from '../../api-calls/Carousel';

export default function HomeCarousel() {
  const [elements, setElements] = useState<carousel.CarouselInterface[]>();
  const getCarousel = async () => {
    try {
      setElements(await carousel.getOne('home'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarousel();
  }, []);

  return <div></div>;
}
