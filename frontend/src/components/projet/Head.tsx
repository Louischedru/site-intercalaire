import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as filmArticleCalls from '../../api-calls/FilmArticle';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Head({
  element,
}: {
  element?: filmArticleCalls.fullFilmArticleInterface;
}) {
  const info = element?.info?.split(';');

  return (
    <div className="bg-ip-blue ">
      <div className="bg-black bg-opacity-60 lg:flex lg:items-center lg:relative">
        <div className="lg:w-2/3">
          <img src={element?.poster} alt="" />
        </div>
        <div className="p-5 lg:w-5/12 lg:absolute lg:right-0 lg:overflow-y-scroll lg:max-h-full">
          <div className="flex justify-center lg:justify-start">
            <h1 className="bg-ip-blue p-3 gobold text-2xl text-white text-center inline-block xl:text-3xl leading-snug">
              {element?.title}
            </h1>
          </div>
          <div className="mt-3 text-center lg:text-left">
            {info?.map(i => {
              const k = i.split(':')[0];
              const v = i.split(':')[1];

              return (
                <div className="inline-block bg-ip-blue text-white p-2 m-1">
                  <b>{k}</b> {v}
                </div>
              );
            })}
          </div>
          {element?.synopsis && element?.synopsis?.length > 0 && (
            <div className="mt-3 md:mx-10 lg:mx-0">
              <p className="bg-white p-3">{element?.synopsis}</p>
            </div>
          )}{' '}
          {element?.url && element.url.length > 0 && (
            <div className="flex justify-center mt-3 lg:justify-start">
              <a
                href={element?.url}
                className="inline-block bg-white text-center p-3"
              >
                <FontAwesomeIcon icon={faPlay} /> Regarder
              </a>
            </div>
          )}{' '}
        </div>
      </div>
    </div>
  );
}
