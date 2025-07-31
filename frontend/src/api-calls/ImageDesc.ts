import { fetchAPI, fetchAPIFormData } from '../utils';

export interface ImageDescInterface {
  id: number;
  desc: string;
  title: string;
  alt: string;
  url: string;
}

export async function getList(list: string) {
  const response = await fetchAPI({
    route: '/imagedesc/' + list,
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function addToList(list: string, file?: File) {
  if (!file) {
    throw Error('No file provided');
    return null;
  }
  const fd = new FormData();
  fd.append('file', file as File);

  const response = await fetchAPIFormData(
    {
      route: '/imagedesc/create/' + list,
      method: 'PUT',
    },
    fd,
  );

  if (response.error) {
    throw response.error;
    return null;
  }

  return response.res;
}

export async function modifyOther(
  id: number,
  body: { desc: string; title: string; alt: string },
) {
  const response = await fetchAPI({
    route: `/imagedesc/modifyother/${id}`,
    method: 'PUT',
    body,
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function modifyImage(id: number, file?: File) {
  if (!file) {
    throw Error('No file provided');
    return null;
  }

  const fd = new FormData();
  fd.append('file', file as File);

  const response = await fetchAPIFormData(
    {
      route: `/imagedesc/modifyimage/${id}`,
      method: 'PUT',
    },
    fd,
  );

  if (response.error) {
    throw response.error;
    return null;
  }

  return response.res;
}

export async function deleteOne(id: number) {
  const response = await fetchAPI({
    route: `/imagedesc/${id}`,
    method: 'DELETE',
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}
