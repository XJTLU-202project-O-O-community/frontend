import { request } from 'umi';
import type { BasicListItemDataType } from './data.d';

type ParamsType = {
  current_User_id?: string;
  targeted_User_id?: string;
} & Partial<BasicListItemDataType>;

export async function searchUser(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/xxx/xxx/', {
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
