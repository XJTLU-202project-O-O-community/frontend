import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { useEffect } from 'react';
import './index.css';
import { GetPersonInfo } from '@/services/person';
import { sendSub, sendUnsub } from '@/services/sub&unsub';

import {
  Avatar,
  Button,
  Card,
  Drawer,
  Form,
  Col,
  Row,
  message,
  Select,
  Space,
  List,
  Image,
  Comment,
} from 'antd';
import { queryFakeList } from '@/pages/fan&following/FollowingList/service';
import { Link } from 'umi';
import { LikeOutlined, MessageOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { getComment, getPersonalPosts, getWholePosts } from '@/services/posts';

const { Option } = Select;

const App = (values) => {
  const list11 = values?.toString().split(',');
  list11?.pop();
  console.log(list11);
  return (
    <Image.PreviewGroup>
      <div style={{ margin: 25 }}>
        {list11?.map((item) => (
          <Image width={90} height={90} src={'http://localhost:8000/media/moments/' + item} />
        ))}
      </div>
    </Image.PreviewGroup>
  );
};

const wrap = (value) => {
  let arr1 = value.split('\n');
  let res = null;
  for (var i = 0; i < arr1.length; i++) {
    if (i == 0) {
      res = arr1[i];
    } else
      res = (
        <span>
          {res}
          <br />
          {arr1[i]}
        </span>
      );
  }
  return res;
};

const index_PersonInfo = async (values) => {
  const res = await GetPersonInfo(values);
  // console.log(res);
  if (res.error_code == 200) {
    // message.success(res.msg);
    return res.data;
  } else {
    message.error(res.msg);
  }
};

export default (props) => {
  const subT1 = 'Subscribe';
  const subT2 = 'Unsubscribe';
  const chatT = 'Chat';
  const his_id = props.match.params.id;
  const data1 = { his_id: his_id };
  const data2 = { userid: his_id };

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
                {/* <Button onClick={this.onClose}>Cancel</Button> */}
                <Button onClick={this.onClose1} type="primary">
                  Subscribe(no group)
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
  let [moments, setmoments] = useState([]);
  let [comments, setComment] = useState([]);
  let [fan, setFan] = useState([]);
  let [his, setHis] = useState([]);
  let [show, setShow] = useState({});
  useEffect(() => {
    initialInf();
  }, []);
  const showComment = (value, num) => {
    console.log(num);
    if (num && value == undefined) {
      return <h3>no comments here</h3>;
    }
    if (num && value.length > 0) {
      return (
        <div>
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={value}
            renderItem={(item1) => (
              <li>
                <Comment
                  actions={item1.actions}
                  author={item1.poster__name}
                  avatar={'http://localhost:8000/media/' + item1.poster__photo}
                  content={item1.content}
                  datetime={item1.ctime}
                />
              </li>
            )}
          />
        </div>
      );
    } else if (num && value.length <= 0) return <h3>no comments here</h3>;
  };

  const initialInf = async () => {
    const infoData = await index_PersonInfo(data1);
    setpersonInfo(infoData.personal_data[0].fields);
    setFan(infoData.isFan);
    setHis(infoData.personal_data[0].pk);
  };
  const cum1 = personInfo.gender > 0 ? 'male' : 'female';

  const sendSubMes = async () => {
    const res = await sendSub({
      user_id: localStorage.getItem('access_pk'),
      following_id: his,
    });
    if (res.error_code == 200) {
      message.success(res.msg);
      console.log(res, 'send success');
      initialInf();
    } else {
      message.error(res.msg);
    }
    // initialInf();
  };

  const sendSubGroup = async (value) => {
    const res = await sendSub({
      user_id: localStorage.getItem('access_pk'),
      following_id: his,
      group_id: value,
    });
    if (res.error_code == 200) {
      message.success(res.msg);
      initialInf();
    } else {
      message.error(res.msg);
    }
  };

  const [deleteList, setDeleteList] = useState([]); //分组名称

  useEffect(async () => {
    const resData = await getPersonalPosts(data2);
    resData.data.own_moments.map((item) => {
      item.show_comment = false;
      return item;
    });
    console.log(resData.data.own_moments, 999);
    setmoments(resData.data.own_moments);
  }, []);

  useEffect(async () => {
    const resData = await getComment();
    setComment(resData.data.comments);
  }, []);

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
    } else {
      // message.error(res.msg);
    }
  };

  const sendUnsubmes = async () => {
    const res = await sendUnsub({
      user_id: localStorage.getItem('access_pk'),
      following_id: his,
    });
    console.log(res, 'send success');
    if (res.error_code == 200) {
      message.success(res.msg);
      initialInf();
    } else {
      message.error(res.msg);
    }
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

            <Card style={{ marginLeft: 170, width: 800 }}>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: async (page) => {},
                  pageSize: 5,
                }}
                dataSource={moments}
                footer={
                  <div>
                    <b>Personal moments here</b> footer part
                  </div>
                }
                renderItem={(item) => (
                  <List.Item key={item.title}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size={50}
                          src={'/server/media/' + item.user_id__photo}
                        />
                      }
                      title={
                        <Link to={`/personal_view/${item.user_id}/`}>{item.user_id__name}</Link>
                      }
                      description={item.user_id__signature}
                    />

                    <span>{wrap(item.content)}</span>
                    {App(item.url)}

                    <div className="site-button-ghost-wrapper">
                      <Button style={{ width: 180 }} icon={<StarOutlined />}>
                        {item.likes}
                      </Button>

                      <Button style={{ width: 180 }} icon={<LikeOutlined />}>
                        {item.thumbs}
                      </Button>

                      <Button
                        onClick={() =>
                          setShow(item.show ? (item.show = false) : (item.show = true))
                        }
                        style={{ width: 180 }}
                        icon={<MessageOutlined />}
                      >
                        {comments[item.id.toString()]?.length}
                      </Button>
                    </div>
                    {showComment(comments[item.id.toString()], item.show)}
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
