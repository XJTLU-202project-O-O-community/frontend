import { request } from 'umi';
import type { BasicListItemDataType } from './data.d';

type ParamsType = {
  user_id?: string;
} & Partial<BasicListItemDataType>;

type ParamsType1 = {
  user_id?: string;
  keyword?: string;
} & Partial<BasicListItemDataType>;

export async function queryFakeList(
  params: ParamsType
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/fans/fans/', {
    params,
  });
}

export async function searchWithinFan(
  params: ParamsType1,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/fans/search/', {
    params,
  });
}

// export async function removeFakeList(
//   params: ParamsType,
// ): Promise<{ data: { list: BasicListItemDataType[] } }> {
//   return request('/api/fans/following/', {
//     method: 'POST',
//     data: {
//       ...params,
//     },
//   });
// }

// export async function addFakeList(
//   params: ParamsType,
// ): Promise<{ data: { list: BasicListItemDataType[] } }> {
//   return request('/api/post_fake_list_fan', {
//     method: 'POST',
//     data: {
//       ...params,
//     },
//   });
// }
