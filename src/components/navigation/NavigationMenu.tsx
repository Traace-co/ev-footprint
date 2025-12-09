'use client'

import { Menu } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationBackgroundColor } from '../design/colors'
import { routes } from './routes'

export function NavigationMenu(props: { className?: string }) {
  const pathname = usePathname()
  const selectedKey = pathname.replace('/', '').replace(/\/$/, '') || routes.pathnames.simulator

  return (
    <Menu
      style={{ minWidth: 0, flex: 'auto', backgroundColor: navigationBackgroundColor }}
      className={props.className}
      mode="horizontal"
      theme='dark'
      selectedKeys={[selectedKey]}
      items={[{
        key: routes.pathnames.simulator,
        label: <Link href='/'>SIMULATOR</Link>
      }, {
        key: routes.pathnames.methodology,
        label: <Link href='/methodology'>METHODOLOGY</Link>
      }, {
        key: routes.pathnames.about,
        label: <Link href='/about'>ABOUT</Link>
      }]}
    />
  )
}
