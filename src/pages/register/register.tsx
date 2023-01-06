import styles from '../login/login.less';
import './register.less';
import { Form, Input, Button, Checkbox } from 'antd';
import { history, useRequest } from 'umi';
import {
  UserOutlined,
  PhoneOutlined,
  LockOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';
import { setSessionStorageToken, removeLocalStorageToken } from '@/utils/auth';

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { run: registerApi, loading: registerLoading } = useRequest(
    (data) => ({
      url: '/api/user/register',
      method: 'post',
      data,
    }),
    { manual: true },
  );

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

  const onLoginApi = async (data: any) => {
    const res = await loginApi({
      phone: data.phone,
      password: data.password,
    });
    setSessionStorageToken(res.token);
    removeLocalStorageToken();
    history.push('/');
  };

  const onFinish = async (values: any) => {
    const data = { ...values };
    delete data.passwordAgain;
    await registerApi(data);
    if (isLogin) {
      await onLoginApi(data);
    } else {
      history.push('/login');
    }
  };

  // 立即登录
  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    setIsLogin(e.target.checked);
  };

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className="register-top">
          <div className="register-header">
            <span className="register-logo">
              <img
                src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                alt=""
              />
            </span>
            <span className="register-title">Github</span>
          </div>
          <div className="register-desc">全球最大的代码托管平台</div>
        </div>
        <div style={{ width: '328px', margin: '0 auto' }}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: '请输入手机号' }]}
            >
              <Input
                prefix={<PhoneOutlined />}
                size="large"
                placeholder="手机号"
              />
            </Form.Item>
            <Form.Item name="email">
              <Input
                prefix={<GlobalOutlined />}
                size="large"
                placeholder="邮箱"
              />
            </Form.Item>
            <Form.Item name="nickname">
              <Input
                prefix={<UserOutlined />}
                size="large"
                placeholder="昵称"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item
              name="passwordAgain"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请再次输入密码',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="密码"
              />
            </Form.Item>
            <div style={{ marginBottom: '24px' }}>
              <Checkbox onChange={onChangeCheckbox} checked={isLogin}>
                立即登录
              </Checkbox>
              <a style={{ float: 'right' }} onClick={handleLogin}>
                返回登录
              </a>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={registerLoading}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
