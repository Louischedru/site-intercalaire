import { useState, useEffect } from 'react';
import * as carouselCalls from '../../api-calls/Carousel';
import FileInput from '../../components/forms/FileInput';
import TextArea from '../../components/forms/TextArea';
import TextInput from '../../components/forms/TextInput';
import SubmitInput from '../../components/forms/SubmitInput';
import CarouselShow from '../../components/carousel-modify/CarouselShox';
import Visualizer from '../../components/carousel-modify/Visualizer';

export default function CarouselModify() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<carouselCalls.CarouselInterface[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState('home');
  const [imageId, setImageId] = useState(-1);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [visualize, setVisualize] =
    useState<carouselCalls.CarouselInterface | null>(null);

  const [currentData, setCurrentData] = useState<File>();
  const [alt, setAlt] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState('');
  const [textColor, setTextColor] = useState('');

  const deleteImage = async () => {
    setLoading(true);
    try {
      const response = await carouselCalls.deleteImage(imageId);
      console.log(response);
      await getImages();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const modifyImage = async () => {
    setLoading(true);
    try {
      const response = await carouselCalls.modifyOther(imageId, {
        alt,
        url,
        title,
        desc,
        color,
        textColor,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    if (!currentData) {
      setLoading(false);
      return;
    }

    try {
      const response = await carouselCalls.modifyImage(imageId, currentData);
      console.log(response);
      await getImages();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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
    }
    try {
      const response = await carouselCalls.modifyOther(id, {
        alt,
        url,
        title,
        desc,
        color,
        textColor,
      });
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
    setAreImagesLoaded(false);
    setImages([]);
    setVisualize(null);
    setImageId(-1);
    try {
      setImages(await carouselCalls.getOne(page));
      setAreImagesLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getImages2 = async () => {
      setAreImagesLoaded(false);
      setImages([]);
      setVisualize(null);
      try {
        setImages(await carouselCalls.getOne(page));
        setAreImagesLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    getImages2();
    setImageId(-1);
  }, [page]);

  useEffect(() => {
    let element = undefined as carouselCalls.CarouselInterface | undefined;

    for (let i = 0; i < images.length; i++)
      if (images[i].id == imageId) {
        element = images[i];
        break;
      }

    setAlt(element?.alt || '');
    setUrl(element?.url || '');
    setTitle(element?.title || '');
    setDesc(element?.desc || '');
    setColor(element?.color || '');
    setTextColor(element?.textColor || '');

    const altElement =
      (document.getElementById('alt') as HTMLTextAreaElement) ||
      document.createElement('textarea');
    const urlElement =
      (document.getElementById('url') as HTMLInputElement) ||
      document.createElement('input');
    const titleElement =
      (document.getElementById('title') as HTMLInputElement) ||
      document.createElement('input');
    const colorElement =
      (document.getElementById('color') as HTMLInputElement) ||
      document.createElement('input');
    const textColorElement =
      (document.getElementById('text-color') as HTMLInputElement) ||
      document.createElement('input');
    const descElement =
      (document.getElementById('desc') as HTMLTextAreaElement) ||
      document.createElement('textarea');

    altElement.value = element?.alt || '';
    urlElement.value = element?.url || '';
    titleElement.value = element?.title || '';
    colorElement.value = element?.color || '';
    textColorElement.value = element?.textColor || '';
    descElement.value = element?.desc || '';
    setCurrentData(undefined);
  }, [imageId, images]);

  return (
    <>
      <div className="p-10">
        <div className="flex justify-center pb-10">
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
        {areImagesLoaded && (
          <CarouselShow
            images={images}
            setImageId={setImageId}
            imageId={imageId}
            setVisualize={setVisualize}
          />
        )}{' '}
        <div className="mt-10">
          <form
            action=""
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              const doStuff = async () => {
                if (imageId == -1) await submitImage();
                else await modifyImage();
                await getImages();
                setInputValue('');
              };
              doStuff();
            }}
          >
            <div className="flex justify-center mb-5">
              <FileInput
                type="image"
                name="Importez une image"
                id="file"
                value={inputValue}
                file={currentData}
                visualize={
                  <Visualizer
                    image={visualize}
                    preview={currentData}
                    page={page}
                    title={title}
                    desc={desc}
                    color={color}
                    textColor={textColor}
                  />
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.currentTarget.files) {
                    setInputValue(e.currentTarget.value);
                    setCurrentData(e.currentTarget.files[0]);
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextArea
                name="Texte alternatif"
                value={alt}
                onChange={e => setAlt(e.currentTarget.value)}
                id="alt"
              />
              <TextInput
                value={url}
                onChange={e => setUrl(e.currentTarget.value)}
                name="URL de redirection"
                id="url"
              />{' '}
              <TextArea
                name="Description"
                value={desc}
                onChange={e => setDesc(e.currentTarget.value)}
                id="desc"
              />
              <TextInput
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
                name="Titre"
                id="title"
              />{' '}
              <TextInput
                value={textColor}
                onChange={e => setTextColor(e.currentTarget.value)}
                name="Couleur du texte"
                id="text-color"
              />{' '}
              <TextInput
                value={color}
                onChange={e => setColor(e.currentTarget.value)}
                name="Couleur de fond"
                id="color"
              />{' '}
            </div>
            <div className="flex justify-center mt-10 gap-4">
              <SubmitInput disabled={loading} />
              {imageId != -1 && (
                <button
                  className="text-white bg-[#ff2727] p-2 disabled:bg-[#5c5c5c]"
                  onClick={() => deleteImage()}
                >
                  Supprimer
                </button>
              )}{' '}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
