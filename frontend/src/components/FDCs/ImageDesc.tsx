import { ReactNode, useEffect, useState } from 'react';
import * as imageDescCalls from '../../api-calls/ImageDesc';
import FileInput from '../forms/FileInput';
import TextArea from '../forms/TextArea';
import TextInput from '../forms/TextInput';
import SubmitInput from '../forms/SubmitInput';
import { loginTest } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

let key = 0;

interface Props {
  list: string;
  Container: (props: { children: ReactNode }) => JSX.Element;
  ItemModel: (props: {
    onClick: () => void;
    element: imageDescCalls.ImageDescInterface;
  }) => JSX.Element;
}

export default function ImageDesc(props: Props) {
  const [items, setItems] = useState<imageDescCalls.ImageDescInterface[]>();
  const [isLogged, setIsLogged] = useState(false);
  const [active, setActive] = useState(false);
  const [mdActive, setMdActive] = useState(false);
  const [targetElement, setTargetElement] =
    useState<imageDescCalls.ImageDescInterface>();
  const [dataReload, setDataReload] = useState(true);

  const getItems = async () => {
    try {
      const response = await imageDescCalls.getList(props.list);
      setItems(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dataReload) {
    getItems();
    setDataReload(true);
  }

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await imageDescCalls.getList(props.list);
        setItems(response);
      } catch (error) {
        console.log(error);
      }
    };

    effect();
    loginTest(setIsLogged);
  }, [props.list]);

  return (
    <>
      {isLogged && active && (
        <CreateImageDescPopup
          list={props.list}
          active={active}
          setActive={setActive}
        />
      )}
      {isLogged && mdActive && (
        <ModifyImageDescPopup
          element={targetElement}
          active={mdActive}
          setActive={setMdActive}
        />
      )}
      {isLogged && (
        <div className="w-full text-center">
          <button
            className="text-xl bg-white hover:underline p-3 rounded-lg"
            onClick={() => setActive(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Ajouter
          </button>
        </div>
      )}
      {items && (
        <props.Container>
          {items?.map(i => {
            key++;
            return (
              <props.ItemModel
                onClick={
                  isLogged
                    ? () => {
                        setTargetElement(i);
                        setMdActive(true);
                      }
                    : () => {}
                }
                element={i}
                key={`id-${props.list}-${key}`}
              />
            );
          })}
        </props.Container>
      )}
    </>
  );
}

function CreateImageDescPopup({
  list,
  active,
  setActive,
}: {
  list: string;
  active: boolean;
  setActive: (b: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState<File>();
  const [alt, setAlt] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [inputValue, setInputValue] = useState('');

  const submit = async () => {
    try {
      setLoading(true);
      const response = await imageDescCalls.addToList(list, currentData);
      const it = response?.data as { id: number };
      console.log(it);
      const response2 = await imageDescCalls.modifyOther(it.id, {
        alt,
        title,
        desc,
      });

      console.log(response2);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return active ? (
    <>
      <div className="bg-black opacity-50 fixed w-screen h-screen top-0 left-0 z-40"></div>
      <div className="bg-white fixed top-0 bottom-0 overflow-scroll left-1/2 -translate-x-1/2 z-50 p-20 rounded-3xl my-5 w-2/3">
        <form
          action=""
          className="text-center"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            const doStuff = async () => {
              await submit();
              setActive(false);
            };

            doStuff();
          }}
        >
          <FileInput
            type="image"
            name="Importez une image"
            id={`${list}-file`}
            value={inputValue}
            file={currentData}
            visualize={<Visualizer element={null} preview={currentData} />}
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
            id={`${list}-alt`}
          />
          <TextInput
            name="Titre"
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
            id={`${list}-title`}
          />
          <TextArea
            name="Description"
            value={desc}
            onChange={e => setDesc(e.currentTarget.value)}
            id={`${list}-desc`}
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

function ModifyImageDescPopup({
  element,
  active,
  setActive,
}: {
  element?: imageDescCalls.ImageDescInterface;
  active: boolean;
  setActive: (b: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState<File>();
  const [alt, setAlt] = useState(element?.alt || '');
  const [title, setTitle] = useState(element?.title || '');
  const [desc, setDesc] = useState(element?.desc || '');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const titleElem =
      (document.getElementById('id-m-title') as HTMLInputElement) ||
      document.createElement('input');
    const descElement =
      (document.getElementById('id-m-desc') as HTMLTextAreaElement) ||
      document.createElement('textarea');
    const altElement =
      (document.getElementById('id-m-alt') as HTMLTextAreaElement) ||
      document.createElement('textarea');

    titleElem.value = element?.title || '';
    descElement.value = element?.desc || '';
    altElement.value = element?.alt || '';
  }, [element]);

  if (!element) return <></>;

  const deleteOne = async () => {
    try {
      const response = await imageDescCalls.deleteOne(element.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    try {
      setLoading(true);
      if (currentData) {
        const response = await imageDescCalls.modifyImage(
          element.id,
          currentData,
        );
        console.log(response);
      }
      const response2 = await imageDescCalls.modifyOther(element.id, {
        alt,
        title,
        desc,
      });

      console.log(response2);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return active ? (
    <>
      <div className="bg-black opacity-50 fixed w-screen h-screen top-0 left-0 z-40"></div>
      <div className="bg-white fixed top-0 bottom-0 overflow-scroll left-1/2 -translate-x-1/2 z-50 p-20 rounded-3xl my-5 w-2/3">
        <form
          action=""
          className="text-center"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            const doStuff = async () => {
              submit();
              setActive(false);
            };

            doStuff();
          }}
        >
          <FileInput
            type="image"
            name="Importez une image"
            id={`id-m-file`}
            value={inputValue}
            file={currentData}
            visualize={<Visualizer element={element} preview={currentData} />}
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
            id={`id-m-alt`}
          />
          <TextInput
            name="Titre"
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
            id={`id-m-title`}
          />
          <TextArea
            name="Description"
            value={desc}
            onChange={e => setDesc(e.currentTarget.value)}
            id={`id-m-desc`}
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
          <button
            onClick={() => {
              const doStuff = async () => {
                await deleteOne();
                setActive(false);
              };

              doStuff();
            }}
            className="bg-[red] p-3 text-white ml-3.5"
          >
            Supprimer
          </button>
        </form>
      </div>
    </>
  ) : null;
}

function Visualizer(props: {
  element: imageDescCalls.ImageDescInterface | null;
  preview?: File;
}) {
  const previewUrl =
    (props.preview && URL.createObjectURL(props.preview)) || null;
  const src = previewUrl || props.element?.url || '';

  return (
    <div>
      <img src={src} alt="" />
    </div>
  );
}
