// eslint-disable-next-line import/no-extraneous-dependencies
import { getUserByName } from '@/services/swagger/user';
import type { Request, Response } from 'express';
import user from 'mock/user';
import type { BasicListItemDataType } from './data.d';

const names = [
  'user0000',
  'user2',
  'user3',
  'user4',
  'user5',
  'user6',
  'user7',
  'user8',
  'user9',
  'user10',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];


const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];


function fakeList(count: number,index:number): BasicListItemDataType[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    
    list.push({
      user_id: `fake-list-${i}`,
      username: names[index],
      
      moment: desc[i % 5],
      photo: avatars[i % 8],
      href: 'https://ant.design',

      
      
      
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
     
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
        following_list: [
        {
          email: "lalala@qq.com",
          photo: "photo/default.jpg",
          actual_name: null,
          gender: null,
          birth: null,
          signature: null,
          id: 5,
          username: "lalala",
          moment: null
        },
        {
          email: "lalala@qq.com",
          photo: "photo/default.jpg",
          actual_name: null,
          gender: null,
          birth: null,
          signature: null,
          id: 5,
          username: "lalala",
          moment: null
        },
        {
          email: "lalala@qq.com",
          photo: "photo/default.jpg",
          actual_name: null,
          gender: null,
          birth: null,
          signature: null,
          id: 5,
          username: "lalala",
          moment: null
        },
      ],
    });
  }

  return list;
}

let sourceData: BasicListItemDataType[] = [];

function getFakeList(req: Request, res: Response) {
  const params = req.query as any;

  const count = Number(params.count) * 1 || 20;
  const index=params.index;

  const result = fakeList(count,index);
  sourceData = result;
  return res.json({
    data: {
      list: result,
    },
  });
}

function postFakeList(req: Request, res: Response) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { method, id } = body;
  // const count = (params.count * 1) || 20;
  let result = sourceData || [];

  switch (method) {
    case 'delete':
      result = result.filter((item) => item.user_id !== id);
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.user_id === id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'post':
      result.unshift({
        ...body,
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime(),
      });
      break;
    default:
      break;
  }

  return res.json({
    data: {
      list: result,
    },
  });
}

export default {
  'GET  /api/get_list_user': getFakeList,
  'POST  /api/post_fake_list_user': postFakeList,
};
