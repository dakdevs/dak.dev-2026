import type { Metadata } from 'next'

import { ScrollTimeline } from '~/components/scroll-timeline'

import { CareerHero } from './hero'

export const metadata: Metadata = {
	title: 'Career | Dak Washbrook',
	description: 'A timeline of my professional journey in software engineering.',
}

export default function CareerPage() {
	return (
		<main className="flex-1 px-6 pb-24">
			<CareerHero />
			<ScrollTimeline />
		</main>
	)
}
