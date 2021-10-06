export const BaseUrl = 'http://localhost:8000';

export enum LocalStorage {
  Token = 'ChatToken',
}

export const action = async (
  {
    path,
    method,
    data,
  }: {
    path: string;
    method: string;
    data?: any;
  },
  r: (v: any) => void,
  e: (v: any) => void
) => {
  try {
    const res = await fetch(`${BaseUrl}${path}`, {
      method,
      body: JSON.stringify(data),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(LocalStorage.Token) || '',
      },
    });

    if (!res.ok) {
      throw Error('Unable to perform this action');
    }

    const d = await res.json();

    r(d);
  } catch (error: any) {
    e(error);
  }
};
