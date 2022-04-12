import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import '@chatui/core/es/styles/index.less';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import './chat.less';
import { message, List, Avatar, Badge, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { getHistory, getMessageList } from '@/services/chat';
import { getFollowingList } from '@/services/fans';
import { GetPersonInfo } from '@/services/person';

const App = (props) => {
  let { messages, appendMsg, setTyping, prependMsgs, resetList } = useMessages([]);
  const [user_info, setUser_info] = useState(null);
  const [message_list, setMessage_list] = useState([]);
  const [following_lst, setFollowingList] = useState([]);
  const message_list_ref = useRef([]);
  const following_lst_ref = useRef([]);
  const ws = useRef(null);
  const target_user = useRef(null);
  const user_id = useRef(null);
  const [tab, setTab] = useState('tab1');

  useEffect(() => {
    init();
  }, []);

  useLayoutEffect(() => {
    if (user_id.current) {
      ws.current = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${localStorage.getItem('access_pk')}/`,
      );

      ws.current.onmessage = async (e) => {
        const res = JSON.parse(e.data);
        const msg = handleMsg(res);
        if (res.recipient_id == user_id.current) {
          if (res.user_id == target_user.current.id) {
            appendMsg(msg);
          }
        }
        appendMsgList(res);
      };

      ws.current.onerror = async (e) => {
        message.error('Something wrong happens. Please try again later');
      };
    }
  }, [user_id.current]);

  const init = async () => {
    user_id.current = localStorage.getItem('access_pk');
    setUser_info(JSON.parse(localStorage.getItem('user_info')));

    // fetchMessageList
    const message_list_res = await getMessageList(user_id.current);
    setMessage_list(message_list_res.data);
    message_list_ref.current = message_list_res.data;

    // fetchFollowingList
    const res = await getFollowingList(user_id.current);
    let following_lst = res.data.following_list;
    for (let index in following_lst) {
      following_lst[index] = {
        id: following_lst[index].id,
        message_user_id: following_lst[index].id,
        username: following_lst[index].username,
        avatar: following_lst[index].photo,
        moment: following_lst[index].moment,
      };
    }
    setFollowingList(following_lst);
    following_lst_ref.current = following_lst;

    // handle target_user
    const target_id = props.location.query.target_id;
    if(target_id){
      let flag = 0;
      for(let i in message_list_ref.current){
        if(message_list_ref.current[i].message_user_id==String(target_id)){
          handleTarget(message_list_ref.current[i]);
          flag = 1;
          break;
        }
      }
      if(flag == 0){
        const res = await GetPersonInfo({his_id: target_id});

        if(res.error_code==200){
          const info = res.data.personal_data[0].fields;
          const target_info = {
            message_user_id: res.data.personal_data[0].pk,
            username: info.name, 
            avatar: info.photo
          }
          setMessage_list([...message_list_ref.current, target_info])
          console.log(message_list)
          message_list_ref.current = [...message_list_ref.current, target_info];
          handleTarget(target_info);
        }
      }
    }
  };

  const handleTarget = async (target) => {
    resetList();
    target.id = target.message_user_id;
    target_user.current = target;
    const res = await getHistory(user_id.current, target.id);
    if (res.error_code == 200) {
      let msgItems = res.data;
      if (!msgItems) return;
      for (let index in msgItems) {
        msgItems[index] = handleMsg(msgItems[index]);
      }
      prependMsgs(msgItems);

      let messageList = message_list_ref.current;
      for (let x in messageList) {
        if (messageList[x].message_user_id == target.id) {
          messageList[x].num = 0;
          setMessage_list([...messageList]);
          message_list_ref.current = messageList;
          break;
        }
      }
    }
  };

  const handleSend = async (type, val) => {
    if (type === 'text' && val.trim()) {
      appendMsg(
        handleMsg({
          message: val,
          createdAt: Date.parse(new Date()),
          recipient_id: target_user.current.message_user_id,
        }),
      );
      ws.current.send(
        JSON.stringify({
          user_id: user_id.current,
          recipient_id: target_user.current.message_user_id,
          message: val,
        }),
      );
      appendMsgList2(val);
    }
  };

  const appendMsgList = (res) => {
    let flag = false;
    let messageList = message_list_ref.current;
    console.log(messageList);
    for (let x in messageList) {
      if (messageList[x].message_user_id == res.user_id) {
        flag = true;
        messageList[x].msg = res.message;
        if (messageList[x].message_user_id != target_user.message_user_id) {
          if (messageList[x].num) {
            messageList[x].num += 1;
          } else {
            messageList[x].num = 1;
          }
        }
        setMessage_list([...messageList]);
        message_list_ref.current = messageList;
        return;
      }
    }
    if (!flag) {
      let followingList = following_lst_ref.current;
      console.log(followingList);
      for (let x in followingList) {
        if ((followingList[x].message_user_id == res.recipient_id) | res.user_id) {
          let new_messager = followingList[x];
          new_messager.msg = res.message;
          setMessage_list([...messageList, new_messager]);
          message_list_ref.current = [...messageList, new_messager];
          break;
        }
      }
    }
  };

  const appendMsgList2 = (val) => {
    let flag = false;
    let messageList = message_list_ref.current;
    for (let x in messageList) {
      if (messageList[x].message_user_id == target_user.current.message_user_id) {
        messageList[x].msg = val;
        setMessage_list([...messageList]);
        message_list_ref.current = messageList;
        flag = true;
        return;
      }
    }
    if (!flag) {
      let followingList = following_lst_ref.current;
      console.log(followingList);
      for (let x in followingList) {
        if (followingList[x].message_user_id == target_user.current.message_user_id) {
          let new_messager = followingList[x];
          new_messager.msg = val;
          setMessage_list([...messageList, new_messager]);
          message_list_ref.current = [...messageList, new_messager];
          break;
        }
      }
    }
  };

  const handleMsg = (msgItem) => {
    return {
      _id: msgItem.id,
      type: 'text',
      content: { text: msgItem.message },
      createdAt: msgItem.createdAt,
      position: msgItem.recipient_id == user_id.current ? 'left' : 'right',
      hasTime: true,
      user: {
        avatar:
          msgItem.recipient_id == user_id.current
            ? `/server/media/${target_user.current?.avatar}`
            : '/server/media/' + user_info?.photo,
      },
    };
  };

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <PageContainer>
      <ProCard split="vertical" style={{ width: '80%', marginLeft: '10%', height: '780px' }}>
        <ProCard
          colSpan="30%"
          tabs={{
            tabPosition: 'top',
            activeKey: tab,
            onChange: (key) => {
              setTab(key);
            },
          }}
        >
          <ProCard.TabPane key="tab1" tab="Message List">
            <List
              itemLayout="horizontal"
              rowKey="message_user_id"
              dataSource={message_list ? message_list : []}
              renderItem={(item) => (
                <List.Item onClick={() => handleTarget(item)}>
                  <List.Item.Meta
                    avatar={
                      <Badge count={item?.num} overflowCount={99}>
                        <Avatar src={`/server/media/${item.avatar}`} />
                      </Badge>
                    }
                    title={item.username}
                    description={item.msg}
                  />
                </List.Item>
              )}
            />
          </ProCard.TabPane>
          <ProCard.TabPane key="tab2" tab="Following List">
            <List
              itemLayout="horizontal"
              rowKey="message_user_id"
              dataSource={following_lst ? following_lst : []}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleTarget(item)}
                  actions={[
                    <Button type="default" shape="round">
                      following
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={`/server/media/${item.avatar}`} />}
                    title={item.username}
                    description={item?.moment}
                  />
                </List.Item>
              )}
            />
          </ProCard.TabPane>
        </ProCard>
        {target_user.current ? (
          <ProCard>
            <Chat
              navbar={{ title: target_user.current?.username }}
              messages={messages}
              renderMessageContent={renderMessageContent}
              onSend={handleSend}
            />
          </ProCard>
        ) : (
          <></>
        )}
      </ProCard>
    </PageContainer>
  );
};

export default App;
