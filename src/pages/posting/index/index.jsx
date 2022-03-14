import React from 'react';
import { Button, Card, Image, Tooltip } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { getWholePosts } from '@/services/posts';
import logo from '/src/main.png';

const index_postList = async () => {
  const data = await getWholePosts();
  console.log(data, 999);
  return { data: data };
};

const content = <Image height={115} width={1400} src={logo} />;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App = () => (
  <Image.PreviewGroup>
    <div style={{ margin: 25 }}>
      <Image width={83} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
      <Image
        width={83}
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </div>
  </Image.PreviewGroup>
);

const PostList = () => {
  let [data, setData] = useState([]);
  useEffect(async () => {
    const resData = await index_postList();
    console.log(resData.data);
    setData(resData.data);
  }, []);

  //data=getRequst
  const [thumb, setThumb] = useState(false); //useState(data.thumb)
  const [count, setCount] = useState(0);

  const [like, setLike] = useState(1); // useState(data.like)
  const [numComment, setNum] = useState(10); //useState(len(data.comment))
  //const [comment,setLike]=useState(1)// useState(data.like)

  // const fn=()=>{
  //   if (count==0) {
  //     setThumb(thumb+1)
  //     setCount(1)
  //   }
  //   else {setThumb(thumb-1)
  //     setCount(0)}
  // }

  // const handleClick = item => {
  //   // 未点赞
  //
  //
  // }

  return (
    <PageContainer
      style={{ color: 'pink' }}
      header={{
        title: [<h1>Welcome to our O&O community</h1>],
        ghost: true,

        extra: [
          <input />,
          <input type={'submit'} />,
          <Button key="1">次要按钮</Button>,
          <Button key="2">次要按钮</Button>,
          <Button key="3" type="primary">
            主要按钮
          </Button>,
        ],
      }}
      content={content}
    >
      <Card style={{ width: 1400 }}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={data}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <>
                  {/*<Button onClick={handleClick(item)}><IconText icon={StarOutlined} text={item.thumb} key="list-vertical-star-o" /></Button>,*/}
                  {/*<IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,*/}
                  {/*<IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,*/}

                  <Button icon={<StarOutlined />}> {thumb}</Button>

                  <Tooltip>
                    <Button icon={<LikeOutlined />}> {like}</Button>
                  </Tooltip>
                  <Tooltip>
                    <Button icon={<MessageOutlined />}> {numComment}</Button>
                  </Tooltip>
                </>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" size={50} src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
              <App />
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

export default PostList;
