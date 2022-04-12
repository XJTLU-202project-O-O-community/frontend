import { useEffect } from 'react';
import React, { useState } from 'react';
import { Avatar, Card, List, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
import { queryFakeList } from './service';
import { Input } from 'antd';
import { searchWithinFan } from '../FanList/service';

export const FanList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    queryFanList();
  }, []);

  const { Search } = Input;

  const onSearch = async (value) => {
    const res = await searchWithinFan({ user_id: localStorage.getItem('access_pk'), keyword: value });
    if (res.error_code == 200) {
      console.log(res)
      setList(res.data.following_list)
      message.success(res.msg)
    } else {
      message.error(res.msg)
    }
  };

  const queryFanList = async () => {
    const res = await queryFakeList({ user_id: localStorage.getItem('access_pk') });
    console.log(res, 999);
    setList(res.data.following_list);
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    // total: list.length,
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
          >
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
            <List
              size="large"
              rowKey="id"
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={'/api/media/' + item.photo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.username}</a>}
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
