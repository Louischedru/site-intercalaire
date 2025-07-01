export default function FacebookIcon({
  className,
  color,
}: {
  className?: string;
  color?: boolean;
}) {
  if (!className) className = '';
  if (!color) color = false;
  return color ? (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
      <path
        fill="#fff"
        d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
      ></path>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0,0,256,256"
    >
      <g
        fill="#ffffff"
        fill-rule="none"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
      >
        <g transform="scale(4,4)">
          <path
            d="M35,50.618l-6,0.882v-14.5h-4v-5.029h4c0,0 0,-2.572 0,-5.226c0,-1.524 0.605,-2.985 1.683,-4.062c1.077,-1.078 2.538,-1.683 4.062,-1.683h4.255v4c0,0 -0.827,0 -1.73,0c-1.254,0 -2.27,1.016 -2.27,2.27v4.73l6,-0.029l-2,5.029h-4z"
            fill-rule="evenodd"
          ></path>
          <path
            d="M32,54c-12.131,0 -22,-9.869 -22,-22c0,-12.131 9.869,-22 22,-22c12.131,0 22,9.869 22,22c0,12.131 -9.869,22 -22,22zM32,14c-9.925,0 -18,8.075 -18,18c0,9.925 8.075,18 18,18c9.925,0 18,-8.075 18,-18c0,-9.925 -8.075,-18 -18,-18z"
            fill-rule="nonzero"
          ></path>
        </g>
      </g>
    </svg>
  );
}
