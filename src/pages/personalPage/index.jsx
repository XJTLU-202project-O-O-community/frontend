import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar, Button, Card, Image, List, Tooltip } from 'antd';
import { AntDesignOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import './index.css';
import { getPersonalPosts, getWholePosts } from '@/services/posts';

const profile_postList = async () => {
  const data = await getPersonalPosts();
  console.log(data, 999);
  return { data: data };
};

export default () => {
  let [dataCom, setDataCom] = useState([]);

  useEffect(async () => {
    const resData = await profile_postList();
    console.log(resData.data);
    setDataCom(resData.data);
  }, []);
  return (
    <PageContainer>
      <div>
        <div className="pictureCard">
          <Avatar size={150} icon={<AntDesignOutlined />} />
        </div>
        <div className="info">
          <Card hoverable={true}>
            <ProDescriptions
              className="personaltext"
              title="Personal Information"
              request={async () => {
                return Promise.resolve({
                  success: true,
                  data: {
                    username: 'Sakura',
                    name: 'Mike Martin',
                    id: '123456',
                    gender: 'Male',
                    date: '20000809',
                    text: 'testtesttesttesttesttesttesttesttesttesttesttesttest',
                  },
                });
              }}
              columns={[
                {
                  title: 'Username',
                  key: 'text',
                  dataIndex: 'username',
                },
                {
                  title: 'Name',
                  key: 'text',
                  dataIndex: 'name',
                },
                {
                  title: 'ID',
                  key: 'text',
                  dataIndex: 'id',
                },
                {
                  title: 'Gender',
                  key: 'text',
                  dataIndex: 'gender',
                },
                {
                  title: 'Birthday',
                  key: 'date',
                  dataIndex: 'date',
                  valueType: 'date',
                },
                {
                  title: '操作',
                  valueType: 'option',
                  render: () => [
                    <a target="_blank" rel="noopener noreferrer" key="link">
                      Edit
                    </a>,
                  ],
                },
              ]}
            >
              <hr></hr>
              <ProDescriptions.Item
                dataIndex="text"
                label="Personalized Signature"
              ></ProDescriptions.Item>
            </ProDescriptions>
          </Card>
        </div>
        <div>
          <Card className="personaltext" title="Personal moments here">
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={dataCom}
              footer={
                <div>
                  <b>ant design</b> footer part
                </div>
              }
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <>
                      {/*<Button onClick={handleClick(item)}><IconText icon={StarOutlined} text={item.thumb} key="list-vertical-star-o" /></Button>,*/}
                      {/*<IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,*/}
                      {/*<IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,*/}

                      <Button icon={<StarOutlined />}> {item.thumbs}</Button>

                      <Tooltip>
                        <Button icon={<LikeOutlined />}> {item.likes}</Button>
                      </Tooltip>
                    </>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size={50} src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                  <Image.PreviewGroup>
                    <div style={{ margin: 25 }}>
                      <Image
                        width={83}
                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                      />
                      <Image
                        width={83}
                        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                      />
                    </div>
                  </Image.PreviewGroup>
                </List.Item>
              )}
            />
          </Card>
        </div>
        <div className="bt2">
          <Button className="bt1" onClick={null}>
            Modify Password
          </Button>
          <Button className="bt1" onClick={null}>
            Cancellation
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
