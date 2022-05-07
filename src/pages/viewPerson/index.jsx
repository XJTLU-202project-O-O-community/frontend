import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar, Button, Card } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import './index.css';
import { GetPersonInfo } from '@/services/person';
import { sendSub, sendUnsub } from '@/services/sub&unsub';

import localStorage from 'localStorage';

const index_PersonInfo = async (values) => {
  const res = await GetPersonInfo(values);
  console.log(res);
  return res.data;
};

export default (props) => {
  const subT1 = 'Subscribe';
  const subT2 = 'Unsubscribe';
  const chatT = 'Chat';
  const his_id = props.match.params.id;
  const data1 = { his_id: his_id };

  let [personInfo, setpersonInfo] = useState([]);
  let [fan, setFan] = useState([]);
  let [his, setHis] = useState([]);
  useEffect(async () => {
    const infoData = await index_PersonInfo(data1);
    setpersonInfo(infoData.personal_data[0].fields);
    setFan(infoData.isFan);
    setHis(infoData.personal_data[0].pk);
  }, []);
  const cum1 = personInfo.gender > 0 ? 'male' : 'female';

  const sendSubMes = async () => {
    const res = await sendSub({
      user_id: localStorage.getItem('access_pk'),
      following_id: his,
    });
    location.reload();
    console.log(res, 'send success');
    location.reload();
  };

  const sendUnsubmes = async () => {
    const res = await sendUnsub({
      user_id: localStorage.getItem('access_pk'),
      following_id: his,
    });
    location.reload();
    console.log(res, 'send success');
    location.reload();
  };

  const subbutton = () => {
    if (fan == false) {
      return (
        <Button className="sub" id="text" onClick={sendSubMes} size="large">
          <b>{subT1}</b>
        </Button>
      );
    }
    return (
      <Button className="sub" id="text" onClick={sendUnsubmes} size="large">
        <b>{subT2}</b>
      </Button>
    );
  };

  // const sendUnsubMes = async () => {
  //   const res = await sendUnsub({ user_id: localStorage.getItem('access_pk'),following_id: personInfo.id});
  //   console.log(res, "send success");
  // };

  //let picName = 'default.jpg';
  //  这里后端改完要变成
  // let picName = personInfo.background;

  return (
    <div className='background' style={{backgroundImage:"url("+require('.//media/'+localStorage.getItem("background"))+")"}}>
    <PageContainer >
      <div>
        <div className="pictureCardV">
          <Avatar size={150} src={'/api/media/' + personInfo.photo} />
          {subbutton()}
          <Button
            className="chat"
            id="chat"
            onClick={() => props.history.push(`/chat?target_id=${props.match.params.id}`)}
            size="large"
          >
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
                  render: () => [],
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
      </div>
    </PageContainer>
    </div>
  );
};
