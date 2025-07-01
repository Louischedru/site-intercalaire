import { useEffect, useState } from 'react';
import { fetchAPI, loginTest } from '../../utils';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Props {
  itemKey: string;
  className?: string;
}

export default function SimpleImage({ itemKey, className }: Props) {
  const [image, setImage] = useState('');
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
        src={image}
        className={className}
        alt=""
      />
      ;
    </>
  );
}

async function getSimpleImage(itemKey: string, setImage: (s: string) => void) {
  const response = (await fetchAPI({
    route: '/simpleimage/' + itemKey,
    raw: true,
  })) as Response;

  if (response.ok) {
    const body = (await response.json()) as { url: string };
    setImage(body.url);
    console.log(body);
  } else {
    console.log('Couldn`t get image');
  }
}

function SimpleImagePopup({
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

  return active ? (
    <>
      <div className="bg-black opacity-50 fixed w-screen h-screen top-0 left-0 z-10"></div>
      <div className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-20 rounded-3xl">
        <form
          action=""
          className="text-center"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            submitImageAxios(itemKey, currentData, setActive, setLoading);
          }}
        >
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.files) {
                setCurrentData(e.currentTarget.files[0]);
              }
            }}
          />
          <input
            type="submit"
            value="Valider"
            className="bg-blue text-white p-2 text-xl w-1/4 font-extrabold rounded-lg hover:bg-blue-dark cursor-pointer mr-1"
            disabled={loading}
          />
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
  setIsActive: (b: boolean) => void,
  setLoading: (b: boolean) => void,
) {
  if (!data) return;
  setLoading(true);
  const fd = new FormData();
  fd.append('file', data);
  console.log('FD', fd);
  const response = (await fetchAPI({
    route: 'simpleimage/' + itemKey,
    method: 'PUT',
    body: fd,
    raw: true,
  })) as Response;

  if (response.ok) console.log('image ok');
  else console.log(response.statusText);
  setLoading(false);
  setIsActive(false);
}

async function submitImageAxios(
  itemKey: string,
  file: File | undefined,
  setIsActive: (b: boolean) => void,
  setLoading: (b: boolean) => void,
) {
  if (!file) return;
  setLoading(true);
  const fd = new FormData();

  axios.defaults.headers.common = {
    authorization: Cookies.get('authorization') || '',
  };

  fd.append('file', file);
  try {
    const response = await axios.put(
      'http://localhost:8080/api/simpleimage/' + itemKey,
      fd,
    );
    console.log(response);
    setLoading(false);
    setIsActive(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
}
