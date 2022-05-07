import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import { email_login } from '@/services/ant-design-pro/api';
import styles from './index.less';
import { Link } from 'umi';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    try {
      // 登录
      const ans = await email_login({ ...values });
      console.log(ans, '===========');
      if (ans.error_code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);

        const currentUserPk = ans.data[0]['pk'];
        const currentUserInfo = ans.data[0]['fields'];
        console.log('pk是');
        console.log(currentUserPk);
        localStorage.setItem('access_pk', currentUserPk);
        localStorage.setItem('user_info', JSON.stringify(currentUserInfo));

        setUserLoginState(ans);

        if (!history) return;
        history.push('../posts');
        return;
      } else {
        message.error(ans.msg);
      }
      console.log(ans); // 如果失败去设置用户错误信息
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="O&O"
          subTitle="正在使用邮箱验证码登录"
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          {
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="email"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="given_verification"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="verification code"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入验证码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          }
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
