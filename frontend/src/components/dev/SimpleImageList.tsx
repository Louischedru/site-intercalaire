import { useState, useEffect } from 'react';
import { fetchAPI } from '../../utils';

export default function SimpleImagesList() {
  const [texts, setTexts] = useState([] as string[]);

  useEffect(() => {
    getAllSimpleImages(setTexts);
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

async function getAllSimpleImages(setItems: (s: string[]) => void) {
  const response = (await fetchAPI({
    route: '/simpleimage',
    method: 'GET',
  })) as { items: [] };
  const toReturn = [] as string[];

  if (response.items) {
    response.items.forEach((t: { itemKey: string }) => {
      toReturn.push(t.itemKey);
    });
    setItems(toReturn);
    console.log(response.items);
  }
}
