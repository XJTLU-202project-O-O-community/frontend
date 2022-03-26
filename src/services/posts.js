import { request } from 'umi';

import post from '../../mock/post';
import { method } from 'lodash';
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

export const Delete = async (params) => {
  return request('/api/deleteMoment/', { method: 'post', data: params });
};

export const Profile = async () => {
  return request('/api/indexProfile', { method: 'get' });
};
