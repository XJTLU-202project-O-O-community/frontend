import { request } from 'umi';

  export const sousuo = async (params) => {
    return request('/api/deleteMoment/', { method: 'get', data: params });
  };