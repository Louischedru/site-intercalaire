import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ReactNode } from 'react';

interface Props {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value: string;
  type: 'image' | 'other';
  file?: File;
  visualize?: ReactNode;
}

export default function FileInput(props: Props) {
  return (
    <div className="">
      <div className="flex justify-center">
        <label
          htmlFor={props.id}
          className="inline-block font-bold mb-3 text-white bg-ip-blue p-2 cursor-pointer text-center"
        >
          <FontAwesomeIcon icon={faPlus} /> Impoter une image
        </label>
        <input
          style={{ display: 'none' }}
          name={props.name}
          type="file"
          onChange={props.onChange}
          id={props.id}
          value={props.value}
        />
      </div>
      <div className="">{props.visualize}</div>
    </div>
  );
}
