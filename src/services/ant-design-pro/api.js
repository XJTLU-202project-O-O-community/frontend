// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options) {
  return request('/api/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/user/login */

export async function login(body, options) {
  return request('/api/user/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `email=${body.email}&password=${body.password}`,
    ...(options || {}),
  });
}

/** 邮箱登录接口 POST /api/user/email_login/ */

export async function email_login(body, options) {
  return request('/api/user/email_login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `email=${body.email}&given_verification=${body.given_verification}`,
    ...(options || {}),
  });
}

/** 邮箱验证接口 GET /api/user/send_email/ */

export async function email_verification(body, options) {
  return request('/api/user/send_email/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `email=${body.email}`,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register/ */

export async function this_register(body, options) {
  return request('/api/user/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `username=${body.username}&password=${body.password}&email=${body.email}&given_verification=${body.given_verification}&gender=${body.gender}&actual_name=${body.actualName}&birth=${body.birth}`,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/rule */

export async function rule(params, options) {
  return request('/api/rule', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/rule */

export async function updateRule(options) {
  return request('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addRule(options) {
  return request('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeRule(options) {
  return request('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
