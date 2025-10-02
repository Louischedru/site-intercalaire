import { useEffect, useState } from 'react';
import Title from '../Title';
import * as filmArticleCalls from '../../api-calls/FilmArticle';
import BlueFrame from '../BlueFrame';
import { Link } from 'react-router-dom';

let key = 0;

export default function MainProjects() {
  const [items, setItems] =
    useState<filmArticleCalls.fullFilmArticleInterface[]>();

  useEffect(() => {
    const doStuff = async () => {
      try {
        const response = await filmArticleCalls.getPublished('nosprojets');
        setItems(response);
      } catch (error) {
        console.log(error);
      }
    };
    doStuff();
  }, []);

  return (
    <div className="mb-20">
      <Title name="Nos films" />
      <div className="px-4 flex flex-col gap-8 md:px-20 lg:px-20">
        {items?.map(i => {
          key++;
          return <ProjectElement element={i} key={`main-project-${key}`} />;
        })}
      </div>
    </div>
  );
}

// function ProjectElement({
//   element,
// }: {
//   element: filmArticleCalls.shortFilmArticleInterface;
// }) {
//   const [isHover, setIsHover] = useState(false);

//   return (
//     <Link
//       to={`/film-article?id=${element.id}`}
//       onMouseOver={() => setIsHover(true)}
//       onMouseLeave={() => setIsHover(false)}
//     >
//       <div className="-translate-y-14 cursor-pointer md:-translate-y-28 lg:flex lg:-translate-y-0 lg:items-center lg:my-8 lg:h-80">
//         <div className="w-full px-3 z-10 translate-y-14  md:translate-y-28 md:px-8 lg:translate-y-0 lg:px-0 lg:translate-x-8 lg:h-4/5">
//           <img
//             className="m-auto block shadow-xl lg:h-full lg:aspect-video"
//             src={element.poster}
//             alt=""
//           />
//         </div>
//         <BlueFrame
//           className="text-white pt-20 p-5 md:p-16 md:max-lg:pt-40 lg:pl-20 lg:-translate-x-8 lg:flex lg:items-center lg:h-full"
//           color={isHover ? 'rgb(0 100 150)' : undefined}
//         >
//           <div>
//             <h2 className="gobold text-center text-3xl mb-5 lg:text-left">
//               {element.title}
//             </h2>
//             <p>{element.desc}</p>
//           </div>
//         </BlueFrame>
//       </div>
//     </Link>
//   );
// }

function ProjectElement({
  element,
}: {
  element: filmArticleCalls.shortFilmArticleInterface;
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      to={`/projet?id=${element.id}`}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div>
        <BlueFrame
          className="lg:flex lg:items-center"
          color={isHover ? 'rgb(0 80 150)' : undefined}
        >
          <div className="lg:w-1/2">
            <img
              src={element.poster}
              alt=""
              style={{
                borderTopLeftRadius: '3rem',
              }}
            />
          </div>
          <div className="p-7 text-white lg:w-1/2 lg:p-14 lg:max-h-full lg:p-0 lg:px-7">
            <h2 className="gobold text-2xl max-lg:text-center mb-5 lg:text-3xl xl:text-4xl">
              {element.title}
            </h2>
            <p className="max-lg:text-center xl:text-lg">{element.desc}</p>
          </div>
        </BlueFrame>
      </div>
    </Link>
  );
}
