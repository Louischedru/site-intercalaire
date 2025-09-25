import { fetchAPI, fetchAPIFormData } from '../utils';

export async function getOne(id: number) {
  const response = await fetchAPI({
    route: `/articleimage/${id}`,
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function create(file?: File) {
  if (!file) {
    throw Error('No file provided');
    return null;
  }
  const fd = new FormData();
  fd.append('file', file as File);

  const response = await fetchAPIFormData(
    {
      route: `/articleimage`,
      method: 'POST',
    },
    fd,
  );

  if (response.error) {
    throw response.error;
    return null;
  }

  return response.res;
}

export async function modifyAlt(id: number, alt: string) {
  const response = await fetchAPI({
    route: `/articleimage/alt/${id}`,
    method: 'PUT',
    body: { alt },
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
      route: `/articleimage/image/${id}`,
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
    route: `/articleimage/${id}`,
    method: 'DELETE',
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}
