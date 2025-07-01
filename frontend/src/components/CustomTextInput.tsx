import { ChangeEvent } from 'react';

interface Props {
  hide?: boolean;
  dark?: boolean;
  placeholder?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomTextInput({ hide, dark, ...attributes }: Props) {
  return (
    <input
      type={hide ? 'password' : 'text'}
      {...attributes}
      className={`block text-lg border border-solid p-2 rounded-md mb-5 mt-5 ${dark ? 'text-white border-white bg-black' : 'text-black border-black bg-white'}`}
    />
  );
}
