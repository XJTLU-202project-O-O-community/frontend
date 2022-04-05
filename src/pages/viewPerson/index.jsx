import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar, Button, Card } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import './index.css';
import { GetPersonInfo } from '@/services/person';
import { addFakeList, removeFakeList } from '../UserList/service';
import { render } from 'react-dom';

const index_PersonInfo = async () => {
  const data = await GetPersonInfo();
  console.log(data);
  return { data };
};

const subT = 'Subscribe';
// const unsubT = 'unSubscribe';
const chatT = 'Chat';

const sub_or_unsub = (params) => {
  console.log('已经触发');
  return addFakeList(params);
};
// (params) => {
//   if (1 === 1) {
//     console.log("已经触发");
//     return addFakeList(params);
//   }

//   // <Button className="sub" id="text" onClick={()=>{addFakeList(params)}} size="large">
//   //         <b>{subT}</b>
//   // </Button>;
//   return removeFakeList(params);
// }

export default () => {
  let [personInfo, setpersonInfo] = useState([]);
  useEffect(async () => {
    const infoData = await index_PersonInfo();
    console.log(infoData.data);
    setpersonInfo(infoData.data);
  }, []);

  return (
    <PageContainer>
      <div>
        <div className="pictureCardV">
          <Avatar size={150} src={personInfo.avatar} />
          <Button
            className="sub"
            id="text"
            onClick={() => {
              sub_or_unsub(personInfo.id);
            }}
            size="large"
          >
            <b>{subT}</b>
          </Button>
          {/* <Button className="sub" id="text" onClick={()=>{removeFakeList(personInfo.id)}} size="large">
            <b>{unsubT}</b>
          </Button> */}
          <Button className="chat" id="chat" onClick={null} size="large">
            <b>{chatT}</b>
          </Button>
        </div>
        <div className="infoV">
          <Card hoverable={true}>
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
      </div>
    </PageContainer>
  );
};
