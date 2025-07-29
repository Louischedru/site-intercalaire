import { Link } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import HeaderLink from './HeaderLink';

interface Props {
  isScrolled: boolean;
}

export default function LargeHeader(props: Props) {
  return (
    <nav
      className={`w-screen top-0 bg-black ${props.isScrolled ? 'bg-opacity-80' : 'bg-opacity-10'} z-30 p-3 fixed`}
      style={{ transitionDuration: '.5s' }}
    >
      <ul className="flex justify-center">
        <li className="w-1/6">
          <Link to={'/'}>
            <HeaderLogo />
          </Link>
        </li>
        <HeaderLink to={'/'} name="nos projets" />
        <HeaderLink to={'/'} name="captations" />
        <HeaderLink to={'/'} name="à venir" />
        <HeaderLink to={'/'} name="contact" />
      </ul>
    </nav>
  );
}
