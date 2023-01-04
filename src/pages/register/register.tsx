import styles from '../login/login.less';
import './register.less';
import { Form, Input, Button } from 'antd';

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
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
            <Form.Item name="username">
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
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
