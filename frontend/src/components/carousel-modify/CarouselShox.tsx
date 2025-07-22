import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CarouselInterface } from '../../api-calls/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

let key = 0;

interface Props {
  images: CarouselInterface[];
  getImages: () => void;
}
export default function CarouselShow(props: Props) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Carousel responsive={responsive}>
        <button className="w-full h-full text-5xl bg-ip-blue text-white">
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {props.images.map(i => {
          key++;
          return (
            <DeletableImage
              image={i}
              key={`carouselshow-${key}`}
              getImages={props.getImages}
            />
          );
        })}
      </Carousel>
    </div>
  );
}

function DeletableImage({
  image,
  getImages,
}: {
  image: CarouselInterface;
  getImages: () => void;
}) {
  const deleteImage = async () => {
    getImages();
  };

  return (
    <div className="relative p-3 hover:bg-gray-light flex justify-center items-center">
      <img src={image.image} alt="" className="" />
    </div>
  );
}
