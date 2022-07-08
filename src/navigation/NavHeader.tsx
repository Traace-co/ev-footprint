import { Menu } from "antd"
import { Link } from "react-router-dom"
import logo from './logo.png'

export function NavHeader() {

  return <div className="flex flex-row w-full items-center gap-4">
    <div>
      <img src={logo} height='50px' width='212px' alt='EV Footprint'
        style={{ height: '50px', width: '212px', objectFit: 'contain' }} />
    </div>
    <Menu
      className="flex-grow"
      mode="horizontal"
      defaultSelectedKeys={['landing']}
      items={[{
        key: 'landing',
        label: <Link to='/'>Simulator</Link>
      }, {
        key: 'methodology',
        label: <Link to='/methodology'>Methodology</Link>
      }]}
    />
  </div>
}