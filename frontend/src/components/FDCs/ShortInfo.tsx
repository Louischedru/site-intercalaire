import { ChangeEvent, FormEvent, useState } from 'react';
import * as simpleTextCalls from '../../api-calls/ShortInfo';
import { loginTest } from '../../utils';
import Markdown, { Components } from 'react-markdown';

const mdComponents: Components = {
  strong({ children }) {
    return <b>{children}</b>;
  },
  em({ children }) {
    return <i>{children}</i>;
  },
  a({ children, href }) {
    return (
      <a href={href} className="hover:underline text-[#bee0ff]">
        {children}
      </a>
    );
  },
};

export default function Shortinfo({ itemKey }: { itemKey: string }) {
  const [data, setData] = useState('');
  const [dataStopper, setDataStopper] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginStopper, setIsLoginStopper] = useState(false);
  const [active, setActive] = useState(false);

  if (!isLoginStopper) {
    loginTest(setIsLogin);
    setIsLoginStopper(true);
  }
  if (!dataStopper) {
    fetchData(itemKey, setData, setDataStopper);
  }

  return (
    <>
      {dataStopper ? (
        <SimpleTextEditPopup
          itemKey={itemKey}
          data={data}
          active={active}
          setActive={setActive}
          setDataStopper={setDataStopper}
          dark
        />
      ) : null}
      <div
        className={`inline ${isLogin ? 'cursor-pointer hover:bg-black hover:bg-opacity-50  ' : ''}`}
        onClick={isLogin ? () => setActive(true) : () => {}}
        onMouseOver={
          isLogin
            ? (e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.color = 'rgb(0 200 1200';
              }
            : undefined
        }
        onMouseLeave={
          isLogin
            ? (e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.color = '';
              }
            : undefined
        }
      >
        <Markdown components={mdComponents}>{data}</Markdown>
      </div>
    </>
  );
}

function SimpleTextEditPopup({
  itemKey,
  data,
  active,
  setActive,
  setDataStopper,
  dark,
}: {
  itemKey: string;
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
        className={`${!dark ? 'bg-white' : 'bg-dark-back text-white'} fixed w-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-20 rounded-3xl`}
      >
        <form
          action=""
          className="text-center"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            submitSimpleText(
              itemKey,
              currentData,
              setActive,
              setLoading,
              setDataStopper,
            );
          }}
        >
          <textarea
            rows={10}
            value={currentData}
            className={`w-full text-3xl text-left p-5 block mb-5 ${!dark ? 'text-black' : 'bg-black text-white'}`}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setCurrentData(e.currentTarget.value)
            }
          ></textarea>
          <input
            type="submit"
            value="Valider"
            className="bg-[#7993d7] text-white p-2 text-xl w-1/4 font-extrabold rounded-lg hover:bg-blue-dark cursor-pointer mr-1"
            disabled={loading}
          />
          <button
            className="p-2 text-xl w-1/4 bg-[#dddddd] text-black ml-1 rounded-lg font-extrabold"
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

async function fetchData(
  itemkey: string,
  stateSetter: (s: string) => void,
  stopper: (b: boolean) => void,
) {
  try {
    const response = await simpleTextCalls.getOne(itemkey);
    stateSetter(response.data || 'Texte non rédigé');
    stopper(true);
  } catch (error) {
    console.log(error);
  }
}

async function submitSimpleText(
  itemKey: string,
  data: string,
  setIsActive: (b: boolean) => void,
  setLoading: (b: boolean) => void,
  stopper: (b: boolean) => void,
) {
  setLoading(true);

  try {
    const response = await simpleTextCalls.modify(itemKey, data);
    setLoading(false);
    setIsActive(false);
    stopper(false);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
