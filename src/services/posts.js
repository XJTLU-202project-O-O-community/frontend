import { request } from 'umi';

import { method } from 'lodash';
export const getWholePosts = async () => {
  return request('/api/posting/momments/');
};

export const getPersonalPosts = async (params) => {
  return request(`/api/posting/moment/?userid=${params.userid}`, { method: 'get' });
};

export const add = async (params) => {
  console.log(params.imgs);
  let strr = '';
  for (var i = 0; i < params.imgs.length; i++) {
    console.log(params.imgs[i].name, i);
    strr += params.imgs[i].name + ',';
  }
  console.log(strr, 8888);

  return request(`/api/posting/moment/`, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: `user_id=${params.user_id}&content=${params.content}&imglist=${strr}`,
  });
};

export const Delete = async (params) => {
  return request('/api/posting/delete/', { method: 'post', data: params });
};

export const Profile = async () => {
  return request('/api/posting/edit/', { method: 'get' });
};

// export const getWholePosts = async () => {
//   return request('/api/posts/');
// };
//
// export const getPersonalPosts = async () => {
//   return request('/api/postPersonal/');
// };
//
// export const add = async (params) => {
//   console.log(params);
//   return request('/api/addMoment/', { method: 'post', data: params });
// };
//
// export const Delete = async (params) => {
//   return request('/api/deleteMoment/', { method: 'post', data: params });
// };
//
// export const Profile = async () => {
//   return request('/api/indexProfile', { method: 'get' });
// };
