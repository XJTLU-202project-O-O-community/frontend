import { FC, useEffect } from 'react';
import React, { useState } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Card,
  List,
} from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import { addFakeList, queryFakeList, removeFakeList, updateFakeList } from './service';
import styles from './style.less';



export const FanList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    queryFanList();
  }, []);

  const queryFanList = async() =>{
    const res = await queryFakeList({user_id: localStorage.getItem("access_pk")})
    console.log(res, 999)
    setList(res.data.fans_list);
  }
  
  
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
            title="fan list"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            // extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={"/api/media/"+item.photo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.username}</a>}
                    description={item.moment}
                  />
                  {/* <ListContent data={item} /> */}
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
      {/* <Button
        type="dashed"
        onClick={() => {
          setVisible(true);
        }}
        style={{ width: '100%', marginBottom: 8 }}
      >
        <PlusOutlined />
        添加
      </Button> */}
    </div>
  );
};

export default FanList;
