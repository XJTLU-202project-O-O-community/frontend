import { request } from 'umi';

export const getFollowingList = async(user_id) => {
    const url = `/server/fans/following/?user_id=${user_id}`;
    return request(url);
};
