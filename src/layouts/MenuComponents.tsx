import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { history, IRoute, useLocation } from 'umi';
import pathRegexp from 'path-to-regexp';

interface MenuRouteProps {
  routes?: IRoute[];
}

const MenuComponents: React.FC<MenuRouteProps> = ({ routes }) => {
  const { pathname } = useLocation();

  const mapRoutes = (routes: any) => {
    return routes?.map((item: IRoute) => {
      if (!item.hideInMenu) {
        return {
          key: item.path,
          icon: item.icon,
          label: item.title,
          children: item.routes?.length ? mapRoutes(item.routes) : undefined,
        };
      }
    });
  };
  const handleCliclMenuItem: MenuProps['onClick'] = (e) => {
    history.push(e.key);
  };

  const menuList =
    routes?.filter((r) => {
      if (r.exact) {
        return routes.find(
          ({ path }) => path && pathRegexp(path).exec(pathname),
        );
      }
      return routes.find(({ path }) => {
        return (
          path &&
          path
            .split('/')
            .some((item, index) =>
              pathRegexp(item).exec(pathname.split('/')[index]),
            )
        );
      });
    }) ?? [];

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[pathname]}
      mode="inline"
      items={mapRoutes(menuList[0].routes)}
      onClick={handleCliclMenuItem}
    />
  );
};

export default MenuComponents;
