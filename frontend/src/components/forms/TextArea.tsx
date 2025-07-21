import { ChangeEvent } from 'react';

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea(props: Props) {
  return (
    <div>
      <label className="block font-bold mb-3" htmlFor={props.name}>
        {props.name}
      </label>
      <textarea className="block w-full border p-1" name={props.name} rows={5}>
        {props.value}
      </textarea>
    </div>
  );
}
