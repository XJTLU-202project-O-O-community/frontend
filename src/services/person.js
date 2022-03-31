import { request } from 'umi';

export const GetPersonInfo = async () => {
  return request(' /api/user/currentUser/', { method: 'get' });
};