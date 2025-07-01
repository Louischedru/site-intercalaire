import { useState } from 'react';
import { fetchAPI } from '../../utils';

export default function SimpleImageFrom() {
  const [itemKey, setItemKey] = useState('');
  const [reqStatus, setReqStatus] = useState(-1);

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        createSimpleImage(itemKey, setReqStatus);
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

async function createSimpleImage(
  itemKey: string,
  setReqStatus: (n: number) => void,
) {
  const response = (await fetchAPI({
    route: '/simpleimage',
    raw: true,
    method: 'POST',
    body: { itemKey },
  })) as Response;

  setReqStatus(response.ok ? 1 : 0);
  console.log(response);
}
