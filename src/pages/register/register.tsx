import styles from '../login/login.less';
import './register.less';
import { Form, Input, Button } from 'antd';
import { history, useRequest } from 'umi';

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const { run: registerApi, loading: registerLoading } = useRequest(
    (data) => ({
      url: '/api/user/register',
      method: 'post',
      data,
    }),
    { manual: true },
  );
  const onFinish = async (values: any) => {
    const data = { ...values };
    delete data.passwordAgain;
    const res = await registerApi(data);
    console.log(res);
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
              name="username"
              rules={[{ required: true, message: '请输入手机号' }]}
            >
              <Input placeholder="手机号" />
            </Form.Item>
            <Form.Item name="email">
              <Input placeholder="邮箱" />
            </Form.Item>
            <Form.Item name="nickname">
              <Input placeholder="昵称" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
              hasFeedback
            >
              <Input.Password placeholder="密码" />
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
              <Input.Password placeholder="密码" />
            </Form.Item>
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
