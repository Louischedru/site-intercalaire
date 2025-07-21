import { useState, useEffect } from 'react';
import * as carouselCalls from '../../api-calls/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import FileInput from '../../components/forms/FileInput';
import TextArea from '../../components/forms/TextArea';
import TextInput from '../../components/forms/TextInput';

const keyName = 'caroussel-images-modify';
let key = 0;

export default function CarouselModify() {
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState<File>();
  const [images, setImages] = useState<{ id: number; url: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState('home');
  const [alt, setAlt] = useState('');
  const [url, setUrl] = useState('');

  const submitImage = async () => {
    setLoading(true);
    try {
      await carouselCalls.create(page, currentData);
      setCurrentData(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const getImages = async () => {
    try {
      setImages(await carouselCalls.getOne('home'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <div className="p-10">
        <div className="flex justify-center">
          <div className="flex border border-[#bababa] w-1/3">
            <button
              className="disabled:bg-[#196bd0] disabled:text-[#ffffff] p-3 font-extrabold w-1/2"
              onClick={() => setPage('home')}
              disabled={page == 'home'}
            >
              Diaporam d'accueil
            </button>
            <button
              className="disabled:bg-[#196bd0] disabled:text-[#ffffff] p-3 font-extrabold w-1/2"
              onClick={() => setPage('nosprojets')}
              disabled={page == 'nosprojets'}
            >
              Projets aidés
            </button>
          </div>
        </div>
        <div className="mt-10">
          <form
            action=""
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
            <div className="flex justify-center">
              <FileInput
                type="image"
                name="Importez une image"
                id="file"
                value={inputValue}
                file={currentData}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.currentTarget.files) {
                    setInputValue(e.currentTarget.value);
                    setCurrentData(e.currentTarget.files[0]);
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <TextArea
                  name="Texte alternatif"
                  value={alt}
                  onChange={e => setAlt(e.currentTarget.value)}
                />
              </div>
              <div>
                <TextInput
                  value={url}
                  onChange={e => setUrl(e.currentTarget.value)}
                  name="URL de redirection"
                />
              </div>
            </div>
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
                  <DeletableImage
                    key={`${keyName}-${key}`}
                    image={i}
                    getImages={getImages}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DeletableImage({
  image,
  getImages,
}: {
  image: { id: number; url: string };
  getImages: () => void;
}) {
  const deleteImage = async () => {
    getImages();
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
