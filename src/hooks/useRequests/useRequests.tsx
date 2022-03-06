import { UserType } from '../../types/api';

type HTTPRequest = 'GET' | 'POST' | 'PUT' | 'OPTION' | 'DELETE' | 'HEAD';

type RequestParams = {
  method: HTTPRequest;
  end_point: string;
  data?: Record<string, unknown> | string | number;
};

const BACK_URL = 'https://bbaavlvvk2c300m87h29.containers.yandexcloud.net';

export const api_places = '/api/places/';
export const api_user = '/api/current-user/';
export const api_register = '/api/register/';
export const api_token = '/api/token/';
export const api_token_refresh = '/api/token/refresh/';

type ResponseType = {
  error: {
    error: boolean;
    message?: unknown;
  };
  data: unknown;
};

const getFetchInitialData = (
  method: HTTPRequest,
  body: RequestParams['data']
): RequestInit => {
  const init: RequestInit = {
    method,
    cache: 'no-cache',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (method === 'POST' || method === 'PUT') {
    init.body = JSON.stringify(body) as BodyInit;
  }
  return init;
};

async function sendRequest(params: RequestParams): Promise<ResponseType> {
  const { method, end_point, data } = params;
  return fetch(
    BACK_URL.concat(end_point),
    getFetchInitialData(method, data)
  ).then(async (response) => {
    if (
      Math.trunc(response.status / 100) === 4 ||
      Math.trunc(response.status / 100) === 5 ||
      response.status === 429
    ) {
      const message = await response.json();
      return {
        data: {},
        error: { error: true, message: message.detail },
      };
    }
    const res = await response.json();
    return {
      data: res,
      error: { error: false },
    };
  });
}

export const useRequests = () => {
  const getPlaces = async (search?: string) => {
    return sendRequest({
      method: 'GET',
      end_point: `${api_places}${search ? `?search=${search}` : ''}`,
    });
  };

  const getPlaceById = async (id: number) => {
    return sendRequest({
      method: 'GET',
      end_point: `${api_places}/${id}`,
    });
  };

  const getCurrentUser = async () => {
    return sendRequest({
      method: 'GET',
      end_point: api_user,
    });
  };

  const postRegister = async (user: UserType) => {
    return sendRequest({
      method: 'POST',
      end_point: api_register,
      data: user,
    });
  };

  const postToken = async (user: UserType) => {
    return sendRequest({
      method: 'POST',
      end_point: api_token,
      data: user,
    });
  };

  const postRefresh = async (refresh: string) => {
    return sendRequest({
      method: 'GET',
      end_point: api_token_refresh,
      data: refresh,
    });
  };

  return {
    getPlaces,
    getPlaceById,
    getCurrentUser,
    postRefresh,
    postRegister,
    postToken,
  };
};
