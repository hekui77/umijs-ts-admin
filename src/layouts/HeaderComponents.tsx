import { Layout, Dropdown } from 'antd';
const { Header } = Layout;
import type { MenuProps } from 'antd';
import {
  removeSessionStorageToken,
  removeLocalStorageToken,
} from '@/utils/auth';
import { history } from 'umi';

const style = {
  headerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgStyle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#fff',
    cursor: 'pointer',
  },
};

const HeaderComponents = () => {
  const handleSignOut = () => {
    removeLocalStorageToken();
    removeSessionStorageToken();
    window.location.reload();
  };
  const handlePersonInfor = () => {
    history.push('/userManage/personInfor');
  };

  const items: MenuProps['items'] = [
    {
      label: <div onClick={handlePersonInfor}>个人信息</div>,
      key: '0',
    },
    {
      label: <div onClick={handleSignOut}>退出</div>,
      key: '1',
    },
  ];
  return (
    <Header style={style.headerStyle}>
      <div></div>
      <div>
        <Dropdown
          placement="bottom"
          menu={{ items }}
          arrow={{ pointAtCenter: true }}
        >
          <img style={style.imgStyle} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderComponents;
