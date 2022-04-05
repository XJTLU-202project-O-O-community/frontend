import type { FC } from 'react';
import React, { useState } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
} from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import { addFakeList, queryList, removeFakeList,  updateFakeList } from './service';
import type { BasicListItemDataType } from './data.d';
import styles from './style.less';
import {  Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = (value: any) => console.log(value);




const ListContent = ({
  data: {  createdAt,  status },
}: {
  data: BasicListItemDataType;
}) => (
  <div className={styles.listContent}>
    {/* <div className={styles.listContentItem}>
      <span>Owner</span>
    </div> */}
    {/* <div className={styles.listContentItem}>
      <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
    </div> */}
  </div>
);

const Index: string;

export const UserList: FC = () => {
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined);

  const {
    data: listData,
    loading,
    mutate,
  } = useRequest(() => {
    return queryList({
      count: 1,
      index:2,
    });
  });
  const { run: postRun } = useRequest(
    (method, params) => {
      if (method === 'remove') {
        return removeFakeList(params);
      }
      if (method === 'update') {
        return updateFakeList(params);
      }
      return addFakeList(params);
    },
    {
      manual: true,
      onSuccess: (result) => {
        mutate(result);
      },
    },
  );

  const list = listData?.list || [];

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: list.length,
  };


  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent({});
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    setDone(true);
    const method = values?.user_id ? 'update' : 'add';
    postRun(method, values);
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card>
            <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            />
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="targeted user"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <List
              size="large"
              rowKey="user_id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    // <a
                    //   key="edit"
                    //   onClick={(e) => {
                    //     e.preventDefault();
                    //     showEditModal(item);
                    //   }}
                    // >
                    //   编辑
                    // </a>,
                    // <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.photo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.username}</a>}
                    description={item.moment}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
      
      <OperationModal
        done={done}
        visible={visible}
        current={current}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserList;
