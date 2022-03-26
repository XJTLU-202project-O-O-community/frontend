import { request } from 'umi';

export const getMessageList = async(user_id) => {
    const url = `/server/chat/messagelist/?user_id=${user_id}`;
    return request(url);
};

export const getHistory = async(user_id, target_id) => {
    const url = `/server/chat/history/?user_id=${user_id}&target_id=${target_id}`;
    console.log(url)
    return request(url);
};