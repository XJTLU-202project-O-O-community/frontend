import { useState, useEffect } from 'react';
import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import { Link, useRequest, history } from 'umi';
import { email_verification } from '@/services/ant-design-pro/api';
import styles from './style.less';
import { values } from 'lodash';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const Email_verification = () => {
  let interval;
  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const submit = async (data) => {
    console.log('正在发送数据');
    console.log(data);
    //发送请求
    const ans = await email_verification(data);
    console.log('已经收到结果');
    if (ans.error_code === 200) {
      localStorage.setItem('login_email', ans['author_email']);
      history.push({
        pathname: '/user/email_login',
        state: {
          account: ans.email,
        },
      });
    } else {
      message.error(ans.msg);
    }
    console.log(ans);
  };

  const onFinish = (values) => {
    console.log('发送验证码请求');
    console.log(values);
    submit(values);
  };

  return (
    <div className={styles.container}>
    <div className={styles.main}>
      <h3>我们将会往您的输入的邮箱发送验证码</h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: '请输入邮箱地址!',
            },
            {
              type: 'email',
              message: '邮箱地址格式错误!',
            },
          ]}
        >
          <Input size="large" placeholder="邮箱" />
        </FormItem>
        <FormItem>
          <Button size="large" className={styles.submit} type="primary" htmlType="submit">
            <span>发送验证码</span>
          </Button>
          <Link className={styles.login} to="/user/login">
            <span>使用已有账户登录</span>
          </Link>
        </FormItem>
      </Form>
      </div>
      </div>
  );
};

export default Email_verification;
