import { Metadata } from 'next'
import { Methodology } from '@/methodology/Methodology'

export const metadata: Metadata = {
  title: 'Methodology - Footprint simulator for electric vehicles',
  description: 'Understand the methodology and research behind the EV Footprint simulator.',
}

export default function MethodologyPage() {
  return <Methodology />
}
