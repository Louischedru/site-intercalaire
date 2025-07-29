import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SimpleImageFrom from '../../components/dev/SimpleImageFrom';
import SimpleImagesList from '../../components/dev/SimpleImageList';
import * as simpleTextCalls from '../../api-calls/SimpleText';

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
  try {
    const response = await simpleTextCalls.create(itemKey);
    console.log(response);
    setReqStatus(1);
  } catch (error) {
    console.log(error);
    setReqStatus(0);
  }
}

async function getAllSimpleTexts(setTexts: (s: string[]) => void) {
  try {
    const response = (await simpleTextCalls.getAll()) as { itemKey: string }[];
    const items: string[] = [];
    response.forEach(e => items.push(e.itemKey));
    setTexts(items);
  } catch (error) {
    console.log(error);
  }
}
