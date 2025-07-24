import { CarouselInterface } from '../../api-calls/Carousel';

interface Props {
  image: CarouselInterface | null;
  page: string;
  title?: string;
  desc?: string;
  color?: string;
  textColor?: string;
  preview?: File;
}

export default function Visualizer(props: Props) {
  const previewUrl =
    (props.preview && URL.createObjectURL(props.preview)) || null;
  const src = previewUrl || props.image?.image || '';

  if (props.page == 'home')
    return src != '' ? (
      <div className="relative  bg-black w-screen h-screen">
        <img src={src} alt="" className="blur-xl w-full h-screen" />
        <img
          src={src}
          alt=""
          className="w-1/2 absolute right-10 top-1/2 -translate-y-1/2"
        />
        <div className="absolute left-10 top-1/2 -translate-y-1/2 w-1/3">
          <h1
            className="gobold p-5 text-5xl inline-block leading-snug"
            style={{
              backgroundColor: props.color,
              color: props.textColor,
            }}
          >
            {props.title}
          </h1>
          <p className="p-2 bg-white text-black mt-5">{props.desc}</p>
        </div>
      </div>
    ) : (
      <></>
    );
  else
    return src != '' ? (
      <div className="flex justify-center">
        <img src={src} alt="" className="w-1/3" />
      </div>
    ) : (
      <></>
    );
}
