import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Space, Tabs } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import styles from './login.less';
import {
  removeSessionStorageToken,
  setSessionStorageToken,
  removeLocalStorageToken,
  setLocalStorageToken,
} from '@/utils/auth';
import { history, useRequest } from 'umi';
import 'antd/es/form/style/index.less';

type LoginType = 'phone' | 'account';
const iconStyles: CSSProperties = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<LoginType>('account');

  const { run: loginApi } = useRequest(
    (data) => ({
      url: '/api/user/login',
      method: 'post',
      data,
    }),
    {
      manual: true,
    },
  );

  const handleSubmit = async (data: any) => {
    const res = await loginApi({
      phone: data.username,
      password: data.password,
    });
    if (data.autoLogin) {
      setLocalStorageToken(res.token);
      removeSessionStorageToken();
    } else {
      setSessionStorageToken(res.token);
      removeLocalStorageToken();
    }
    history.push('/');
  };

  const handleRegister = () => {
    history.push('/register');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="全球最大的代码托管平台"
          // actions={
          //   <Space>
          //     其他登录方式
          //     <AlipayCircleOutlined className={styles.icon} />
          //     <TaobaoCircleOutlined className={styles.icon} />
          //     <WeiboCircleOutlined className={styles.icon} />
          //   </Space>
          // }
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            {/* <Tabs.TabPane key={'account'} tab={'账号密码登录'} /> */}
            {/* <Tabs.TabPane key={'phone'} tab={'手机号登录'} /> */}
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div style={{ marginBlockEnd: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a style={{ float: 'right' }} onClick={handleRegister}>
              立即注册
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
