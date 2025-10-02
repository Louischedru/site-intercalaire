import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as filmArticleCalls from '../api-calls/FilmArticle';
import Head from '../components/projet/Head';
import Article from '../components/projet/Article';

export default function Projet() {
  const [params] = useSearchParams();
  const [element, setElement] =
    useState<filmArticleCalls.fullFilmArticleInterface>();

  useEffect(() => {
    const doStuff = async () => {
      const id = params.get('id');
      if (!id) return;
      try {
        const response = await filmArticleCalls.getOnePublic(parseInt(id));
        setElement(response);
      } catch (error) {
        console.log(error);
      }
    };
    doStuff();
  }, [params]);
  return (
    <div>
      <Head element={element} />
      <Article element={element} />
    </div>
  );
}
