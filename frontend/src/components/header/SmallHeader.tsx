import { Link } from 'react-router-dom';
import logo from '../../assets/logo/interprod.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import BurgerMenu from './BurgerMenu';

interface Props {
  isScrolled: boolean;
  isHome: boolean;
}

export default function SmallHeader(props: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <BurgerMenu show={showMenu} setShow={setShowMenu} />
      <div
        className={`bg-black p-3 ${
          props.isScrolled || !props.isHome ? 'bg-opacity-80' : 'bg-opacity-10'
        } top-0 left-0 z-20 ${props.isHome ? 'fixed' : 'sticky'}`}
        style={{ transitionDuration: '.5s' }}
      >
        <div className="list-none flex items-center">
          <div className="w-1/3 md:w-1/4">
            <Link to="/">
              <img src={logo} alt="Logo de Intercalaire Productions" />
            </Link>
          </div>
          <div className="w-2/3 md:w-3/4 text-white text-2xl md:text-4xl flex items-center justify-end">
            <FontAwesomeIcon icon={faBars} onClick={() => setShowMenu(true)} />
          </div>
        </div>
      </div>
    </>
  );
}
