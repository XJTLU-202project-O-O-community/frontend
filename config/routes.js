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
    path: '/personal_view',
    name: 'View Person',
    icon: 'UserOutlined',
    component: './viewPerson',
  },
  {
    path: '/personal_edit',
    name: 'Edit Person',
    icon: 'EditOutlined',
    component: './editPerson',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
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
    component: './404',
  },
];
