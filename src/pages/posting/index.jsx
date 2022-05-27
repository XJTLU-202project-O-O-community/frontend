import React from 'react';
import { Button, Card, Image, message } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { List, Avatar } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { getWholePosts, add, Profile, getComment, postComment } from '@/services/posts';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { ProFormUploadButton } from '@ant-design/pro-form';
import { useRef } from 'react';
import ProForm, { ModalForm } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import './index.css';
import { Link } from 'umi';
import HeaderSearch from '@/components/HeaderSearch';
import { searchPerson } from '@/services/person';
import { history } from 'umi';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';

const index_postList = async () => {
  const data = await getWholePosts();
  console.log(data, 999);
  const data1 = data.data.moments;
  for (var i = 0; i < data1.length; i++) {
    data1[i]['show'] = false;
  }
  return { data: data1 };
};

const index_postProfile = async (params) => {
  const data = await Profile(params);
  console.log(data, 9000);
  return data.data.personal_data[0]?.fields;
};

const exitFunction = () => {
  localStorage.removeItem('access_pk');
  location.reload();
};

const App = (values) => {
  let str=values?.toString()
  if(str.length>0){
    if(str.substring(str.length-1)!=","){
      str=str.substring(1)+","
    }
  }
  const list11 = str.split(',')


    // .split(',');
  list11?.pop();
  console.log(list11);
  return (
    <Image.PreviewGroup>
      <div style={{ margin: 25 }}>
        {list11?.map((item) => (
          <Image width={90} height={90} src={'http://localhost:8000/media/moments/' + item} />
        ))}
      </div>
    </Image.PreviewGroup>
  );
};

