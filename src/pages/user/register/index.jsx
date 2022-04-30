import { useState, useEffect } from 'react';
import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import { Link, useRequest, history } from 'umi';
import { this_register } from '@/services/ant-design-pro/api';
import styles from './style.less';
import { values } from 'lodash';


const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [prefix, setPrefix] = useState('86');
  const [popover, setPopover] = useState(false);
  const confirmDirty = false;
  let interval;
  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const onFinish = (values) => {
    values["email"] = register_email;
    console.log("正在提交数据");
    console.log(values);
    submit(values);
  };

  const submit = async (data) => {
    console.log("正在注册请求");
    console.log(data);
    //发送请求
    const ans = await this_register(data);
    console.log("收到注册结果");
    if (ans.error_code === 200) {
      history.push({
        pathname: '/user/register-result',
        state: {
          account: ans.email,
        },
      });
    }
    else {
      message.error(ans.msg);
    }
    console.log(ans)
  }

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }

    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    } // 有值的情况

    if (!visible) {
      setVisible(!!value);
    }

    setPopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };

  const changePrefix = (value) => {
    setPrefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  const register_email = "test2@2.com";

  return (
    <div className={styles.main}>
      <h3>一封验证邮件已发送</h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="given_verification"
          rules={[
            {
              required: true,
              message: '请输入验证码!',
            },
          ]}
        >
          <Input size="large" placeholder="验证码(1111)" />
        </FormItem>
        <FormItem
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户昵称!',
            },
          ]}
        >
          <Input size="large" placeholder="用户名" />
        </FormItem>
        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode;
            }

            return node;
          }}
          content={
            visible && (
              <div
                style={{
                  padding: '4px 0',
                }}
              >
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            )
          }
          overlayStyle={{
            width: 240,
          }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: '确认密码',
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input size="large" type="password" placeholder="确认密码" />
        </FormItem>
        <FormItem
          name="gender"
          rules={[
            {
              required: false,
              message: '请输入性别（可选）',
            },
          ]}
        >
          <Input size="large" placeholder="性别（可选）" />
        </FormItem>
        <FormItem
          name="actualName"
          rules={[
            {
              required: false,
              message: '请输入真实姓名（可选）',
            },
          ]}
        >
          <Input size="large" placeholder="真实姓名（可选）" />
        </FormItem>
        <FormItem
          name="birth"
          rules={[
            {
              required: false,
              message: '请输入生日（可选）',
            },
            {
              type: 'date',
              message: '请输入正确日期格式!',
            },
          ]}
        >
          <Input size="large" placeholder="生日（可选）" />
        </FormItem>
        <FormItem>
          <Button
            size="large"

            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <span>注册</span>
          </Button>
          <Link className={styles.login} to="/user/login">
            <span>使用已有账户登录</span>
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};

export default Register;
