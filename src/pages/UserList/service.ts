import { request } from 'umi';
import type { BasicListItemDataType } from './data.d';

type ParamsType = {
  count?: number;
  index?: number;
} & Partial<BasicListItemDataType>;

export async function queryList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/get_list_user', {
    params,
  });
}


export async function removeFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list_user', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list_user', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list_user', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
