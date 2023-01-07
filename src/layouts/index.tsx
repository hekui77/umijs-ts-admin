import { Breadcrumb, Layout } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
import MenuComponents from './MenuComponents';
import HeaderComponents from './HeaderComponents';
import { history } from 'umi';

export default (props: any) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleHome = () => {
    history.push('/');
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
          }}
          onClick={handleHome}
        ></div>
        <MenuComponents routes={props.routes} />
      </Sider>
      <Layout className="site-layout">
        <HeaderComponents />
        <Content style={{ margin: 16, background: '#fff' }}>
          <div style={{ padding: 16 }}>{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
