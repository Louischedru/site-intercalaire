import { Carousel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { fetchAPI, fetchAPIFormData, loginTest } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

let key = 0;

interface Props {
  carouselId: string;
}

export default function MyCarousel({ carouselId }: Props) {
  const [images, setImages] = useState<{ id: number; url: string }[]>([]);
  const [isLogin, setIsLogin] = useState(false);
  const [active, setActive] = useState(false);

  const getImages = async () => {
    const response = (await fetchAPI({
      route: 'carousel/' + carouselId,
      raw: true,
    })) as Response;
    const decoded = await response.json();
    console.log(decoded);
    setImages(decoded);
  };

  useEffect(() => {
    const getImages2 = async () => {
      const response = (await fetchAPI({
        route: 'carousel/' + carouselId,
        raw: true,
      })) as Response;
      const decoded = await response.json();
      console.log(decoded);
      setImages(decoded);
    };

    getImages2();
    loginTest(setIsLogin);
  }, [carouselId]);

  return (
    <>
      {isLogin && (
        <CarouselPopup
          carouselId={carouselId}
          active={active}
          setActive={setActive}
          foreignGetImages={getImages}
        />
      )}

      <div
        onClick={
          isLogin
            ? () => {
                setActive(true);
              }
            : () => {}
        }
      >
        <Carousel>
          {images.map(i => {
            key++;
            return (
              <Carousel.Item key={key} className="z-0">
                <div className="bg-black h-72 lg:h-96 p-3">
                  <img
                    src={i.url}
                    alt=""
                    className="max-h-full max-w-full m-auto  block"
                  />
                </div>
              </Carousel.Item>
            );
          })}
          {images.length == 0 && <p>No images</p>}
        </Carousel>{' '}
      </div>
    </>
  );
}

function CarouselPopup({
  carouselId,
  active,
  setActive,
  foreignGetImages,
}: {
  carouselId: string;
  active: boolean;
  setActive: (b: boolean) => void;
  foreignGetImages: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState<File>();
  const [images, setImages] = useState<{ id: number; url: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const submitImage = async () => {
    if (!currentData) return;
    setLoading(true);
    const fd = new FormData();
    fd.append('file', currentData as File);
    const response = await fetchAPIFormData(
      {
        route: 'carousel/' + carouselId,
        method: 'PUT',
      },
      fd,
    );
    if (response.res) {
      setLoading(false);
    } else {
      console.log(response.error);
    }
  };

  const getImages = async () => {
    const response = (await fetchAPI({
      route: 'carousel/' + carouselId,
      raw: true,
    })) as Response;
    const decoded = await response.json();
    console.log(decoded);
    setImages(decoded);
  };

  useEffect(() => {
    const getImages2 = async () => {
      const response = (await fetchAPI({
        route: 'carousel/' + carouselId,
        raw: true,
      })) as Response;
      const decoded = await response.json();
      console.log(decoded);
      setImages(decoded);
    };

    getImages2();
  }, [carouselId]);

  return active ? (
    <>
      <div className="bg-black opacity-50 fixed w-screen h-screen top-0 left-0 z-10"></div>
      <div className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-16 rounded-3xl h-5/6 w-5/6">
        <div className="flex h-full">
          <form
            action=""
            className="text-center w-1/3"
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              const doStuff = async () => {
                await submitImage();
                await getImages();
                setInputValue('');
              };
              doStuff();
            }}
          >
            <input
              type="file"
              name="file"
              id="file"
              className="text-black"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.currentTarget.files) {
                  setInputValue(e.currentTarget.value);
                  setCurrentData(e.currentTarget.files[0]);
                }
              }}
            />
            <input
              type="submit"
              value="Envoyer"
              className="bg-blue text-white p-2 text-xl w-full font-extrabold rounded-lg hover:bg-blue-dark cursor-pointer mr-1 mt-5"
              disabled={loading}
            />
          </form>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 overflow-y-scroll">
              {images.map(i => {
                key++;
                return (
                  <DeletableImage key={key} image={i} getImages={getImages} />
                );
              })}
            </div>
          </div>
        </div>
        <button
          className="p-2 text-xl w-1/4 bg-gray-light hover:bg-gray-dark ml-1 rounded-lg font-extrabold"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setActive(false);
            foreignGetImages();
          }}
        >
          Fermer
        </button>
      </div>
    </>
  ) : null;
}

function DeletableImage({
  image,
  getImages,
}: {
  image: { id: number; url: string };
  getImages: () => void;
}) {
  const deleteImage = async () => {
    const response = (await fetchAPI({
      route: `carousel/${image.id}`,
      method: 'DELETE',
      raw: true,
    })) as Response;

    if (response.ok) {
      getImages();
    } else {
      console.log(response.statusText);
    }
  };

  return (
    <div className="relative p-3 hover:bg-gray-light flex justify-center items-center">
      <img src={image.url} alt="" className="" />
      <button
        onClick={() => deleteImage()}
        className="absolute top-0 right-0 p-2 text-white"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}
