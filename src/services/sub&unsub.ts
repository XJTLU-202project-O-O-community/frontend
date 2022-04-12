import { request } from 'umi';

export const sendSub = async (params) => {
  return request('/api/user/currentUser/', { method: 'post', params: params });
};

export const sendUnsub = async (params) => {
  return request('/api/fans/following_delete/', { method: 'post', params: params });
};
