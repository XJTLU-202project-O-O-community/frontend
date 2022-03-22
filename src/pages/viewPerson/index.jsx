import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar, Button, Card } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import './index.css';

export default () => {
  const subT = 'Subscribe';
  const chatT = 'Chat';
  return (
    <PageContainer>
      <div>
        <div className="pictureCardV">
          <Avatar
            size={150}
            src={'https://th.bing.com/th/id/OIP.Jj--APqfnW9dNtbzDkFFBQAAAA?pid=ImgDet&rs=1'}
          />
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
      </div>
    </PageContainer>
  );
};
