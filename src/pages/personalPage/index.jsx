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
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { changeProfile, GetPersonInfo } from '@/services/person';

const index_postList = async (values) => {
  const data = await getPersonalPosts(values);
  console.log(data, 999);
  return { data: data.data.own_moments };
};
const uploadProfile = async (values) => {
  const res = await changeProfile(values);
  if (res.code == 200) {
    message.success('add successfully');
  } else message.error('error');
};

const index_PersonInfo = async (values) => {
  const res = await GetPersonInfo(values);
  console.log(res.data[0].fields.name);
  return res.data[0].fields;
};

export default (props) => {
  let [own_data, setData] = useState([]);
  useEffect(async () => {
    const resData = await index_postList({ userid: 1 });
    console.log(resData, 300);
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
    const infoData = await index_PersonInfo({ his_id: 1 });

    setpersonInfo(infoData);
  }, []);
  console.log('111');
  console.log(personInfo.photo);
  return (
    <PageContainer>
      <div>
        <div className="pictureCard">
          <Avatar size={150} src={'http://localhost:8000/media/' + personInfo.photo} />
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
                    <ModalForm
                      title={[<h2>Edit personal info</h2>]}
                      trigger={<Button style={{ color: 'blue', marginTop: 20 }}>EDIT</Button>}
                      autoFocusFirstInput
                      drawerProps={{
                        destroyOnClose: true,
                      }}
                      onFinish={(value) => {
                        uploadProfile(value);
                        location.reload();
                        return true;
                      }}
                    >
                      <Card>
                        <ProFormGroup label="Basic">
                          <ProFormText
                            name="username"
                            initialValue={personInfo.name}
                            width="sm"
                            label="username"
                          />
                          <ProFormText
                            name="name"
                            initialValue={personInfo.actual_name}
                            width="sm"
                            label="Name"
                          />
                          <ProFormUploadButton
                            title="Click to upload"
                            name="upload"
                            label="Upload"
                            withCredentials={true}
                            max={1}
                            fieldProps={{
                              name: 'file',
                              listType: 'picture-card',
                            }}
                            action="/upload.do"
                            extra="This is your avatar"
                          />
                        </ProFormGroup>
                        <ProFormGroup
                          label="Gender & Birthday"
                          style={{
                            gap: '0 32px',
                          }}
                        >
                          <ProFormRadio.Group
                            name="gender"
                            layout="vertical"
                            options={[
                              {
                                label: 'Male',
                                value: 'male',
                              },
                              {
                                label: 'Female',
                                value: 'female',
                              },
                            ]}
                          />
                          <ProFormDatePicker name="birth" label="Birthday" />
                        </ProFormGroup>
                        <ProFormGroup label="Address">
                          <ProFormText
                            width="md"
                            name="city"
                            label="City"
                            initialValue={personInfo.city}
                          />
                        </ProFormGroup>
                        <ProFormGroup label="Signature">
                          <ProFormTextArea
                            width="xl"
                            name="text"
                            initialValue={personInfo.signature}
                          />
                        </ProFormGroup>
                      </Card>
                    </ModalForm>,
                  ],
                },
              ]}
            >
              <ProDescriptions.Item dataIndex="username" label="Username">
                {personInfo.name}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="name" label="Name">
                {personInfo.actual_name}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="id" label="ID">
                {personInfo.pk}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="gender" label="Gender">
                {personInfo.gender}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="city" label="City">
                {personInfo.city}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="date" label="Birthday">
                {personInfo.birth}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="text" label="Personalized Signature">
                {' '}
                {personInfo.signature}{' '}
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
                      location.reload();
                      return true;
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
                      location.reload();
                      return true;
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
