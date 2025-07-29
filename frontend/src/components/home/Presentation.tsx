import BlueFrame from '../BlueFrame';
import SimpleImage from '../FDCs/SimpleImage';
import SimpleText from '../FDCs/SimpleText';

export default function Presentation() {
  return (
    <div className="p-5 md:flex md:items-center lg:px-10 lg:py-0">
      <BlueFrame className="p-5 md:w-2/3 md:p-7 lg:p-10 lg:my-10 xl:w-1/2">
        <h1 className="gobold text-2xl text-center text-white mb-3 lg:text-4xl">
          Qui sommes-nous ?
        </h1>
        <div className="text-white text-center lg:text-lg">
          <SimpleText itemKey="home.presentation" />
        </div>
      </BlueFrame>
      <div className="max-sm:m-5 md:w-1/3 md:ml-5 lg:ml-10 xl:w-1/2">
        <SimpleImage
          itemKey="home.logo"
          className="w-2/3 block m-auto md:w-full xl:w-1/2"
        />
      </div>
    </div>
  );
}
