import { fetchAPI, fetchAPIFormData } from '../utils';

export interface SimpleImageInterface {
  url: string;
  alt: string;
}

export async function getOne(itemKey: string) {
  const response = await fetchAPI({
    route: '/simpleimage/' + itemKey,
    method: 'GET',
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function modifyImage(itemKey: string, file?: File) {
  const fd = new FormData();

  if (!file) {
    throw Error('Aucun fichier sélectionné');
    return null;
  }

  fd.append('file', file as File);

  const response = await fetchAPIFormData(
    {
      route: '/simpleimage/image/' + itemKey,
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

export async function modifyAlt(itemKey: string, alt: string) {
  const response = await fetchAPI({
    route: '/simpleimage/alt/' + itemKey,
    method: 'PUT',
    body: { alt },
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function create(itemKey: string) {
  const response = await fetchAPI({
    route: '/simpleimage',
    method: 'POST',
    body: { itemKey },
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function getAll() {
  const response = await fetchAPI({
    route: '/simpleimage',
    method: 'GET',
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}
