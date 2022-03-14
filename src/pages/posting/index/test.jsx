import React from 'react';
import { Button, Image, Tag, Tooltip } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import { PageContainer } from '@ant-design/pro-layout';

const dataSource = [
  {
    title: '语雀的天空',
    avatar: 'https://joeschmoe.io/api/v1/random',
  },
  {
    title: 'Ant Design',
    avatar: 'https://joeschmoe.io/api/v1/random',
  },
  {
    title: '蚂蚁金服体验科技',
    avatar: 'https://joeschmoe.io/api/v1/random',
  },
  {
    title: 'TechUI',
    avatar: 'https://joeschmoe.io/api/v1/random',
  },
];

const App = () => (
  <Image.PreviewGroup>
    <div style={{ margin: 25 }}>
      <Image width={70} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
      <Image
        width={70}
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </div>
  </Image.PreviewGroup>
);

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const Test = () => {
  return (
    <ProList
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            新建
          </Button>,
        ];
      }}
      itemLayout="vertical"
      rowKey="id"
      headerTitle="Welcome to O&O Posting community"
      dataSource={dataSource}
      metas={{
        title: {},
        description: {
          render: () => (
            <>
              <Tag>语雀专栏</Tag>
              <Tag>设计语言</Tag>
              <Tag>蚂蚁金服</Tag>
            </>
          ),
        },
        actions: {
          render: () => [
            <>
              <Tooltip>
                <Button icon={<StarOutlined />}>123</Button>
              </Tooltip>
              <Tooltip>
                <Button icon={<LikeOutlined />}>123</Button>
              </Tooltip>
              <Tooltip>
                <Button icon={<MessageOutlined />}>123</Button>
              </Tooltip>
            </>,
          ],
        },
        extra: {
          render: () => (
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          ),
        },
        content: {
          render: () => {
            return (
              <div>
                段落示意：蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
                <App />
              </div>
            );
          },
        },
      }}
    />
  );
};

export default Test;
