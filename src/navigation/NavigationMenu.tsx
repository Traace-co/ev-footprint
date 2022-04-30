import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { navigationBackgroundColor } from "../design/colors";
import { routes } from "./routes";

export function NavigationMenu(props: { className?: string }) {
  const location = useLocation()
  const selectedKey = location.pathname.replace('/', '')

  return <Menu
    style={{ minWidth: 0, flex: "auto", backgroundColor: navigationBackgroundColor }}
    className={props.className}
    mode="horizontal"
    theme='dark'
    selectedKeys={[selectedKey]}
    items={[{
      key: routes.pathnames.simulator,
      label: <Link to='/'>SIMULATOR</Link>
    }, {
      key: routes.pathnames.methodology,
      label: <Link to={`/${routes.pathnames.methodology}`}>METHODOLOGY</Link>
    }, {
      key: routes.pathnames.about,
      label: <Link to={`/${routes.pathnames.about}`}>ABOUT</Link>
    }]}
  />
}