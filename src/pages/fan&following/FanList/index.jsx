import { useEffect } from 'react';
import React, { useState } from 'react';
import { Avatar, Card, List, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { queryFakeList, searchWithinFan } from './service';
import styles from './style.less';
import { Input } from 'antd';
import { Link } from 'umi';

export const FanList = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    queryFanList();
  }, []);

  const queryFanList = async () => {
    const res = await queryFakeList({ user_id: localStorage.getItem('access_pk') });
    console.log(res, 999);
    setList(res.data.fans_list);
  };

  // const queryList = async () => {
  //   const res = await searchWithinFan({ user_id: localStorage.getItem('access_pk'),keyword:value });
  //   console.log(res, 999);
  //   setList(res.data.fans_list);
  // };
  const exitFunction = () => {
    localStorage.removeItem('access_pk');
    location.reload();
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
            {/* <Button onClick={exitFunction}>Exit</Button> */}
            <List
              size="large"
              rowKey="id"
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item>
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
