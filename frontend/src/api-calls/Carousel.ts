import { fetchAPI, fetchAPIFormData } from '../utils';

export interface CarouselInterface {
  id: number;
  alt: string;
  image: string;
  url?: string;
  title?: string;
  desc?: string;
  color?: string;
  textColor?: string;
}

export async function getOne(carouselId: string) {
  const response = await fetchAPI({
    route: 'carousel/' + carouselId,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
    return null;
  }
  return await response.json();
}

export async function create(carousselId: string, file?: File) {
  const fd = new FormData();

  if (!File) {
    throw new Error('Aucun fichier sélectionné');
    return null;
  }

  fd.append('file', file as File);

  const response = await fetchAPIFormData(
    {
      route: 'carousel/create/' + carousselId,
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
    alt: string;
    title?: string;
    desc?: string;
    url?: string;
    color?: string;
    textColor?: string;
  },
) {
  const response = await fetchAPI({
    route: `carousel/modifyother/${id}`,
    method: 'PUT',
    body,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
    return null;
  }

  return await response.json();
}
