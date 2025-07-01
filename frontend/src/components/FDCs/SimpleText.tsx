import { ChangeEvent, FormEvent, useState } from 'react';
import { fetchAPI, loginTest } from '../../utils';
import MarkdownIt from 'markdown-it';

export default function SimpleText({ itemKey }: { itemKey: string }) {
  const [data, setData] = useState('');
  const [dataStopper, setDataStopper] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginStopper, setIsLoginStopper] = useState(false);
  const [active, setActive] = useState(false);
  const md = MarkdownIt({
    breaks: true,
    xhtmlOut: true,
    linkify: !isLogin,
    typographer: true,
  });

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
        className={`inline ${isLogin ? 'cursor-pointer hover:bg-select-gray hover:bg-opacity-50  ' : ''}`}
        onClick={isLogin ? () => setActive(true) : () => {}}
        dangerouslySetInnerHTML={{ __html: md.render(data) }}
        onMouseOver={
          isLogin
            ? (e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.color = 'rgb(0 200 1200';
              }
            : () => {}
        }
        onMouseLeave={
          isLogin
            ? (e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.color = '';
              }
            : () => {}
        }
      ></div>
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
        className={`${!dark ? 'bg-white' : 'bg-dark-back text-white'} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-20 rounded-3xl`}
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
            cols={80}
            rows={10}
            value={currentData}
            className={`text-3xl text-left p-5 block mb-5 ${!dark ? 'text-black' : 'bg-dark-back text-white'}`}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
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

async function fetchData(
  itemkey: string,
  stateSetter: (s: string) => void,
  stopper: (b: boolean) => void,
) {
  const response = await fetchAPI({ route: 'simpletext/' + itemkey });
  stateSetter(response.data || 'Error');
  stopper(true);
}

async function submitSimpleText(
  itemKey: string,
  data: string,
  setIsActive: (b: boolean) => void,
  setLoading: (b: boolean) => void,
  stopper: (b: boolean) => void,
) {
  setLoading(true);
  const response = (await fetchAPI({
    route: 'simpletext/' + itemKey,
    method: 'PUT',
    body: { data: data },
    raw: true,
  })) as Response;

  if (response.ok) console.log('text ok');
  else console.log(response.statusText);
  setLoading(false);
  setIsActive(false);
  stopper(false);
}
