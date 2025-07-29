import { useEffect, useState } from 'react';
import * as simpleImageCalls from '../../api-calls/SimpleImage';

export default function SimpleImageFrom() {
  const [itemKey, setItemKey] = useState('');
  const [reqStatus, setReqStatus] = useState(-1);
  const [keys, setKeys] = useState<string[]>([]);

  const getKeys = async () => {
    try {
      const response = (await simpleImageCalls.getAll()) as {
        itemKey: string;
      }[];
      const items: string[] = [];
      response.forEach(e => items.push(e.itemKey));
      setKeys(items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKeys();
  }, []);

  return (
    <div>
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          createSimpleImage(itemKey, setReqStatus);
        }}
        action=""
        className="text-center border border-white flex justify-center flex-col w-1/2 p-5"
      >
        <h1 className="text-white text-5xl">Create simple image</h1>
        <input
          type="text"
          placeholder="Item Key"
          className="bg-black border-white text-white border p-2 rounded-lg text-3xl w-full mb-5"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div>
        {keys.map(k => {
          return <div className="text-white text-3xl">{k}</div>;
        })}
      </div>
    </div>
  );
}

async function createSimpleImage(
  itemKey: string,
  setReqStatus: (n: number) => void,
) {
  try {
    const response = await simpleImageCalls.create(itemKey);
    setReqStatus(1);
    console.log(response);
  } catch (error) {
    console.log(error);
    setReqStatus(0);
  }
}
