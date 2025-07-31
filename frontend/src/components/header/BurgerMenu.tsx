import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Link, To } from 'react-router-dom';
import logo from '../../assets/logo/interprod.png';

interface Props {
  show: boolean;
  setShow: (b: boolean) => void;
}

export default function BurgerMenu({ show, setShow }: Props) {
  return (
    <div
      className={`fixed top-0 bottom-0 overflow-scroll left-0 w-screen h-screen bg-black bg-opacity-90 z-30 ${show ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ transition: '.5s' }}
    >
      <FontAwesomeIcon
        icon={faClose}
        className="text-2xl md:text-3xl absolute left-0 top-0 text-white m-5"
        onClick={() => setShow(false)}
      />
      <nav>
        <ul className="list-none text-white mt-20 text-center text-2xl uppercase font-extralight">
          <MenuLink name="Nos projets" to={'/nos-projets'} setShow={setShow} />
          <MenuLink name="Captations" to={'/captations'} setShow={setShow} />
          <MenuLink name="A venir" to={'/a-venir'} setShow={setShow} />
          <MenuLink name="Contact" to={'/contact'} setShow={setShow} />
          <li className="w-full">
            <Link to={'/'} onClick={() => setShow(false)}>
              <img
                className="block m-auto w-2/3 md:w-1/3"
                src={logo}
                alt="Accueil"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function MenuLink({
  name,
  to,
  setShow,
}: {
  name: string;
  to: To;
  setShow: (b: boolean) => void;
}) {
  return (
    <li className="mb-10">
      <Link to={to} onClick={() => setShow(false)}>
        {name}
      </Link>
    </li>
  );
}
