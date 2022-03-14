import { request } from 'umi';
export const getWholePosts = async () => {
  return request('/api/posts/');
};
