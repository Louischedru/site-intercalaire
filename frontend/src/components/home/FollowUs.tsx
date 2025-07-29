import { ReactNode } from 'react';
import labFilms from '../../assets/medias/LABFILMS.png';
import LargeInstagramIcon from '../../assets/medias/LargeInstagramIcon';
import LargeYouTubeIcon from '../../assets/medias/LargeYouTubeIcon';

export default function FollowUs() {
  return (
    <div className="my-5">
      <div className="flex justify-center mb-8">
        <h1 className="gobold bg-ip-blue p-2 text-2xl text-white text-center inline-block lg:text-4xl lg:p-4">
          Suivez notre travail !
        </h1>
      </div>
      <div className="flex flex-wrap w-full gap-5 justify-center">
        <SocialMedia
          name="YouTube"
          desc="Visionnez nos court-métrages"
          icon={<LargeYouTubeIcon />}
          url="https://www.youtube.com/@IntercalaireProductions"
        />
        <SocialMedia
          name="LabFilms"
          desc="Consultez ntore LabFilms"
          icon={
            <div className="p-6">
              <img src={labFilms} alt="LabFIlms"></img>{' '}
            </div>
          }
          url="https://www.labfilms.org/structures/intercalaire-productions"
        />
        <SocialMedia
          name="Instagram"
          desc="Suivez notre compte Instagram"
          icon={<LargeInstagramIcon />}
          url="https://www.instagram.com/intercalaireproductions/"
        />
      </div>
    </div>
  );
}

function SocialMedia(props: {
  name: string;
  desc: string;
  icon: ReactNode;
  url: string;
}) {
  return (
    <a className="w-5/12 text-center block md:w-1/4 lg:w-1/6" href={props.url}>
      <div className="flex m-auto justify-center border-4 rounded-full aspect-square items-center w-11/12 mb-4 md:w-10/12 lg:w-11/12 xl:w-9/12 2xl:w-8/12">
        {props.icon}
      </div>
      <div className="font-extrabold">{props.name}</div>
      <div>{props.desc}</div>
    </a>
  );
}
