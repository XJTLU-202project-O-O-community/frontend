import { request } from 'umi';

export const sendSub = async (params) => {
  return request('/api/fans/following/', { method: 'post', data: params });
};

export const sendUnsub = async (params) => {
  return request('/api/fans/following_delete/', { method: 'post', data: params });
};
