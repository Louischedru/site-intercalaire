import { Link, To } from 'react-router-dom';

interface Props {
  to: To;
  name: string;
}

export default function HeaderLink(props: Props) {
  return (
    <li className="w-1/6 text-white flex justify-center items-center uppercase text-lg font-extralight hover:underline">
      <Link to={props.to}>{props.name}</Link>
    </li>
  );
}