const PostList = () => {
  const data1 = localStorage.getItem('access_pk');
  const own_id = { his_id: data1 };
  console.log(data1, 7355608);
  let [data, setData] = useState([]);
  let [show, setShow] = useState({});

  const [moments, setMoments] = useState([]);
  let [dataPerson, setPersonData] = useState([]);
  let [comments, setComment] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const resData = await getWholePosts();
    console.log(resData.data.moments, 999);
    resData.data.moments.map((item) => {
      item.show_comment = false;
      return item;
    });
    console.log(resData.data.moments, 999);
    setMoments(resData.data.moments);
  }, []);

  // //动态信息
  // useEffect(async () => {
  //   const resData = await index_postList();
  //   console.log(resData.data, 1000);
  //   setData(resData.data);
  // }, []);
  useEffect(async () => {
    const resData = await getComment();
    setComment(resData.data.comments);
  }, []);
  //个人信息
  useEffect(async () => {
    const res1Data = await index_postProfile(own_id);
    setPersonData(res1Data);
  }, []);

  //data=getRequst

  const [thumb, setThumb] = useState(false); //useState(data.thumb)
  const [count, setCount] = useState(0);
  const formRef = useRef();
  const [like, setLike] = useState(1); // useState(data.like)
  const [numComment, setNum] = useState(10); //useState(len(data.comment))

  const showComment = (value, num) => {
    console.log(num);
    if (num && value == undefined) {
      return <h3>no comments here</h3>;
    }
    if (num && value.length > 0) {
      return (
        <div>
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={value}
            renderItem={(item1) => (
              <li>
                <Comment
                  actions={item1.actions}
                  author={item1.poster__name}
                  avatar={'http://localhost:8000/media/' + item1.poster__photo}
                  content={item1.content}
                  datetime={item1.ctime}
                />
              </li>
            )}
          />
        </div>
      );
    } else if (num && value.length <= 0) return <h3>no comments here</h3>;
  };

  const searching = async (value) => {
    const res = await searchPerson(value);
    console.log(res, 333);
    if (res.error_code == 200) {
      console.log(res, 333);
      if (res.data.length == 0) {
        message.error('No such person');
      } else {
        history.push(`/searchperson/${res.data[0].pk}`);
      }
    } else if (res.error_code == 400) {
      message.error('No such person');
    } else if (res.error_code == 500) {
      message.error('Counter problems');
    }
  };
  const uploadPosting = async (value) => {
    console.log(11111111);
    const res = await add(value);
    console.log(res, 333);
    if (res.error_code == 200) {
      message.success('add successfully');
      const data1 = await index_postList();
      setMoments(data1.data);
    } else if (res.error_code == 300) {
      message.error('please type in some content');
    } else message.error('error');
  };
  const upload_comment = async (value) => {
    const res = await postComment(value);
    if (res.code == 200) {
      message.success('Comment successful');
      const resData = await getComment();
      console.log(resData.data.comments['14'], 99999);
      setComment(resData.data.comments);
    } else message.error('Can not add comment');
  };

  const wrap = (value) => {
    let arr1 = value.split('\n');
    let res = null;
    for (var i = 0; i < arr1.length; i++) {
      if (i == 0) {
        res = arr1[i];
      } else
        res = (
          <span>
            {res}
            <br />
            {arr1[i]}
          </span>
        );
    }
    return res;
  };

  return (
    <PageContainer
      style={{ color: 'pink' }}
      header={{
        className: 'back',

        title: [<h5></h5>],
        ghost: true,

        extra: [
          // <input />,
          <Button onClick={exitFunction}>Exit</Button>,
          <div
            style={{
              textAlign: 'right',
              height: '40px',
              lineHeight: '40px',
              boxShadow: '0 1px 4px rgba(0,21,41,.12)',
              padding: '0 32px',
              width: '300px',
            }}
          >
            <HeaderSearch
              placeholder="站内搜索"
              dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
              onSearch={(value) => {
                searching(value);
                return true; // eslint-disable-line
              }}
            />
          </div>,

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
              value['user_id'] = data1;
              uploadPosting(value);
              return true;
            }}
          >
            <ProFormTextArea
              style={{ height: 120 }}
              allowClear
              width="xl"
              label="content"
              name="content"
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
      <Card style={{ marginLeft: 110, width: 750 }}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: async (page) => {},
            pageSize: 5,
          }}
          dataSource={moments}
          footer={
            <div>
              <b>All moments is here</b>
            </div>
          }
          renderItem={(item) => (
            <List.Item key={item.title}>
              <List.Item.Meta
                avatar={
                  <Avatar shape="square" size={50} src={'/server/media/' + item.user_id__photo} />
                }
                title={<Link to={`/personal_view/${item.user_id}/`}>{item.user_id__name}</Link>}
                description={item.user_id__signature}
              />

              <span>{wrap(item.content)}</span>
              {App(item.url)}

              <div className="site-button-ghost-wrapper">
                {/*<Button onClick={handleClick(item)}><IconText icon={StarOutlined} text={item.thumb} key="list-vertical-star-o" /></Button>,*/}
                {/*<IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,*/}
                {/*<IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,*/}

                <Button style={{ width: 180 }} icon={<StarOutlined />}>
                  {item.likes}
                </Button>

                <Button style={{ width: 180 }} icon={<LikeOutlined />}>
                  {item.thumbs}
                </Button>

                <Button
                  onClick={() => setShow(item.show ? (item.show = false) : (item.show = true))}
                  style={{ width: 180 }}
                  icon={<MessageOutlined />}
                >
                  {comments[item.id.toString()]?.length}
                </Button>

                <ModalForm
                  title="Write comments here"
                  formRef={formRef}
                  trigger={
                    <Button type="primary">
                      <PlusOutlined />
                      Add
                    </Button>
                  }
                  autoFocusFirstInput
                  drawerProps={{
                    destroyOnClose: true,
                  }}
                  onFinish={(value) => {
                    value['user_id'] = localStorage.getItem('access_pk');
                    value['moment_id'] = item.id;
                    upload_comment(value);
                    return true;
                  }}
                >
                  <ProForm.Group>
                    <ProFormText
                      name="content"
                      width="md"
                      label="Put your comment here"
                      tooltip="最长为 24 位"
                      placeholder="请输入名称"
                    />
                  </ProForm.Group>
                </ModalForm>
              </div>

              {showComment(comments[item.id.toString()], item.show)}
            </List.Item>
          )}
        />
      </Card>
      <Card
        style={{
          textAlign: 'center',
          width: '270px',
          height: '280px',
          left: '50%',
          top: '50%',
          marginLeft: '480px',
          marginTop: '-140px',
          position: 'fixed',
        }}
        title="Personal Info"
      >
        <Avatar shape="square" size={75} src={'http://localhost:8000/media/' + dataPerson?.photo} />
        <h2 style={{ marginTop: 20 }}>{dataPerson?.name}</h2>
        <h3 style={{ textAlign: 'left' }}>description:</h3>
        <h5 style={{ textAlign: 'left' }}>{dataPerson?.signature}</h5>
      </Card>
    </PageContainer>
  );
};

export default PostList;
