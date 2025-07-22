import { ChangeEvent, FormEvent, useState } from 'react';
import { fetchAPI, loginTest } from '../utils';
import Cookies from 'js-cookie';
import CustomTextInput from '../components/CustomTextInput';
import { Navigate } from 'react-router-dom';

export default function Auth() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [logStop, setLogStop] = useState(false);

  if (!logStop) {
    loginTest(setIsLogged);
    setLogStop(true);
  }

  if (isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-green-2  h-screen w-full flex">
      <div className="bg-white p-28 rounded-3xl absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-1/2">
        <h1 className="text-black text-5xl text-center font-bold mb-11">
          Connexion
        </h1>
        <form
          action=""
          className="w-full text-center"
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            submitForm(userName, password, setIsLogged);
          }}
        >
          <CustomTextInput
            placeholder="Nom d'utilisateur"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.currentTarget.value)
            }
            value={userName}
          />
          <CustomTextInput
            hide
            placeholder="Mot de passe"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            value={password}
          />
          <input
            type="submit"
            value="Se connecter"
            className="bg-ip-blue text-white w-3/4 text-center  rounded p-2 cursor-pointer hover:bg-blue-dark"
          />
        </form>
      </div>
    </div>
  );
}

async function submitForm(
  username: string,
  password: string,
  setIsLogged: (b: boolean) => void,
) {
  const response = await fetchAPI({
    route: '/auth/login',
    body: {
      username,
      password,
    },
    method: 'POST',
  });

  const body = await response.json();

  console.log(body);
  if (body.token) {
    Cookies.set('authorization', body.token, { sameSite: 'Lax' });
    setIsLogged(true);
  }
}
