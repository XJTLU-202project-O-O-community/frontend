import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar, Button, Card } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import './index.css';
import { GetPersonInfo } from '@/services/person';

const index_PersonInfo = async (values) => {
  const data = await GetPersonInfo(values);
  console.log(data);
  return { data };
};

export default (props) => {
  const subT = 'Subscribe';
  const chatT = 'Chat';
  const userid = props.match.params.id;
  const data1 = { userid: userid };

  let [personInfo, setpersonInfo] = useState([]);
  useEffect(async () => {
    const infoData = await index_PersonInfo(data1);
    console.log(infoData.data.data, 999999);
    setpersonInfo(infoData.data.data);
  }, []);

  return (
    <PageContainer>
      <div>
        <div className="pictureCardV">
          <Avatar size={150} src={personInfo.avatar} />
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
