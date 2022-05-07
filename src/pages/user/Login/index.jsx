import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import { login } from '@/services/ant-design-pro/api';
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
      const ans = await login({ ...values });
      console.log(ans, '===========');
      if (ans.error_code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);

        const currentUserPk = ans.data[0]['pk'];
        const currentUserInfo = ans.data[0]['fields'];
        const background = ans.data[0]['fields']['background'];
        console.log('pk是');
        console.log(currentUserPk);
        localStorage.setItem('access_pk', currentUserPk);
        localStorage.setItem('user_info', JSON.stringify(currentUserInfo));
        localStorage.setItem('background', background);
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

  const { status } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="O&O"
          subTitle=" "
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          {status === 'error' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)',
              })}
            />
          )}
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
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="password"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          }

          <div>
            <Link
              to="email_verification_login"
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.register" defaultMessage="验证码登录" />
            </Link>
          </div>
          <div>
            <Link
              to="email_verification"
              style={{
                float: 'left',
              }}
            >
              <FormattedMessage id="pages.login.register" defaultMessage="创建新账户" />
            </Link>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
