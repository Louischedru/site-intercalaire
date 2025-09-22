import { ChangeEvent, useEffect, useState } from 'react';

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  id: string;
}

export default function TextArea(props: Props) {
  const [newValue, setNewValue] = useState(props.value);
  useEffect(() => {
    setNewValue(props.value);
  }, [props.value]);
  return (
    <div>
      <label className="block font-bold mb-3" htmlFor={props.id}>
        {props.name}
      </label>
      <textarea
        className="block w-full border p-1"
        name={props.name}
        rows={5}
        onChange={props.onChange}
        id={props.id}
        onClick={() => console.log(props.value)}
        value={newValue}
      >
        {/* {newValue} */}
      </textarea>
    </div>
  );
}
