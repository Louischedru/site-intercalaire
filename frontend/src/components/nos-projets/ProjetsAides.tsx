import Carousel from 'react-multi-carousel';
import Title from '../Title';
import * as carouselCalls from '../../api-calls/Carousel';
import { useEffect, useState } from 'react';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

export default function ProjetsAIdes() {
  const [elements, setELements] = useState<
    carouselCalls.CarouselInterface[] | null
  >(null);

  useEffect(() => {
    const getElements = async () => {
      try {
        const response = await carouselCalls.getOne('nosprojets');
        setELements(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getElements();
  }, []);

  return (
    <div className="mt-10 p-5">
      <Title name="Projets aidés" />
      {elements && (
        <Carousel responsive={responsive}>
          {elements.map(e => {
            return (
              <a href={e.url}>
                <img src={e.image} alt={e.alt} />
              </a>
            );
          })}
        </Carousel>
      )}{' '}
    </div>
  );
}
