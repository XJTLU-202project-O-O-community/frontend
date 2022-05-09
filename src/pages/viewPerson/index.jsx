import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { useEffect } from 'react';
import './index.css';
import { GetPersonInfo } from '@/services/person';
import { sendSub, sendUnsub } from '@/services/sub&unsub';

import { Avatar, Button, Card, Drawer, Form, Col, Row, message, Select, Space } from 'antd';
import { queryFakeList } from '@/pages/fan&following/FollowingList/service';

const { Option } = Select;

const index_PersonInfo = async (values) => {
  const res = await GetPersonInfo(values);
  // console.log(res);
  return res.data;
};

export default (props) => {
  const subT1 = 'Subscribe';
  const subT2 = 'Unsubscribe';
  const chatT = 'Chat';
  const his_id = props.match.params.id;
  const data1 = { his_id: his_id };

  class DrawerForm extends React.Component {
    state = { visible: false };
    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };

    onClose = () => {
      this.setState({
        visible: false,
      });
    };

    onClose1 = () => {
      this.setState({
        visible: false,
      });
      sendSubMes();
    };

    render() {
      return (
        <>
          {/* <Button className="sub" id="text" onClick={sendSubMes} size="large">
          <b>{subT1}</b>
          </Button>, */}

          <Button className="sub" id="text" onClick={this.showDrawer} size="large">
            <b>{subT1}</b>
          </Button>
          <Drawer
            title="subscribe"
            // width={720}
            height={100}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 0 }}
            extra={
              <Space>
                <Button onClick={this.onClose}>Cancel</Button>
                <Button onClick={this.onClose1} type="primary">
                  Submit
                </Button>
              </Space>
            }
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item
                    name="group name"
                    label="Group name"
                    rules={[{ required: true, message: 'Please enter group name' }]}
                  >
                    {/* <Input placeholder="Please enter group name" onSearch={Value => {
                      sendSubGroup(Value,item.id);
                      }}/> */}

                    <Select
                      defaultValue="choose group"
                      style={{ width: 180 }}
                      onChange={(newValue) => {
                        sendSubGroup(newValue);
                      }}
                      options={deleteList}
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
        </>
      );
    }
  }

  let [personInfo, setpersonInfo] = useState([]);
  let [fan, setFan] = useState([]);
  let [his, setHis] = useState([]);
  
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const infoData = await index_PersonInfo(data1);
    setpersonInfo(infoData.personal_data[0].fields);
    setFan(infoData.isFan);
    setHis(infoData.personal_data[0].pk);
  }

  const cum1 = personInfo.gender > 0 ? 'male' : 'female';

  const sendSubMes = async () => {
    const res = await sendSub({
      user_id: localStorage.getItem('access_pk'),
      following_id: his,
    });
    // location.reload();
    console.log(res, 'send success');
    // location.reload();
  };

  const sendSubGroup = async (value) => {
    const res = await sendSub({
      user_id: localStorage.getItem('access_pk'),
      following_id: his,
      group_id: value,
    });
    if (res.error_code == 200) {
      message.success(res.msg);
      location.reload();
    } else {
      message.error(res.msg);
    }
    location.reload();
    // location.reload();
  };

  const [deleteList, setDeleteList] = useState([]); //分组名称
  useEffect(() => {
    queryFanList();
  }, []);
  const queryFanList = async () => {
    const res = await queryFakeList({ user_id: localStorage.getItem('access_pk') });
    console.log(res, 'all inf');
    if (res.error_code == 200) {
      var deleteCaiDan = new Array();
      for (var i = 0; i < res.data.following_list.length; i++) {
        if (res.data.following_list[i].group_name != null) {
          deleteCaiDan.push({
            label: res.data.following_list[i].group_name,
            value: res.data.following_list[i].group_id,
          });
        }
      }
      setDeleteList(deleteCaiDan);
    }
  };

  const sendUnsubmes = async () => {
    const res = await sendUnsub({
      user_id: localStorage.getItem('access_pk'),
      following_id: his,
    });
    location.reload();
    // console.log(res, 'send success');
    location.reload();
  };

  const subbutton = () => {
    if (fan == false) {
      return <DrawerForm />;
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
    <div
      className="background"
      style={{
        backgroundImage: 'url(' + require('.//media/' + localStorage.getItem('background')) + ')',
      }}
    >
      <PageContainer>
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
