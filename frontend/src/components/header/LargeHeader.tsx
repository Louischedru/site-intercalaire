import { Link } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import HeaderLink from './HeaderLink';

export default function LargeHeader() {
  return (
    <nav className={`w-screen top-0 bg-black bg-opacity-10 z-30 p-3 fixed`}>
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
