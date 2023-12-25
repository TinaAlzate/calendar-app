import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

export const baseURL = VITE_API_URL;

export const fetchWithBody = async (path, body = {}, method) => {

  const resp = await fetch(`${baseURL}${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'x-token': localStorage.getItem('token')
    },
    body: JSON.stringify(body)
  });

  const data = await resp.json();

  if (!data.ok) {
    throw new Error(data.msg);
  }

  return data;
}

export const fetchWithOutBody = async (path, method) => {

  const resp = await fetch(`${baseURL}${path}`, {
    method: method,
    headers: {
      'x-token': localStorage.getItem('token')
    },
  });

  const data = await resp.json();

  if (!data.ok) {
    throw new Error(data.msg);
  }

  return data;
}




