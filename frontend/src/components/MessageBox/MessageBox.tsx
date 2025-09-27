import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MessageBox(props: {
  status: boolean;
  message?: string;
}) {
  return (
    <div
      className={`fixed top-0 left-0 p-3 w-screen text-center ${props.status ? 'bg-[#4ed026]' : 'bg-[#c84242]'}`}
    >
      {props.status ? (
        <FontAwesomeIcon icon={faCheck} />
      ) : (
        <FontAwesomeIcon icon={faClose} />
      )}{' '}
      {props.message}
    </div>
  );
}
