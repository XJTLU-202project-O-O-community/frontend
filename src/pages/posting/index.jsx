import React from 'react';
import { Button, Card, Image, message, Tooltip } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { getWholePosts, add, Profile } from '@/services/posts';
import logo from '/src/main.png';
import { QueryFilter, ProFormText, ProFormDatePicker } from '@ant-design/pro-form';
import { ProFormUploadDragger, ProFormUploadButton } from '@ant-design/pro-form';
import { useRef } from 'react';
import ProForm, {
  DrawerForm,
  ModalForm,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PlusOutlined } from '@ant-design/icons';
import './index.css';

const index_postList = async () => {
  const data = await getWholePosts();
  console.log(data, 999);
  return { data: data };
};

const index_postProfile = async () => {
  const data = await Profile();
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

  let [dataPerson, setPersonData] = useState([]);
  //动态信息
  useEffect(async () => {
    const resData = await index_postList();
    console.log(resData.data);
    setData(resData.data);
  }, []);
  //个人信息
  useEffect(async () => {
    const res1Data = await index_postProfile();
    console.log(res1Data, 11111);
    setPersonData(res1Data.data);
  }, []);

  //data=getRequst
  const [thumb, setThumb] = useState(false); //useState(data.thumb)
  const [count, setCount] = useState(0);
  const formRef = useRef();
  const [like, setLike] = useState(1); // useState(data.like)
  const [numComment, setNum] = useState(10); //useState(len(data.comment))

  const uploadPosting = async (value) => {
    console.log(11111111);
    const res = await add(value);
    if (res.code == 200) {
      message.success('add successfully');
    } else message.error('error');
  };
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
          <ModalForm
            title="Write moments here"
            formRef={formRef}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                Post
              </Button>
            }
            autoFocusFirstInput
            drawerProps={{
              destroyOnClose: true,
            }}
            onFinish={(value) => {
              uploadPosting(value);
            }}
          >
            <ProForm.Group>
              <ProFormText
                name="description"
                width="md"
                label="Put the description here"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
            </ProForm.Group>
            <ProFormText
              width="xl"
              name="content"
              label="write whatever you want"
              placeholder="请输入名称"
            />
            <ProFormUploadButton
              name="imgs"
              label="Upload"
              max={2}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                max: 3,
              }}
              action="/upload.do"
              extra="your photo here"
            />
          </ModalForm>,
        ],
      }}
      // content={content}
    >
      <Card style={{ marginLeft: 150, width: 800 }}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
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
                <div className="site-button-ghost-wrapper">
                  {/*<Button onClick={handleClick(item)}><IconText icon={StarOutlined} text={item.thumb} key="list-vertical-star-o" /></Button>,*/}
                  {/*<IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,*/}
                  {/*<IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,*/}

                  <Button style={{ width: 220 }} icon={<StarOutlined />}>
                    {' '}
                    {item.thumbs}
                  </Button>

                  <Button style={{ width: 220 }} icon={<LikeOutlined />}>
                    {' '}
                    {item.likes}
                  </Button>

                  <Button style={{ width: 220 }} icon={<MessageOutlined />}>
                    {' '}
                    {numComment}
                  </Button>
                </div>,
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

      <Card className="indexc" title="Personal Info">
        <Avatar shape="square" size={50} src={dataPerson.avatar} />,
        <h2 style={{ marginTop: 20 }}>{dataPerson.name}</h2>
        <h3 style={{ textAlign: 'left' }}>description:</h3>
        <h5 style={{ textAlign: 'left' }}>{dataPerson.description}</h5>
      </Card>
    </PageContainer>
  );
};

export default PostList;
