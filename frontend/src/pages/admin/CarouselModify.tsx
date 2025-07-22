import { useState, useEffect } from 'react';
import * as carouselCalls from '../../api-calls/Carousel';
import FileInput from '../../components/forms/FileInput';
import TextArea from '../../components/forms/TextArea';
import TextInput from '../../components/forms/TextInput';
import SubmitInput from '../../components/forms/SubmitInput';
import CarouselShow from '../../components/carousel-modify/CarouselShox';

export default function CarouselModify() {
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState<File>();
  const [images, setImages] = useState<carouselCalls.CarouselInterface[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState('home');
  const [alt, setAlt] = useState('');
  const [url, setUrl] = useState('');

  const submitImage = async () => {
    let id = -1;
    console.log(currentData);
    console.log(alt);
    console.log(url);
    setLoading(true);
    try {
      const response = await carouselCalls.create(page, currentData);
      console.log(response);
      const data = response?.data as { id: number };
      id = data.id;
      setCurrentData(undefined);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    try {
      const response = await carouselCalls.modifyOther(id, { alt, url });
      console.log(response);
      setUrl('');
      setAlt('');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getImages = async () => {
    try {
      setImages(await carouselCalls.getOne(page));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getImages2 = async () => {
      try {
        setImages(await carouselCalls.getOne(page));
      } catch (error) {
        console.log(error);
      }
    };

    getImages2();
  }, [page]);

  return (
    <>
      <div className="p-10">
        <CarouselShow images={images} getImages={getImages} />
        <div className="flex justify-center pt-10">
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
            <div className="flex justify-center mt-10">
              <SubmitInput disabled={loading} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
