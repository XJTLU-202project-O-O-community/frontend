import { request } from 'umi';

export const createNewGroup = async (params) => {
  return request('/api/fans/group/', { method: 'post', data: params });
};

export const changeGroupName = async (params) => {
  return request('/api/fans/group_edit/', { method: 'post', data: params });
};

export const deleteGroup = async (params) => {
  return request('/api/fans/group_delete/', { method: 'post', data: params });
};

export const changeUserGroup = async (params) => {
  return request('/api/fans/following_group_change/', { method: 'post', data: params });
};
