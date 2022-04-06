import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar, Button, Card, List, message } from 'antd';
import {
  AntDesignOutlined,
  LikeOutlined,
  MessageOutlined,
  PlusOutlined,
  StarOutlined,
} from '@ant-design/icons';
import './index.css';
import { add, Delete, getPersonalPosts, getWholePosts } from '@/services/posts';
import ProForm, {
  DrawerForm,
  ModalForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { GetPersonInfo } from '@/services/person';

const index_postList = async () => {
  const data = await getPersonalPosts();
  console.log(data, 999);
  return { data: data };
};

const index_PersonInfo = async () => {
  const data = await GetPersonInfo();
  console.log(data);
  return { data };
};

export default () => {
  let [own_data, setData] = useState([]);
  useEffect(async () => {
    const resData = await index_postList();
    console.log(resData.data);
    setData(resData.data);
  }, []);

  const deleteMoment = async (value) => {
    const res = await Delete(value);
    if (res.code == 200) {
      message.success('add successfully');
    } else message.error('error');
  };

  let [personInfo, setpersonInfo] = useState([]);
  useEffect(async () => {
    const infoData = await index_PersonInfo();
    console.log(infoData.data);
    setpersonInfo(infoData.data);
  }, []);

  return (
    <PageContainer>
      <div>
        <div className="pictureCard">
          <Avatar size={150} src={personInfo.avatar} />
          <Button className="followers" id="followers" onClick={null} size="large">
            <b>Followers</b>
          </Button>
          <Button className="fans" id="fans" onClick={null} size="large">
            <b>Fans</b>
          </Button>
        </div>
        <div>
          <Card className="Card1">
            <ProDescriptions
              className="personaltext"
              title="Personal Information"
              columns={[
                {
                  title: '操作',
                  valueType: 'option',
                  render: () => [
                    <a href="/personal_edit" target="_blank" rel="noopener noreferrer" key="link">
                      Edit
                    </a>,
                  ],
                },
              ]}
            >
              <ProDescriptions.Item dataIndex="username" label="Username">
                {personInfo.username}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="name" label="Name">
                {personInfo.name}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="id" label="ID">
                {personInfo.id}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="gender" label="Gender">
                {personInfo.gender}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="city" label="City">
                {personInfo.city}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="date" label="Birthday">
                {personInfo.date}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="text" label="Personalized Signature">
                {' '}
                {personInfo.text}{' '}
              </ProDescriptions.Item>
            </ProDescriptions>
          </Card>
        </div>
        <Card className="Card1">
          <h3>Personal posting here</h3>

          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={own_data}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <div className="site-button-ghost-wrapper">
                    {/*<Button onClick={handleClick(item)}><IconText icon={StarOutlined} text={item.thumb} key="list-vertical-star-o" /></Button>,*/}
                    {/*<IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,*/}
                    {/*<IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,*/}

                    <Button style={{ width: 190 }} icon={<StarOutlined />}>
                      {' '}
                      {item.thumbs}
                    </Button>

                    <Button style={{ width: 190 }} icon={<LikeOutlined />}>
                      {' '}
                      {item.likes}
                    </Button>
                  </div>,
                ]}
                extra={[
                  <ModalForm
                    title={[<h2>Confirmation for deleting</h2>]}
                    trigger={<Button style={{ color: 'red', marginTop: 20 }}>Delete</Button>}
                    autoFocusFirstInput
                    drawerProps={{
                      destroyOnClose: true,
                    }}
                    onFinish={() => {
                      deleteMoment({ id: item.id });
                    }}
                  >
                    <h3 style={{ color: 'red' }}>
                      If decide to delete the content will lead to permanent deletion.{' '}
                    </h3>
                    <h3>Do you confirm the action.</h3>
                  </ModalForm>,

                  <br />,
                  <ModalForm
                    title={[<h2>Confirmation for deleting</h2>]}
                    trigger={<Button style={{ color: 'blue', marginTop: 20 }}>EDIT</Button>}
                    autoFocusFirstInput
                    drawerProps={{
                      destroyOnClose: true,
                    }}
                    onFinish={() => {
                      deleteMoment({ id: item.id });
                    }}
                  >
                    <ProForm.Group>
                      <ProFormText
                        name="description"
                        initialValue={item.description}
                        width="md"
                        label="Put the description here"
                        tooltip="最长为 24 位"
                        placeholder="请输入名称"
                      />
                    </ProForm.Group>
                    <ProFormText
                      width="xl"
                      name="content"
                      initialValue={item.content}
                      label="write whatever you want"
                      placeholder="请输入名称"
                    />
                    <ProFormUploadButton
                      name="imgs"
                      label="Upload"
                      max={2}
                      fieldProps={{
                        name: 'file',
                        listType: 'picture-card',
                        max: 3,
                      }}
                      action="/upload.do"
                      extra="your photo here"
                    />
                  </ModalForm>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={50}
                      src={
                        'https://th.bing.com/th/id/OIP.Jj--APqfnW9dNtbzDkFFBQAAAA?pid=ImgDet&rs=1'
                      }
                    />
                  }
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Card>

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
