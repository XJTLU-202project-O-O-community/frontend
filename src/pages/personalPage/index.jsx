import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect, useRef } from 'react';
import { Avatar, Button, Card, List, message, Menu, Dropdown, Space } from 'antd';
import { LikeOutlined, StarOutlined, DownOutlined } from '@ant-design/icons';
import './index.css';
import { add, Delete, getPersonalPosts, getWholePosts, Edit } from '@/services/posts';
import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormGroup,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { EditProfile, GetPersonInfo, changePicB } from '@/services/person';

import { set } from 'lodash';

const index_postList = async (values) => {
  const data = await getPersonalPosts(values);
  console.log(data, 999);
  return { data: data.data.own_moments };
};

const index_PersonInfo = async (values) => {
  const res = await GetPersonInfo(values);
  console.log(res, 8888);
  return res.data.personal_data[0].fields;
};

const his_id = localStorage.getItem('access_pk');
const data1 = { his_id: his_id };
const data2 = { userid: his_id };

export default (props) => {
  let [own_data, setData] = useState([]);
  useEffect(async () => {
    const resData = await index_postList(data2);
    console.log(resData, 300);
    setData(resData.data);
  }, []);

  let [personInfo, setpersonInfo] = useState([]);

  useEffect(async () => {
    const infoData = await index_PersonInfo(data1);
    console.log(infoData, 400);
    localStorage.setItem('picName', infoData.background);
    setpersonInfo(infoData);
  }, []);
  console.log('111');
  console.log(personInfo.photo);

  const deleteMoment = async (value) => {
    const res = await Delete(value);
    console.log(res, 88);
    if (res.error_code == 200) {
      message.success('delete successfully');
    } else message.error('error');
  };

  const editMoment = async (value) => {
    const res = await Edit(value);
    console.log(res, 88);
    if (res.error_code == 200) {
      message.success('edit successfully');
    } else message.error('error');
  };

  const formRef = useRef();

  const uploadProfile = async (value) => {
    console.log('Profile Data');
    const res = await EditProfile(value);
    console.log(res);
    if (res.error_code == 200) {
      message.success('add successfully');
    } else message.error('error');
  };

  const changeBack = async (value) => {
    console.log('Back_Pic', value);
    const res = await changePicB(value);
    if (res.error_code == 200) {
      message.success('change successfully');
      localStorage.setItem('background', value);
      location.reload();
    } else message.error('error');
  };

  const onClick1 = ({ key }) => {
    changeBack(key);
    // localStorage.setItem("picName",key);
    //location.reload();
  };

  // const picName = 'default.jpg';
  // 这里后端改完要变成
  // let picName = personInfo.background;

  const backgroundpic = (
    <Menu onClick={onClick1}>
      <Menu.Item key="blue.jpg">blue</Menu.Item>
      <Menu.Item key="purple.jpg">purple</Menu.Item>
      <Menu.Item key="orange.jpg">orange</Menu.Item>
      <Menu.Item key="green.jpg">green</Menu.Item>
      <Menu.Item key="default.jpg">default</Menu.Item>
    </Menu>
  );

  console.log(personInfo.background, 3333);

  const cum1 = personInfo.gender > 0 ? 'male' : 'female';

  return (
    <div
      className="background"
      style={{backgroundImage:"url("+require('.//media/'+localStorage.getItem("background"))+")"}}>

      <PageContainer>
        {/* 用链接时用上一个，文件时用下一个 */}
        {/* <div className='background' style={{backgroundImage: 'url('+"https://pic2.zhimg.com/v2-0aa990f37ada6efc5af350acd9f92e50_r.jpg?source=1940ef5c"+')'}}> */}
        <div>
          <div>
            <Dropdown className="backPicbtn" overlay={backgroundpic} placement="bottom" arrow>
              <Button onClick={(e) => e.preventDefault()}>
                <Space>
                  Change Background
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className="pictureCard">
            <Avatar size={150} src={'/api/media/' + personInfo.photo} />
            <Button
              className="fans"
              id="text"
              onClick={() => props.history.push('/fanlist')}
              size="large"
            >
              <b>Fans</b>
            </Button>
            <Button
              className="followers"
              id="text"
              onClick={() => props.history.push('/followinglist')}
              size="large"
            >
              <b>Followings</b>
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
                      <ModalForm
                        title={[<h2>Edit personal info</h2>]}
                        formRef={formRef}
                        trigger={<Button style={{ color: 'blue', marginTop: 20 }}>EDIT</Button>}
                        autoFocusFirstInput
                        drawerProps={{
                          destroyOnClose: true,
                        }}
                        onFinish={(value) => {
                          console.log(value);
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
                              name="upAvatar"
                              label="Upload"
                              withCredentials={true}
                              max={1}
                              fieldProps={{
                                name: 'file',
                                listType: 'picture-card',
                              }}
                              action="/api/user/images/"
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
                              initialValue={personInfo.gender}
                              options={[
                                {
                                  label: 'Male',
                                  value: '1',
                                },
                                {
                                  label: 'Female',
                                  value: '0',
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
                  {his_id}
                </ProDescriptions.Item>
                <ProDescriptions.Item dataIndex="gender" label="Gender">
                  {cum1}
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
                      onFinish={() => {
                        deleteMoment({ id: item.id });
                        console.log({ id: item.id }, 99999);
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
                      title={[<h2>Confirmation for Edit</h2>]}
                      trigger={<Button style={{ color: 'blue', marginTop: 20 }}>EDIT</Button>}
                      autoFocusFirstInput
                      drawerProps={{
                        destroyOnClose: true,
                      }}
                      onFinish={(value) => {
                        editMoment(value);
                        location.reload();
                        return true;
                      }}
                    >
                      <ProFormText
                        name="id"
                        width="md"
                        label="id"
                        readonly
                        initialValue={item.id}
                      />
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
                    </ModalForm>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={50}
                        src={'http://localhost:8000/media/' + item.user_id__photo}
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
        </div>
      </PageContainer>
    </div>
  );
};
