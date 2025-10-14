import { fetchAPI } from '../utils';

export default async function sendMail(body: {
  name: string;
  firstname: string;
  subject: string;
  email: string;
  message: string;
}) {
  const response = await fetchAPI({
    method: 'POST',
    route: '/mail',
    body,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
    return null;
  }

  return await response.json();
}
