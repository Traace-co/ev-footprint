import { Metadata } from 'next'
import { About } from '@/about/About'

export const metadata: Metadata = {
  title: 'About - Footprint simulator for electric vehicles',
  description: 'Learn about the EV Footprint simulator, its purpose, and the team behind it.',
}

export default function AboutPage() {
  return <About />
}
