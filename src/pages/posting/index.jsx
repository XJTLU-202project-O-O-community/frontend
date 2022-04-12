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
import pic1 from '/media/rose.jpg';
import pic2 from '/media/kobe.png';
import { Link } from 'umi';
import localStorage from 'localStorage';

const index_postList = async () => {
  const data = await getWholePosts();
  console.log(data, 999);
  //return { data: data };
  return { data: data.data.moments };
};

const index_postProfile = async (params) => {
  const data = await Profile(params);
  return data.data[0].fields;
};

const App = (values) => {
  const list11 = values.toString().split(',');
  list11.pop();
  console.log(list11);
  return (
    <Image.PreviewGroup>
      <div style={{ margin: 25 }}>
        {list11.map((item) => (
          <Image width={90} height={90} src={'http://localhost:8000/media/moments/' + item} />
        ))}
      </div>
    </Image.PreviewGroup>
  );
};

const PostList = (props) => {
  const data1 = localStorage.getItem('access_pk');
  const own_id = { his_id: data1 };
  console.log(data1, 7355608);
  let [data, setData] = useState([]);

  let [dataPerson, setPersonData] = useState([]);
  //动态信息
  useEffect(async () => {
    const resData = await index_postList();

    setData(resData.data);
  }, []);
  //个人信息
  useEffect(async () => {
    const res1Data = await index_postProfile(own_id);
    console.log(res1Data, 11111);
    setPersonData(res1Data);
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
    console.log(res, 333);
    if (res.error_code == 200) {
      message.success('add successfully');
    } else message.error('error');
  };

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
              console.log(value, 99999);
              uploadPosting(value);
              //location.reload()
              return true;
            }}
          >
            <ProFormText name="user_id" width="md" label="User id" readonly initialValue={data1} />
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
              max={3}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                max: 3,
              }}
              action="/api/posting/imgs/"
              extra="your photo here"
            />
          </ModalForm>,
        ],
      }}
    >
      <Card style={{ marginLeft: 170, width: 800 }}>
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
                    {item.likes}
                  </Button>

                  <Button style={{ width: 220 }} icon={<LikeOutlined />}>
                    {' '}
                    {item.thumbs}
                  </Button>

                  <Button style={{ width: 220 }} icon={<MessageOutlined />}>
                    {' '}
                    {numComment}
                  </Button>
                </div>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    shape="square"
                    size={50}
                    src={'http://localhost:8000/media/' + item.user_id__photo}
                  />
                }
                title={<Link to={`/personal_view/${item.userid}/`}>{item.user_id__name}</Link>}
                description={item.user_id__signature}
              />
              {item.content}
              {App(item.url)}
            </List.Item>
          )}
        />
      </Card>

      <Card
        style={{ textAlign: 'center', width: 300, float: 'right', marginTop: -data.length * 200 }}
        title="Personal Info"
      >
        <Avatar shape="square" size={50} src={'http://localhost:8000/media/' + dataPerson.photo} />,
        <h2 style={{ marginTop: 20 }}>{dataPerson.name}</h2>
        <h3 style={{ textAlign: 'left' }}>description:</h3>
        <h5 style={{ textAlign: 'left' }}>{dataPerson.signature}</h5>
      </Card>
    </PageContainer>
  );
};

export default PostList;
