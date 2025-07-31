import SimpleText from './FDCs/SimpleText';
import * as simpleImageCalls from '../api-calls/SimpleImage';
import { useEffect, useState } from 'react';
import { loginTest } from '../utils';
import FileInput from './forms/FileInput';
import TextArea from './forms/TextArea';
import SubmitInput from './forms/SubmitInput';
import Visualizer from './FDCs/SimpleImageVisualizer';

interface Props {
  title: string;
  textKey: string;
  imageKey: string;
}

export default function PageHeader(props: Props) {
  const [isLogin, setIsLogin] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    loginTest(setIsLogin);
  }, []);

  return (
    <>
      {isLogin && (
        <SimpleImagePopup
          itemKey={props.imageKey}
          active={active}
          setActive={setActive}
        />
      )}

      <div className="p-8 text-center text-white md:p-16 md:text-left">
        <h1 className="gobold text-2xl mb-3 xl:text-3xl xl:mb-4">
          {props.title}
        </h1>
        <div className="md:w-3/4 lg:w-2/3 xl:w-5/12">
          <SimpleText itemKey={props.textKey} />
        </div>
        {isLogin && (
          <div className="flex justify-center mt-10">
            <button
              className="bg-white text-black p-3"
              onClick={() => setActive(true)}
            >
              Modifier l'image
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export function SimpleImagePopup({
  itemKey,
  active,
  setActive,
}: {
  itemKey: string;
  active: boolean;
  setActive: (b: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState<File>();
  const [alt, setAlt] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [image, setImage] =
    useState<simpleImageCalls.SimpleImageInterface | null>(null);

  const getImage = async () => {
    try {
      const response = await simpleImageCalls.getOne(itemKey);
      setImage(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImage();
  });

  return active ? (
    <>
      <div className="bg-black opacity-50 fixed w-screen h-screen top-0 left-0 z-40"></div>
      <div className="bg-white fixed top-0 bottom-0 overflow-scroll left-1/2 -translate-x-1/2 z-50 p-20 rounded-3xl my-5">
        <form
          action=""
          className="text-center"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            submitSimpleImage(itemKey, currentData, alt, setActive, setLoading);
          }}
        >
          <FileInput
            type="image"
            name="Importez une image"
            id={`${itemKey}-file`}
            value={inputValue}
            file={currentData}
            visualize={<Visualizer element={image} preview={currentData} />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.files) {
                setInputValue(e.currentTarget.value);
                setCurrentData(e.currentTarget.files[0]);
              }
            }}
          />
          <TextArea
            name="Texte alternatif"
            value={alt}
            onChange={e => setAlt(e.currentTarget.value)}
            id={`${itemKey}-alt`}
          />
          <SubmitInput disabled={loading} />
          <button
            className="p-2 text-xl w-1/4 bg-gray-light hover:bg-gray-dark ml-1 rounded-lg font-extrabold"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              setActive(false);
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </>
  ) : null;
}

async function submitSimpleImage(
  itemKey: string,
  data: File | undefined,
  alt: string,
  setIsActive: (b: boolean) => void,
  setLoading: (b: boolean) => void,
) {
  setLoading(true);

  try {
    console.log(await simpleImageCalls.modifyImage(itemKey, data));
    console.log(await simpleImageCalls.modifyAlt(itemKey, alt));
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
  setIsActive(false);
}
