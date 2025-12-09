'use client'

import { withBasePath } from '@/lib/basePath'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavigationMenu } from './NavigationMenu'
import { routes } from './routes'

export const baseTitle = 'Footprint simulator for electric vehicles'

export function buildTitle(prefix: string) {
  return `${prefix} - ${baseTitle}`
}

export function NavHeader() {
  const pathname = usePathname()

  const selectedKey = pathname.replace('/', '').replace(/\/$/, '')

  let titlePrefix: string | undefined
  switch (selectedKey) {
    case routes.pathnames.simulator:
    case '':
      titlePrefix = 'EV Footprint'
      break
    case routes.pathnames.about:
      titlePrefix = 'About'
      break
    case routes.pathnames.methodology:
      titlePrefix = 'Methodology'
      break
  }

  return (
    <div className="flex flex-row w-full items-center gap-4">
      <div className="p-2">
        <Link href='/'>
          <img src={withBasePath('/logo.png')} alt='EV Footprint'
            style={{ height: '41px', objectFit: 'contain' }} />
        </Link>
      </div>
      <NavigationMenu className="flex-grow hidden sm:block" />
      <div className="flex-grow" />
      <a
        target='_blank' href='https://github.com/Traace-co/ev-footprint' className="h-1/2 text-white/[0.65] hover:text-white" rel="noreferrer" >
        <div className='flex flex-row gap-2 items-center'>
          <span className='hidden sm:block'>View on GitHub</span>
          <img src={withBasePath('/github-64.png')} alt='View on GitHub' style={{ width: '32px', height: '32px' }} />
        </div>
      </a>
    </div>
  )
}
