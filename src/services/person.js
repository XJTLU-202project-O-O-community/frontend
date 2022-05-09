import { request } from 'umi';

export const GetPersonInfo = async (params) => {
  return request('/api/user/currentUser/', { method: 'get', params: params });
};

export const EditProfile = async (params) => {
  console.log(params.upAvatar);
  let photo = '';
  if (params.upAvatar != null) {
    console.log('name of avatar is');
    console.log(params.upAvatar[0].name);
    photo = params.upAvatar[0].name;
  }
  console.log(photo, 6931);
  return request(`/api/user/personal_info_edit/`, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: `new_username=${params.username}&actual_name=${params.name}&gender=${params.gender}&birth=${params.birth}&city=${params.city}&signature=${params.text}&photo=${photo}&user_id=${params.user_id}`,
  });
};

export const changePicB = async (params) => {
  return request(`/api/user/personal_info_edit/`, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: `background=${params}`,
  });
};

export const searchPerson = async (params) => {
  return request(`/api/user/search/?username=${params}`, { method: 'get' });
};
