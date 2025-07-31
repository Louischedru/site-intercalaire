import { Link } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import HeaderLink from './HeaderLink';

interface Props {
  isScrolled: boolean;
  isHome: boolean;
}

export default function LargeHeader(props: Props) {
  return (
    <nav
      className={`w-screen top-0 bg-black ${
        props.isScrolled || !props.isHome ? 'bg-opacity-80' : 'bg-opacity-10'
      } z-30 p-3 ${props.isHome ? 'fixed' : 'sticky'}`}
      style={{ transitionDuration: '.5s' }}
    >
      <ul className="flex justify-center">
        <li className="w-1/6">
          <Link to={'/'}>
            <HeaderLogo />
          </Link>
        </li>
        <HeaderLink to={'/nos-projets'} name="nos projets" />
        <HeaderLink to={'/captations'} name="captations" />
        <HeaderLink to={'/a-venir'} name="à venir" />
        <HeaderLink to={'/contact'} name="contact" />
      </ul>
    </nav>
  );
}
