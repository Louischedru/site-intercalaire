import { ReactNode } from 'react';
import '../styles/ThemedText.scss';

interface Props {
  children: ReactNode;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  className?: string;
}

export default function ThemedText({ children, type, className }: Props) {
  return (
    <>
      {type == 'h1' ? (
        <h1 className={`ThemedText text-7xl text-center font-black`}>
          {children}
        </h1>
      ) : type == 'h2' ? (
        <h2
          className={`ThemedText text-3xl lg:text-6xl text font-black mb-2 ${className}`}
        >
          {children}
        </h2>
      ) : type == 'h3' ? (
        <h3
          className={`ThemedText text-2xl lg:text-4xl text font-black mb-2 ${className}`}
        >
          <div className={`inline-block ${className}`}>{children}</div>
        </h3>
      ) : type == 'h4' ? (
        <h4 className={`ThemedText text-7xl text-center font-black`}>
          <div className={`inline-block ${className}`}>{children}</div>
        </h4>
      ) : type == 'p' ? (
        <p className={`text-xl mb-3 xl:text-2xl ThemedText ${className}`}>
          {children}
        </p>
      ) : null}
    </>
  );
}
