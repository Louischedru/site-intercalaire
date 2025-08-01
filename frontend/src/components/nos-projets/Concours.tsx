import Title from '../Title';
import * as imageDescCalls from '../../api-calls/ImageDesc';
import { ReactNode } from 'react';
import ImageDesc from '../FDCs/ImageDesc';
import Markdown, { Components } from 'react-markdown';
import Carousel from 'react-multi-carousel';

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

export default function Concours() {
  return (
    <div className="">
      <Title name="Concours" />
      <ImageDesc list="concours" Container={Container} ItemModel={ItemModel} />
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
