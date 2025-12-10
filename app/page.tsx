import { LandingPage } from '@/simulator/landingPage/LandingPage'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://evfootprint.org'

const title = 'EV Footprint - Footprint simulator for electric vehicles'
const description = 'Simulate the true impact on climate and CO2 emissions of choosing an electric car rather than a traditional gasoline car.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: 'EV Footprint',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function Home() {
  return <LandingPage />
}
