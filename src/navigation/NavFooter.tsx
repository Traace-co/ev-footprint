import { Divider } from "antd"
import { Link } from "react-router-dom"
import { routes } from "./routes"

function NavLink(props: { pathname: string, title: string }) {
  const { pathname, title } = props
  return <Link to={`/${pathname}`} key={pathname}>
    {title}
  </Link>
}

export function NavFooter() {
  return <div className="flex flex-col gap-2 items-center justify-center mb-2 text-white">
    <div className="flex flex-row gap-1 items-center mb-4">
      <NavLink pathname={routes.pathnames.simulator} title='SIMULATOR' />
      <Divider type='vertical' orientation='center' />
      <NavLink pathname={routes.pathnames.methodology} title='METHODOLOGY' />
      <Divider type='vertical' orientation='center' />
      <NavLink pathname={routes.pathnames.about} title='ABOUT' />
    </div>
    <div className="text-sm">Built with 💚 by</div>
    <div style={{ height: '26px' }}>
      <a href="https://tennaxia.com" target="_blank" rel="noreferrer">
        <img src={'/logo_new_light.svg'} alt="Tennaxia logo" className="h-full" />
      </a>
    </div>
  </div >
}