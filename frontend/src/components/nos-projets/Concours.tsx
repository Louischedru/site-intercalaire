import Title from '../Title';
import * as imageDescCalls from '../../api-calls/ImageDesc';
import { ReactNode } from 'react';
import ImageDesc from '../FDCs/ImageDesc';

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
    <div onClick={props.onClick}>
      <div>
        <img src={element.url} alt={element.alt} />
      </div>
      <div>
        <h3>{element.title}</h3>
        <p>{element.desc}</p>
      </div>
    </div>
  );
}

function Container(props: { children: ReactNode }) {
  return <div>{props.children}</div>;
}
