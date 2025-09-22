import PageHeader from '../components/PageHeader';
// import * as imageDescCalls from '../api-calls/ImageDesc';
// import ImageDesc from '../components/FDCs/ImageDesc';
// import { ReactNode } from 'react';

// export default function Captations() {
//   return (
//     <div>
//       <PageHeader
//         title="Captations"
//         textKey="captations.header"
//         imageKey="page-headers.captations"
//       />
//       <div className="ip-bg p-5">
//         <ImageDesc
//           list="captations"
//           Container={Container}
//           ItemModel={ItemModel}
//         />
//       </div>
//     </div>
//   );
// }

// function ItemModel(props: {
//   element: imageDescCalls.ImageDescInterface;
//   onClick: () => void;
// }) {
//   return (
//     <div onClick={props.onClick}>
//       <img src={props.element.url} alt={props.element.alt} />
//     </div>
//   );
// }

// function Container(props: { children: ReactNode }) {
//   return <div className="grid grid-cols-1 gap-2">{props.children}</div>;
// }

import * as imageDescCalls from '../api-calls/ImageDesc';
import { ReactNode } from 'react';
import ImageDesc from '../components/FDCs/ImageDesc';
import Markdown, { Components } from 'react-markdown';
import Carousel from 'react-multi-carousel';
import BlueFrame from '../components/BlueFrame';
import { Link } from 'react-router-dom';
import Title from '../components/Title';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

const mdComponents: Components = {
  strong({ children }) {
    return <b>{children}</b>;
  },
  em({ children }) {
    return <i>{children}</i>;
  },
  a({ children, href }) {
    return (
      <a href={href} className="hover:underline text-[#bee0ff]">
        {children}
      </a>
    );
  },
};

export default function Captations() {
  return (
    <div className="">
      <PageHeader
        title="Captations"
        textKey="captations.header"
        imageKey="page-headers.captations"
      />
      <div className="ip-bg py-10">
        <Title name="Exemples de captations" />
        <ImageDesc
          list="captations"
          Container={Container}
          ItemModel={ItemModel}
        />
        <BlueFrame className="p-6 mt-10 mx-3 md:mx-16 md:p-10 lg:p-20 lg:mx-24">
          <p className="gobold text-xl text-white leading-snug text-center md:text-3xl">
            Vous souhaitez réaliser une captation pour un évènement ?{' '}
            <Link className="gobold text-[#a4e7ff]" to={'/contact'}>
              Contactez-nous
            </Link>{' '}
            !
          </p>
        </BlueFrame>
      </div>
    </div>
  );
}

function ItemModel(props: {
  element: imageDescCalls.ImageDescInterface;
  onClick: () => void;
}) {
  const { element } = props;
  return (
    <div onClick={props.onClick} className="h-full flex items-center">
      <div className="p-2">
        <div className="mb-1">
          <img src={element.url} alt={element.alt} />
        </div>
        <div className="bg-ip-blue p-3 text-white">
          <h3 className="text-xl font-extrabold mb-2">{element.title}</h3>
          <Markdown components={mdComponents}>{element.desc}</Markdown>
        </div>
      </div>
    </div>
  );
}

function Container(props: { children: ReactNode }) {
  return (
    <div className="p-2 bg-almost-white md:p-4">
      <Carousel responsive={responsive}>{props.children}</Carousel>
    </div>
  );
}
