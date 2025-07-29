import { ReactNode } from 'react';

export default function BlueFrame(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-ip-blue min-h-32 ${props.className}`}
      style={{
        borderTopLeftRadius: '3rem',
        borderBottomRightRadius: '3rem',
      }}
    >
      {props.children}
    </div>
  );
}
