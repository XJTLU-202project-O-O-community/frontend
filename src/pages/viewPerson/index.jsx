import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar, Button, Card } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import './index.css';
import { GetPersonInfo } from '@/services/person';
import localStorage from 'localStorage';

const index_PersonInfo = async (values) => {
  const res = await GetPersonInfo(values);
  return res.data[0].fields;
};

export default (props) => {
  const subT1 = 'Subscribe';
  const subT2 = 'Subscribed';
  const chatT = 'Chat';
  const his_id = localStorage.getItem('access_pk');
  const data1 = { his_id: his_id };

  let [personInfo, setpersonInfo] = useState([]);
  useEffect(async () => {
    const infoData = await index_PersonInfo(data1);
    setpersonInfo(infoData);
  }, []);

  return (
    <PageContainer>
      <div>
        <div className="pictureCardV">
          <Avatar size={150} src={'http://localhost:8000/media/' + personInfo.photo} />
          <Button className="sub" id="text" onClick={null} size="large">
            <b>{subT}</b>
          </Button>
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
                {personInfo.name}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="name" label="Name">
                {personInfo.actual_name}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="id" label="ID">
                {his_id}
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
      </div>
    </PageContainer>
  );
};
