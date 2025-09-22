import { fetchAPI, fetchAPIFormData } from '../utils';

export interface shortFilmArticleInterface {
  poster: string;
  title: string;
  id: number;
}

export interface fullFilmArticleInterface {
  poster: string;
  title: string;
  desc: string;
  id: number;
  article: string;
  images: string;
  synopsis?: string;
  info?: string;
  url?: string;
}

export async function getPublished(page: string) {
  const response = await fetchAPI({
    route: '/filmarticle/published/' + page,
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function getDrafts(page: string) {
  const response = await fetchAPI({
    route: '/filmarticle/drafts/' + page,
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function getOnePublic(id: number) {
  const response = await fetchAPI({
    route: `/filmarticle/onepublic/${id}`,
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function getOnePrivate(id: number) {
  const response = await fetchAPI({
    route: `/filmarticle/oneprivate/${id}`,
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function create(body: {
  title: string;
  desc: string;
  article: string;
  page: string;
  synopsis?: string;
  info?: string;
  url?: string;
  iùages?: string;
}) {
  const response = await fetchAPI({
    route: '/filmarticle',
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function modifyPoster(id: number, file?: File) {
  if (!file) {
    throw Error('No file provided');
    return null;
  }
  const fd = new FormData();
  fd.append('file', file as File);

  const response = await fetchAPIFormData(
    {
      route: `/filmarticle/poster/${id}`,
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
  body: {
    title: string;
    desc: string;
    article: string;
    page: string;
    synopsis?: string;
    info?: string;
    url?: string;
    images?: string;
  },
) {
  const response = await fetchAPI({
    route: `/filmarticle/other/${id}`,
    method: 'PUT',
    body,
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function setPublished(id: number, published: boolean) {
  const response = await fetchAPI({
    route: `/filmarticle/setpublished/${id}`,
    method: 'PUT',
    body: { published },
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}

export async function deleteOne(id: number) {
  const response = await fetchAPI({
    route: `/filmarticle/${id}`,
    method: 'DELETE',
  });

  if (!response.ok) {
    throw Error(response.statusText);
    return null;
  }

  return await response.json();
}
