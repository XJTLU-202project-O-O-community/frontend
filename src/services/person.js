import { request } from 'umi';

export const GetPersonInfo = async (params) => {
  return request('/api/user/currentUser/', { method: 'get', params: params });
};

export const changeProfile = async (params) => {
  return request('/api/user/changeProfile/', { method: 'post', data: params });
};
