import { fetchAPI } from '../utils';

export interface SimpleTextInterface {
  data: string;
}

export async function getAll() {
  const response = await fetchAPI({
    route: '/simpletext',
    method: 'GET',
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function getOne(itemKey: string) {
  const response = await fetchAPI({
    route: '/simpletext/' + itemKey,
    method: 'GET',
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function create(itemKey: string) {
  const response = await fetchAPI({
    route: '/simpletext',
    method: 'POST',
    body: { itemKey, data: '' },
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function modify(itemkey: string, data: string) {
  const response = await fetchAPI({
    route: '/simpletext/' + itemkey,
    method: 'PUT',
    body: { data },
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}
