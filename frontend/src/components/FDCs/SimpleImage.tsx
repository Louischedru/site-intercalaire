import { useEffect, useState } from 'react';
import * as simpleImageCalls from '../../api-calls/SimpleImage';
import FileInput from '../forms/FileInput';
import Visualizer from './SimpleImageVisualizer';
import { loginTest } from '../../utils';
import SubmitInput from '../forms/SubmitInput';
import TextArea from '../forms/TextArea';

interface Props {
  itemKey: string;
  className?: string;
}

export default function SimpleImage({ itemKey, className }: Props) {
  const [image, setImage] =
    useState<simpleImageCalls.SimpleImageInterface | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [active, setActive] = useState(false);

  console.log('imgae: ' + image);

  useEffect(() => {
    getSimpleImage(itemKey, setImage);
    loginTest(setIsLogin);
  }, [itemKey]);

  return (
    <>
      {isLogin && (
        <SimpleImagePopup
          itemKey={itemKey}
          image={image}
          active={active}
          setActive={setActive}
        />
      )}
      <img
        onClick={
          isLogin
            ? () => {
                setActive(true);
              }
            : () => {}
        }
        src={image?.url}
        className={className}
        alt={image?.alt}
      />
      ;
    </>
  );
}

async function getSimpleImage(
  itemKey: string,
  setImage: (s: simpleImageCalls.SimpleImageInterface | null) => void,
) {
  try {
    const response = await simpleImageCalls.getOne(itemKey);
    setImage({ ...response });
  } catch (error) {
    console.log(error);
  }
}

function SimpleImagePopup({
  itemKey,
  image,
  active,
  setActive,
}: {
  itemKey: string;
  active: boolean;
  image: simpleImageCalls.SimpleImageInterface | null;
  setActive: (b: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState<File>();
  const [alt, setAlt] = useState('');
  const [inputValue, setInputValue] = useState('');

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
