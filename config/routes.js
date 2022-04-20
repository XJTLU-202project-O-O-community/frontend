export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './user/register',
          },
          {
            name: 'register-result',
            path: '/user/register-result',
            component: './user/register-result',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/posts',
    name: 'posts',
    icon: 'AppstoreAddOutlined',
    component: './posting/index',
  },
  {
    path: '/personal_info',
    name: 'Personal Page',
    icon: 'IdcardFilled',
    component: './personalPage',
  },
  {
    path: '/searchperson/:userid',

    component: './personalPage/searching',
  },
  {
    path: '/personal_view/:id',

    component: './viewPerson',
  },
  {
    path: '/welcome',

    component: './Welcome',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    name: 'chat',
    icon: 'table',
    path: '/chat',
    component: './chat',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: 'fan',
    icon: 'smile',
    path: '/fanlist',
    component: './fan&following/FanList',
  },
  {
    name: 'following',
    icon: 'smile',
    path: '/followinglist',
    component: './fan&following/FollowingList',
  },
  {
    //name: 'user list',
    icon: 'smile',
    path: '/userlist',
    component: './UserList',
  },
  {
    component: './404',
  },
];
