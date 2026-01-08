import type { Metadata } from 'next'

import { RecommendationsList } from '~/components/recommendations-list'

import { RecommendationsHero } from './hero'

export const metadata: Metadata = {
	title: 'Recommendations',
	description: 'Technology and products I recommend',
}

export default function RecommendationsPage() {
	return (
		<main className="flex-1 px-6 pb-24">
			<RecommendationsHero />
			<RecommendationsList />
		</main>
	)
}
