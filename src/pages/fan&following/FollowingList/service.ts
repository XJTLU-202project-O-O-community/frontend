import { request } from 'umi';
import type { BasicListItemDataType } from './data.d';

type ParamsType = {
  count?: number;
} & Partial<BasicListItemDataType>;

export async function queryFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/fans/following/', {
    params,
  });
}

// export async function removeFakeList(
//   params: ParamsType,
// ): Promise<{ data: { list: BasicListItemDataType[] } }> {
//   return request('/api/post_fake_list_following', {
//     method: 'POST',
//     data: {
//       ...params,
//     },
//   });
// }

// export async function addFakeList(
//   params: ParamsType,
// ): Promise<{ data: { list: BasicListItemDataType[] } }> {
//   return request('/api/post_fake_list_following', {
//     method: 'POST',
//     data: {
//       ...params,
//     },
//   });
// }

