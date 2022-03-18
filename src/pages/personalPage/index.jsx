import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar, Button,Card } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import './index.css';
export default () => {
    return (
      <PageContainer>
      <div>
    <div className='pictureCard'>
      <Avatar
    size={150}
    icon={<AntDesignOutlined />}
  />
  </div>
  <div className='info'>
      <Card 
      hoverable={true}
      >
    <ProDescriptions className='personaltext' title="Personal Information" request={async () => {
            return Promise.resolve({
                success: true,
                data: {
                    username:'Sakura',
                    name: 'Mike Martin',
                    id:'123456',
                    gender:'Male',
                    date: '20000809',
                    text:'testtesttesttesttesttesttesttesttesttesttesttesttest'
                },
            });
        }} columns={[
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
        ]}>
        <hr></hr>
      <ProDescriptions.Item dataIndex="text" label="Personalized Signature">
      </ProDescriptions.Item>
    </ProDescriptions>
    </Card>
    </div>

    <div className='bt2'>
      <Button className='bt1' onClick={null}>
        Modify Password
      </Button>
      <Button className='bt1' onClick={null}>
        Cancellation
      </Button>
      </div>

      </div>
      </PageContainer>
    );
};