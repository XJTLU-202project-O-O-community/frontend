import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import React from 'react';
import { Input, Space } from 'antd';

const { Search } = Input;
const onSearch = value => console.log(value);


export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageContainer content="待跳转！" className={styles.main}>
      <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            
      />
      

      

      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
        <a href='./fanlist'>跳转Fan</a>
        <p></p>
        <a href='./followinglist'>待跳转Following</a>

      </div>
    </PageContainer>
  );
};
