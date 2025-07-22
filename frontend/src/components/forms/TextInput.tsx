import { ChangeEvent } from 'react';

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

export default function TextInput(props: Props) {
  return (
    <div>
      <label className="font-bold block pb-2" htmlFor={props.id}>
        {props.name}
      </label>
      <input
        type="text"
        id={props.id}
        onChange={props.onChange}
        className="block p-1 w-full border"
      />
    </div>
  );
}
