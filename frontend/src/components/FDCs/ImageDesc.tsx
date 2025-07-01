import { useEffect, useState } from 'react';
import { fetchAPI, fetchAPIFormData, loginTest } from '../utils';
import MarkdownIt from 'markdown-it';
import ThemedText from './ThemedText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const key = 0;

interface Props {
  list: string;
}

interface DataImageDesc {
  id: number;
  url: string;
  desc: string;
}

export default function ImageDesc({ list }: Props) {
  const [items, setItems] = useState<DataImageDesc[]>();
  const [isLogged, setIsLogged] = useState(false);
  const [active, setActive] = useState(false);
  const [mdActive, setMdActive] = useState(false);
  const [targetElement, setTargetElement] = useState<DataImageDesc>();
  const [dataReload, setDataReload] = useState(true);
  const [miActive, setMiActive] = useState(false);
  const md = MarkdownIt({
    breaks: true,
    xhtmlOut: true,
    linkify: !isLogged,
    typographer: true,
  });

  const getItems = async () => {
    const response = (await fetchAPI({
      route: `imagedesc/${list}`,
      raw: true,
    })) as Response;

    console.log(response);

    if (response.ok) {
      setItems(await response.json());
    }
  };

  if (!dataReload) {
    getItems();
    setDataReload(true);
  }

  useEffect(() => {
    const effect = async () => {
      const response = (await fetchAPI({
        route: `imagedesc/${list}`,
        raw: true,
      })) as Response;

      if (response.ok) {
        setItems(await response.json());
      }
    };

    effect();
    loginTest(setIsLogged);
  }, [list]);

  return (
    <>
      {isLogged && active && (
        <CreateImageDescPopup
          carouselId={list}
          active={active}
          setActive={setActive}
          foreignGetImages={getItems}
        />
      )}
      {isLogged && mdActive && (
        <ModifyDescPopup
          id={targetElement?.id || 0}
          active={mdActive}
          setActive={setMdActive}
          data={targetElement?.desc || ''}
          setDataStopper={setDataReload}
        />
      )}
      {isLogged && miActive && (
        <ModifyImagePopup
          id={targetElement?.id || 0}
          active={miActive}
          setActive={setMiActive}
          setDataStopper={setDataReload}
        />
      )}
      <div>
        {isLogged && (
          <div className="w-full text-center">
            <button
              className="text-xl bg-blue p-3 rounded-lg"
              onClick={() => setActive(true)}
            >
              Nouveau
            </button>
          </div>
        )}
        {items?.map(i => {
          return (
            <div className="flex flex-col lg:flex-row gap-4 m-3 items-center relative">
              <div
                className="p-3 bg-black w-full lg:w-1/4"
                onClick={
                  isLogged
                    ? () => {
                        setTargetElement(i);
                        setMiActive(true);
                      }
                    : () => {}
                }
              >
                <img src={i.url} alt="" />
              </div>
              <ThemedText type="p">
                <div
                  className={`${isLogged && 'hover:text-blue'} w-full`}
                  dangerouslySetInnerHTML={{ __html: md.render(i.desc) }}
                  onClick={
                    isLogged
                      ? () => {
                          setTargetElement(i);
                          setMdActive(true);
                        }
                      : () => {}
                  }
                ></div>
              </ThemedText>
              {isLogged && (
                <button
                  onClick={() => deleteImageDesc(i.id, setDataReload)}
                  className="absolute right-0 top-0 text-xl cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function CreateImageDescPopup({
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
  const [desc, setDesc] = useState('');

  const submitImage = async () => {
    if (!currentData) return;
    setLoading(true);
    const fd = new FormData();
    fd.append('file', currentData as File);
    fd.append('desc', desc);
    fd.append('list', carouselId);
    const response = await fetchAPIFormData(
      {
        route: 'imagedesc/',
        method: 'POST',
      },
      fd,
    );
    if (response.res) {
      setLoading(false);
    } else {
      console.log(response.error);
    }
  };

  return active ? (
    <>
      <div className="bg-black opacity-50 fixed w-screen h-screen top-0 left-0 z-10"></div>
      <div className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-16 rounded-3xl h-5/6 w-5/6">
        <div className="flex h-full w-full">
          <form
            action=""
            className="text-center w-full"
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              const doStuff = async () => {
                await submitImage();
                setInputValue('');
                foreignGetImages();
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
            <textarea
              cols={70}
              rows={10}
              className="text-black text-2xl"
              value={desc}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDesc(e.currentTarget.value);
              }}
            ></textarea>
            <input
              type="submit"
              value="Envoyer"
              className="bg-blue text-white p-2 text-xl w-2/4 font-extrabold rounded-lg hover:bg-blue-dark cursor-pointer mr-1 mt-5"
              disabled={loading}
            />
            <button
              className="p-2 mt-2 text-xl w-2/4 bg-gray-light hover:bg-gray-dark ml-1 rounded-lg font-extrabold"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setActive(false);
              }}
            >
              Annuler
            </button>
          </form>
        </div>
      </div>
    </>
  ) : null;
}

function ModifyDescPopup({
  id,
  data,
  active,
  setActive,
  setDataStopper,
  dark,
}: {
  id: number;
  data: string;
  active: boolean;
  setActive: (b: boolean) => void;
  setDataStopper: (b: boolean) => void;
  dark?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState(data);

  return active ? (
    <>
      <div className="bg-black opacity-50 fixed w-screen h-screen top-0 left-0 z-10"></div>
      <div
        className={`${!dark ? 'bg-white' : 'bg-dark-back text-white'} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-20 rounded-3xl`}
      >
        <form
          action=""
          className="text-center"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            submitSimpleText(
              id,
              currentData,
              setActive,
              setLoading,
              setDataStopper,
            );
          }}
        >
          <textarea
            cols={80}
            rows={10}
            value={currentData}
            className={`text-3xl text-left p-5 block mb-5 ${!dark ? 'text-black' : 'bg-dark-back text-white'}`}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCurrentData(e.currentTarget.value)
            }
          ></textarea>
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

function ModifyImagePopup({
  id,
  active,
  setActive,
  setDataStopper,
  dark,
}: {
  id: number;
  active: boolean;
  setActive: (b: boolean) => void;
  setDataStopper: (b: boolean) => void;
  dark?: boolean;
}) {
  const [currentData, setCurrentData] = useState<File>();
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  return active ? (
    <>
      <div className="bg-black opacity-50 fixed w-screen h-screen top-0 left-0 z-10"></div>
      <div
        className={`${!dark ? 'bg-white' : 'bg-dark-back text-white'} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-20 rounded-3xl`}
      >
        <form
          action=""
          className="text-center"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            submitImage(id, setDataStopper, setLoading, setActive, currentData);
          }}
        >
          <input
            type="file"
            name="file"
            id="file"
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

async function submitSimpleText(
  itemKey: number,
  data: string,
  setIsActive: (b: boolean) => void,
  setLoading: (b: boolean) => void,
  stopper: (b: boolean) => void,
) {
  setLoading(true);
  const response = (await fetchAPI({
    route: 'imagedesc/modifydesc' + itemKey,
    method: 'PUT',
    body: { desc: data },
    raw: true,
  })) as Response;

  if (response.ok) console.log('text ok');
  else console.log(response.statusText);
  setLoading(false);
  setIsActive(false);
  stopper(false);
}

async function submitImage(
  id: number,
  stopper: (b: boolean) => void,
  setLoading: (b: boolean) => void,
  setIsActive: (b: boolean) => void,
  file?: File,
) {
  setLoading(true);
  const fd = new FormData();

  fd.append('file', file);

  const response = await fetchAPIFormData(
    {
      route: `imagedesc/modifyimage/${id}`,
      method: 'PUT',
      raw: true,
    },
    fd,
  );

  if (response.res) console.log('image ok');
  else console.log(response.error);
  setLoading(false);
  setIsActive(false);
  stopper(true);
}

async function deleteImageDesc(id: number, reload?: (b: boolean) => void) {
  const response = (await fetchAPI({
    route: `imagedesc/${id}`,
    method: 'DELETE',
    raw: true,
  })) as Response;

  if (response.ok && reload) reload(false);
}
