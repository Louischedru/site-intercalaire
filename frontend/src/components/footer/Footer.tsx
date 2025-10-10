import logo from '../../assets/logo/logo-noir.png';
import SimpleText from '../FDCs/SimpleText';
import InstagramIcon from '../../assets/medias/InstagramIcon';
import FacebookIcon from '../../assets/medias/FacebookIcon';
import YouTubeIcon from '../../assets/medias/YouTubeIcon';
import SoundClousIcon from '../../assets/medias/SoundCloudIcon';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="bg-white p-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-center lg:px-32 lg:gap-8">
      <div className=" lg:w-1/3">
        <img
          className="block m-auto w-2/3 md:w-1/3 lg:w-2/3 xl:w-1/2"
          src={logo}
          alt="Logo de Intercalaire Productions"
        />
      </div>
      <div className="lg:flex lg:flex-col lg:w-1/3">
        <div className="text-center lg:text-left">
          <SimpleText itemKey="contact.email-and-phone" />
        </div>
        <div className="flex gap-2 justify-center mt-5 lg:justify-start">
          <a
            className="bg-black rounded-full p-2"
            href="https://www.instagram.com/intercalaireproductions/"
          >
            <InstagramIcon />{' '}
          </a>{' '}
          <a
            className="bg-black rounded-full p-2"
            href="https://www.facebook.com/intercalaireprod"
          >
            <FacebookIcon size="32" />
          </a>
          <a
            className="bg-black rounded-full p-2"
            href="https://www.youtube.com/@IntercalaireProductions"
          >
            <YouTubeIcon />{' '}
          </a>
          <a
            className="bg-black rounded-full p-2"
            href="https://soundcloud.com/intercalaireproductions"
          >
            <SoundClousIcon />
          </a>
        </div>
      </div>
      <div className="text-center lg:text-left lg:flex lg:flex-col lg:w-1/3">
        <div className="mb-2">
          <a
            href="https://fr.tipeee.com/intercalaire-productions"
            className="font-bold hover:underline mb-2"
          >
            Faire un don
          </a>
        </div>
        <div className="">
          <Link to={'/mentions-legales'} className="font-bold hover:underline">
            Mentions légales
          </Link>
        </div>
      </div>
    </div>
  );
}
