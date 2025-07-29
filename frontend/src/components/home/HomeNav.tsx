import { useEffect, useState } from 'react';
import * as simpleImageCalls from '../../api-calls/SimpleImage';
import { Link } from 'react-router-dom';

export default function HomeNav() {
  return (
    <div className="flex">
      <Rubric
        name="Nos projets"
        itemKey="page-headers.nos-projets"
        page="nos-projets"
      />
      <Rubric
        name="Captations"
        itemKey="page-headers.captations"
        page="nos-projets"
      />
      <Rubric
        name="à venir"
        itemKey="page-headers.a-venir"
        page="nos-projets"
      />
    </div>
  );
}

function Rubric(props: { name: string; page: string; itemKey: string }) {
  const [image, setImage] =
    useState<simpleImageCalls.SimpleImageInterface | null>(null);

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await simpleImageCalls.getOne(props.itemKey);
        setImage(response);
      } catch (error) {
        console.log(error);
      }
    };

    getImage();
  }, [props]);

  return (
    <Link
      className="w-1/3 bg-cover bg-center"
      style={{ backgroundImage: `url(${image?.url})` }}
      to={props.page}
    >
      <b className="text-white gobold text-sm px-4 py-6 block bg-black bg-opacity-50 hover:underline hover:bg-opacity-40 text-center md:py-8 md:text-lg lg:py-14 lg:text-2xl">
        {props.name}
      </b>
    </Link>
  );
}
