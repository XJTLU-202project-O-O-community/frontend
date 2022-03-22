import { request } from 'umi';

import post from '../../mock/post';
export const getWholePosts = async () => {
  return request('/api/posts/');
};

export const getPersonalPosts = async () => {
  return request('/api/postPersonal/');
};

export const add = async (params) => {
  console.log(params);
  return request('/api/addMoment/', { method: 'post', data: params });
};
