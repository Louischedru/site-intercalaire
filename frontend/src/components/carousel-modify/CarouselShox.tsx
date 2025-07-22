import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CarouselInterface } from '../../api-calls/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

let key = 0;

interface Props {
  images: CarouselInterface[];
  imageId: number;
  setImageId: (n: number) => void;
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
        <button
          className={`p-3 h-full w-full ${props.imageId == -1 && 'border-4 bg-ip-blue'}`}
          onClick={() => props.setImageId(-1)}
        >
          <div className="w-full h-full text-5xl bg-ip-blue text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </button>
        {props.images.map(i => {
          key++;
          return (
            <DeletableImage
              image={i}
              key={`carouselshow-${key}`}
              isSelected={i.id == props.imageId}
              setImageId={props.setImageId}
            />
          );
        })}
      </Carousel>
    </div>
  );
}

function DeletableImage({
  image,
  setImageId,
  isSelected,
}: {
  image: CarouselInterface;
  isSelected: boolean;
  setImageId: (n: number) => void;
}) {
  return (
    <div
      className={`p-3 hover:bg-gray-light flex justify-center items-center ${isSelected && 'border-4 bg-ip-blue'}`}
      onClick={() => setImageId(image.id)}
    >
      <img src={image.image} alt="" className="" />
    </div>
  );
}
