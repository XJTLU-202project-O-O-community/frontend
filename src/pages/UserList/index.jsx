import { useEffect } from 'react';
import React, { useState } from 'react';
import { Avatar, Card, List } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { searchUser } from './service';
import styles from './style.less';

export const FanList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    queryFanList();
  }, []);

  const queryFanList = async () => {
    const res = await searchUser({ user_id: localStorage.getItem('access_pk'),
    targeted_User_id:"keyword" });
    console.log(res, 999);
    setList(res.data.fans_list);
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
            title="fan list"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
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
