import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Card,
  List,
  message,
  Dropdown,
  Form,
  Row,
  Select,
  Input,
  Menu,
  Drawer,
  Space,
  Button
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
import { queryFakeList } from './service';
import { searchWithinFan } from '../FanList/service';
import { Link } from 'umi';
import { DownOutlined } from '@ant-design/icons';
import { createNewGroup, changeGroupName, deleteGroup, changeUserGroup } from '@/services/group';
const { Option } = Select;

export const FanList = () => {
  const [peopleList, setPeoples] = useState([]); //所有用户
  const [oringinalList, setOringinalList] = useState([]); // 原始信息
  const [list0, setList0] = useState([]); //页面展示的用户 （默认展示所有用户）
  const [groupList, setGroupList] = useState([]); //分组名称
  const [deleteList, setDeleteList] = useState([]); //分组名称
  const [deleteList1, setDeleteList1] = useState([]); //分组名称
  const [keyinf, setKeyInf] = useState([]); //分组名称



  const createNewGroup1 = async (value) => {
    const res = await createNewGroup({
      user_id: localStorage.getItem('access_pk'),
      group_name: value,
    });
    if (res.error_code == 200) {
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
    
  };

  const changeGroupName1 = async (values) => {
    // console.log(values);
    const res = await changeGroupName({
      user_id: localStorage.getItem('access_pk'),
      group_name: values["groupName"],
      group_id: values["groupId"],
    });
    if (res.error_code == 200) {
      message.success(res.msg);
      queryFanList();
    } else {
      message.error(res.msg + ', choose group first');
    }
  };

  const changeUserGroup1 = async (value,value2) => {
    console.log(value);
    // console.log(value["groupId"]);
    const res = await changeUserGroup({
      user_id: localStorage.getItem('access_pk'),
      following_id: value2,
      group_id: value,
    });
    if (res.error_code == 200) {
      message.success(res.msg);
      queryFanList();
      // location.reload();
    } else {
      message.error(res.msg);
    }
  };

  const deleteGroup1 = async (id) => {
    const res = await deleteGroup({
      user_id: localStorage.getItem('access_pk'),
      group_id: id,
    });
    if (res.error_code == 200) {
      message.success(res.msg);
      queryFanList();
    } else {
      message.error(res.msg);
    }
  };

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

    render() {
      return (
        <>
          <a key="edit" onClick={this.showDrawer}>
            create New Group
          </a>
          <Drawer
            title="create new group"
            // width={720}
            height={100}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 0 }}
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Form.Item
                  name="group name"
                  label="Group name"
                  rules={[{ required: true, message: 'Please enter group name' }]}
                >
                  <Search
                    placeholder="Please enter group name"
                    onSearch={createNewGroup1}
                    enterButton="Create"
                  />
                </Form.Item>
              </Row>
            </Form>
          </Drawer>
        </>
      );
    }
  }

  class DrawerForm2 extends React.Component {
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

    render() {
      return (
        <>
          <a key="edit" onClick={this.showDrawer}>
            Change Group Name
          </a>
          <Drawer
            title="change group name"
            // width={720}
            height={100}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 0 }}
          >
            <Form layout="vertical" hideRequiredMark
              onFinish={changeGroupName1}>
              <Row gutter={16}>
                <Form.Item
                  name="groupId"
                  label="Choose group to change"
                  rules={[{ required: true, message: 'Please enter new group name' }]}
                >
                  <Select
                    defaultValue="choose group"
                    style={{ width: 180 }}
                    // onChange={handleChange}
                    options={deleteList1}
                  ></Select>
                </Form.Item>
              </Row>
              <Row gutter={16}>
                <Form.Item
                    label="Please enter new group name"
                    name="groupName"
                    rules={[{ required: true, message: 'Please input your new group name!' }]}
                  >
                    <Input />
                </Form.Item>
              </Row>
                <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
            </Form>
          </Drawer>
        </>
      );
    }
  }

  const MoreButton = ({ type }) => (
    <Dropdown overlay={<Menu onClick={({ key }) => changeUserGroup1(key, type)} items={deleteList}></Menu>}>
        <a>
          move user to other group <DownOutlined />
        </a>
      </Dropdown>
  );
  const MoreBtn = (
    <div>
      <b>current group:{keyinf}</b>

      <Space>|</Space>
      <Dropdown overlay={<Menu onClick={({ key }) => deleteGroup1(key)} items={deleteList}></Menu>}>
        <a>
          delete group <DownOutlined />
        </a>
      </Dropdown>
      <Space>|</Space>
      <DrawerForm2 />
      <Space>|</Space>
      <DrawerForm />
      <Space>|</Space>
      <Dropdown overlay={<Menu onClick={({ key }) => showByGroup(key)} items={groupList}></Menu>}>
        <a>
          show by group <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );

  useEffect(() => {
    queryFanList();
  }, []);

  const { Search } = Input;

  const onSearch = async (value) => {
    const res = await searchWithinFan({
      user_id: localStorage.getItem('access_pk'),
      keyword: value,
    });
    if (res.error_code == 200) {
      setList0(res.data.following_list);
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
  };

  const queryFanList = async () => {
    setKeyInf('default_group');
    const res = await queryFakeList({ user_id: localStorage.getItem('access_pk') });
    console.log(res, 'all inf');
    var peoples = new Array();
    if (res.error_code == 200) {
      for (var i = 0; i < res.data.following_list.length; i++) {
        for (var j = 0; j < res.data.following_list[i].group_members.length; j++) {
          peoples.push(res.data.following_list[i].group_members[j]);
        }
      }
      setList0(peoples);
      setPeoples(peoples);
      var caiDan = new Array();
      var test = 0;
      for (var i = 0; i < res.data.following_list.length; i++) {
        // caiDan.push((res.data.following_list[i].group_name)
        // ?{label:res.data.following_list[i].group_name,key:res.data.following_list[i].group_name,id:res.data.following_list[i].group_id}
        // :{label:"default_group",key:"default_group",id:res.data.following_list[i].group_id});

        if (res.data.following_list[i].group_name != null) {
          caiDan.push({
            label: res.data.following_list[i].group_name,
            key: res.data.following_list[i].group_name,
            id: res.data.following_list[i].group_id,
          });
        } else {
          caiDan.push({
            label: 'default_group',
            key: 'default_group',
            id: res.data.following_list[i].group_id,
          });
          test = 1;
        }
      }
      if (test != 1) caiDan.push({ label: 'default_group', key: 'default_group', id: null });

      var deleteCaiDan = new Array();
      var deleteCaiDan1 = new Array();
      for (var i = 0; i < res.data.following_list.length; i++) {
        if (res.data.following_list[i].group_name != null) {
          deleteCaiDan.push({
            label: res.data.following_list[i].group_name,
            key: res.data.following_list[i].group_id,
          });
          deleteCaiDan1.push({
            label: res.data.following_list[i].group_name,
            value: res.data.following_list[i].group_id,
          });
        }
      }
      setOringinalList(res.data.following_list);
      setGroupList(caiDan);
      setDeleteList(deleteCaiDan);
      setDeleteList1(deleteCaiDan1);
    }
  };

  const showByGroup = (key) => {
    setKeyInf(key);
    if (key === 'default_group') {
      setList0(peopleList); //修改为展示所有用户
    } else {
      var index;
      for (var k = 0; k < groupList.length; k++) {
        if (groupList[k].key === key) {
          index = k;
        }
      }
      setList0(oringinalList[index].group_members);
    }
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="following list"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={MoreBtn}
          >
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
            <List
              size="large"
              rowKey="id"
              pagination={paginationProps}
              dataSource={list0}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    // <Select
                    //   placeholder="move to other group"
                    //   style={{ width: 180 }}
                    //   onSelect={(newValue) => {
                    //     changeUserGroup1(newValue, item.id);
                    //   }}
                    //   options={deleteList1}
                    // ></Select>,
                    <MoreButton key="more" type={item.id} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={'/api/media/' + item.photo} shape="square" size="large" />}
                    title={<Link to={`/personal_view/${item.id}/`}>{item.username}</Link>}
                    description={item.moment}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
    </div>
  );
};

export default FanList;
