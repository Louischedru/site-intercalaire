import { OutputData } from '@editorjs/editorjs';
import * as filmArticleCalls from '../../api-calls/FilmArticle';
import * as articleImageCalls from '../../api-calls/ArticleImage';
import parseer from 'html-react-parser';
import { useEffect, useState } from 'react';

export default function Article({
  element,
}: {
  element?: filmArticleCalls.fullFilmArticleInterface;
}) {
  const article = element?.article
    ? (JSON.parse(element?.article) as OutputData)
    : null;

  console.log(article);

  return (
    <div className="ip-bg">
      <div className="flex flex-col gap-2 p-2">
        {article?.blocks.map(i => {
          if (i.type == 'paragraph') {
            return <p className="bg-white p-3">{parseer(i.data.text)}</p>;
          }
          if (i.type == 'header') {
            return (
              <h2 className="gobold p-3 text-2xl bg-white">{i.data.text}</h2>
            );
          }
          if (i.type == 'image') {
            return <Image id={i.data.id} />;
          }
          return <div></div>;
        })}
      </div>
    </div>
  );
}

function Image({ id }: { id: number }) {
  const [item, setItem] = useState<articleImageCalls.articleImageInterface>();

  useEffect(() => {
    const doStuff = async () => {
      try {
        const response = await articleImageCalls.getOne(id);
        setItem(response);
      } catch (error) {
        console.log(error);
      }
    };
    doStuff();
  });

  return (
    <div>
      <img src={item?.url} alt={item?.alt} />
    </div>
  );
}
