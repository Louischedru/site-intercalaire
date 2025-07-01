import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchAPI } from '../utils';
import SimpleImageFrom from '../components/dev/SimpleImageFrom';
import SimpleImagesList from '../components/dev/SimpleImageList';

export default function DevInterface() {
  return (
    <div className="w-screen min-h-screen bg-black p-20 justify-center">
      <div className="flex w-full justify-center mb-5">
        <SimpleTextForm />
        <SimpleTextsList />
      </div>
      <div className="flex w-full justify-center">
        <SimpleImageFrom />
        <SimpleImagesList />
      </div>
    </div>
  );
}

function SimpleTextForm() {
  const [itemKey, setItemKey] = useState('');
  const [reqStatus, setReqStatus] = useState(-1);

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        createSimpleText(itemKey, setReqStatus);
      }}
      action=""
      className="text-center border border-white flex justify-center flex-col w-1/2 p-5"
    >
      <h1 className="text-white text-5xl">Create simple text</h1>
      <input
        type="text"
        placeholder="Item Key"
        className="bg-black border-white text-white border p-2 rounded-lg text-3xl w-full mb-5"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setItemKey(e.currentTarget.value);
        }}
        value={itemKey}
      />
      <div className="text-white">
        {reqStatus == 1 ? (
          <p>OK {itemKey}</p>
        ) : reqStatus == 0 ? (
          <p>Error {itemKey}</p>
        ) : null}
      </div>
      <input
        type="submit"
        value="Add"
        className="text-white bg-blue-dark p-3 cursor-pointer"
      />
    </form>
  );
}

function SimpleTextsList() {
  const [texts, setTexts] = useState([] as string[]);

  useEffect(() => {
    getAllSimpleTexts(setTexts);
  }, []);

  console.log('texts: ', texts);

  return (
    <div>
      {texts.map((t: string) => {
        return <div className="text-white border-t border-b text-3xl">{t}</div>;
      })}
    </div>
  );
}

async function createSimpleText(
  itemKey: string,
  setReqStatus: (n: number) => void,
) {
  const response = (await fetchAPI({
    route: '/simpletext',
    method: 'POST',
    body: { itemKey, data: 'New simple text' },
    raw: true,
  })) as Response;

  setReqStatus(response.ok ? 1 : 0);
  console.log(response);
}

async function getAllSimpleTexts(setTexts: (s: string[]) => void) {
  const response = (await fetchAPI({
    route: '/simpletext',
    method: 'GET',
  })) as { texts: [] };
  const toReturn = [] as string[];

  if (response.texts) {
    response.texts.forEach((t: { itemKey: string }) => {
      toReturn.push(t.itemKey);
    });
    setTexts(toReturn);
    console.log(response.texts);
  }
}
