import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from './logo.png'
import { NavigationMenu } from "./NavigationMenu"
import { routes } from "./routes"

export const baseTitle = 'Footprint simulator for electric vehicles'

export function buildTitle(prefix: string) {
  return `${prefix} - ${baseTitle}`
}

export function NavHeader() {
  const location = useLocation()

  const selectedKey = location.pathname.replace('/', '')

  let titlePrefix: string | undefined
  switch (selectedKey) {
    case routes.pathnames.simulator:
      titlePrefix = 'EV Footprint'
      break
    case routes.pathnames.about:
      titlePrefix = 'About'
      break
    case routes.pathnames.methodology:
      titlePrefix = 'Methodology'
      break
  }

  let title = baseTitle
  if (titlePrefix) {
    title = buildTitle(titlePrefix)
  }

  useEffect(() => {
    document.title = title
  })

  return <div className="flex flex-row w-full items-center gap-4 justify-center">
    <div className="p-2">
      <Link to='/'>
        <img src={logo} alt='EV Footprint'
          style={{ height: '41px', objectFit: 'contain' }} />
      </Link>
    </div>
    <NavigationMenu className="flex-grow hidden sm:block" />
  </div>
}