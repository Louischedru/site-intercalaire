import { useEffect, useState } from 'react';
import * as carousel from '../../api-calls/Carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { loginTest, screenSizes } from '../../utils';
import { Link } from 'react-router-dom';

let key = 0;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function HomeCarousel() {
  const [elements, setElements] = useState<carousel.CarouselInterface[]>();
  const [isLogin, setIsLogin] = useState(false);

  const getCarousel = async () => {
    try {
      setElements(await carousel.getOne('home'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarousel();
    loginTest(setIsLogin);
  }, []);

  return (
    <div>
      {elements && (
        <Carousel
          responsive={responsive}
          className="z-0"
          infinite
          autoPlay
          autoPlaySpeed={10000}
        >
          {elements?.map(e => {
            key++;

            return <Slide image={e} key={`home-carousel-slide-${key}`} />;
          })}
        </Carousel>
      )}{' '}
      {isLogin && (
        <div className="w-full">
          <Link
            className="text-center w-full block font-semibold hover:underline p-3"
            to={'/admin/carousel'}
          >
            Modifier les diaporamas
          </Link>
        </div>
      )}
    </div>
  );
}

function Slide({ image }: { image: carousel.CarouselInterface }) {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= screenSizes.lg);
  setTimeout(() => {
    setIsLarge(window.innerWidth >= screenSizes.lg);
  }, 2000);

  return isLarge ? (
    <SlideLarge image={image} />
  ) : (
    <div className="h-screen bg-black relative">
      <img src={image.image} alt="" className="h-screen blur-xl" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full px-5 md:px-10">
        <div className="flex justify-center flex-col gap-5 md:gap-10">
          <div className="m-auto">
            <h1
              className="gobold text-2xl leading-snug p-3 inline-block text-center max-h-28 overflow-hidden md:text-5xl md:p-5 md:max-h-52"
              style={{
                color: image.textColor,
                backgroundColor: image.color,
              }}
            >
              {image.title}
            </h1>
          </div>{' '}
          <img
            src={image.image}
            alt={image.alt}
            className="block m-auto max-h-56 md:max-h-80"
          />
          {image.desc && image.desc.length > 0 && (
            <p className="bg-white leading-4 text-black p-2 max-h-32 md:max-h-48 md:leading-snug">
              {image.desc}
            </p>
          )}
          {image.url && image.url.length > 0 && (
            <div className="m-auto">
              <a
                href={image.url}
                className="bg-white p-1 hover:underline text-center inline-block m-auto"
              >
                En savoir plus
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SlideLarge({ image }: { image: carousel.CarouselInterface }) {
  return (
    <div className="w-screen aspect-video bg-black relative max-h-screen">
      <img
        src={image.image}
        alt=""
        className="w-screen aspect-video max-h-screen blur-xl"
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full px-24 xl:p-32">
        <div className="flex justify-center gap-5 items-center">
          <div className="w-1/2">
            <div className="m-auto">
              <h1
                className="gobold text-4xl leading-snug p-3 inline-block overflow-hidden mb-5"
                style={{
                  color: image.textColor,
                  backgroundColor: image.color,
                }}
              >
                {image.title}
              </h1>
            </div>
            {image.desc && image.desc.length > 0 && (
              <p className="bg-white text-black p-3 mb-5 max-h-52">
                {image.desc}
              </p>
            )}{' '}
            {image.url && image.url.length > 0 && (
              <div className="m-auto">
                <a
                  href={image.url}
                  className="bg-white p-1 hover:underline text-center inline-block m-auto"
                >
                  En savoir plus
                </a>
              </div>
            )}{' '}
          </div>
          <div className="w-1/2">
            <img
              src={image.image}
              alt={image.alt}
              className="w-full block m-auto max-h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
