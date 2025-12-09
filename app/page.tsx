import { LandingPage } from '@/simulator/landingPage/LandingPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EV Footprint - Footprint simulator for electric vehicles',
  description: 'Simulate the true impact on climate and CO2 emissions of choosing an electric car rather than a traditional gasoline car.',
}

export default function Home() {
  return <LandingPage />
}
