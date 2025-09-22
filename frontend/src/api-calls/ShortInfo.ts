import { fetchAPI } from '../utils';

export interface ShortInfoInterface {
  data: string;
}

export async function getAll() {
  const response = await fetchAPI({
    route: '/shortinfo',
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
    route: '/shortinfo/' + itemKey,
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
    route: '/shortinfo',
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
    route: '/shortinfo/' + itemkey,
    method: 'PUT',
    body: { data },
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}
