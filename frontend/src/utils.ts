import Cookies from 'js-cookie';
import axios from 'axios';

const APIURL = 'http://192.168.1.12:8080/api/';

export const screenSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

export function atos(a: Array<string>) {
  let s = '';

  a.forEach(elem => {
    s += elem + ' ';
  });
  return s;
}

interface RequestOptions {
  route: string;
  body?: object;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export async function fetchAPI({ route, body, method }: RequestOptions) {
  const authorization = Cookies.get('authorization');
  const response = await fetch(APIURL + route, {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: authorization || '',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return response;
}

export async function fetchAPIFormData(params: RequestOptions, fd: FormData) {
  const post = async () => {
    return await axios.post(APIURL + params.route, fd);
  };

  const put = async () => {
    return await axios.put(APIURL + params.route, fd);
  };

  try {
    return {
      res:
        params.method == 'POST'
          ? await post()
          : params.method == 'PUT'
            ? await put()
            : null,
      error: null,
    };
  } catch (error) {
    return {
      res: null,
      error: error,
    };
  }
}

export enum DisplayTypes {
  Title1,
  Title2,
  Title3,
  Title4,
  Paragraph,
}

export async function loginTest(stateSetter: (b: boolean) => void) {
  const response = await fetchAPI({ route: 'logintest', raw: true });

  axios.defaults.headers.common = {
    authorization: Cookies.get('authorization') || '',
  };

  stateSetter(response.ok);
}
