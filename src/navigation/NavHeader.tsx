import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTypedTranslation } from "../utils/translation-codegen"
import githubLogo from './github-64.png'
import logo from './logo.png'
import { NavigationMenu } from "./NavigationMenu"
import { routes } from "./routes"

export const baseTitle = 'Footprint simulator for electric vehicles'

export function buildTitle(prefix: string) {
  return `${prefix} - ${baseTitle}`
}

export function NavHeader() {
  const location = useLocation()
  const { t } = useTypedTranslation()

  const selectedKey = location.pathname.replace('/', '')

  let titlePrefix: string | undefined
  switch (selectedKey) {
    case routes.pathnames.simulator:
      titlePrefix = t('menu.title')
      break
    case routes.pathnames.about:
      titlePrefix = t('menu.about')
      break
    case routes.pathnames.methodology:
      titlePrefix = (t('menu.methodology'))
      break
  }

  let title = baseTitle
  if (titlePrefix) {
    title = buildTitle(titlePrefix)
  }

  useEffect(() => {
    document.title = title
  })

  return <div className="flex flex-row w-full items-center gap-4">
    <div className="p-2">
      <Link to='/'>
        <img src={logo} alt={t('menu.title')}
          style={{ height: '41px', objectFit: 'contain' }} />
      </Link>
    </div>
    <NavigationMenu className="flex-grow hidden sm:block" />
    <div className="flex-grow" />
    <a
      target='_blank' href='https://github.com/Traace-co/ev-footprint' className="h-1/2 text-white/[0.65] hover:text-white" rel="noreferrer" >
      <div className='flex flex-row gap-2 items-center'>
        <span className='hidden sm:block'>{t('menu.github')}</span>
        <img src={githubLogo} alt={t('menu.github')} style={{ width: '32px', height: '32px' }} />
      </div>
    </a>
  </div>
}