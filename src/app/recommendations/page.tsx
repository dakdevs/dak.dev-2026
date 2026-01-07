import type { Metadata } from 'next'

import { RecommendationsList } from '~/components/recommendations-list'

export const metadata: Metadata = {
	title: 'Recommendations',
	description: 'Technology and products I recommend',
}

export default function RecommendationsPage() {
	return (
		<main className="flex-1 px-6 pb-24">
			<section className="mx-auto mb-24 max-w-5xl pt-24 md:pt-32">
				<div className="border-neutral-900 border-b pb-8">
					<h1 className="font-black font-mono text-6xl text-neutral-950 uppercase tracking-tighter md:text-9xl">
						Rec_Index
					</h1>
					<div className="mt-4 flex flex-col justify-between gap-4 font-mono text-sm md:flex-row md:items-end">
						<p className="max-w-xl text-neutral-600 leading-relaxed">
							[QUERY_INIT]: A curated registry of tools, libraries, and
							products. Battle-tested in production environments and daily
							workflows.
						</p>
						<div className="text-right">
							<div className="font-bold text-neutral-950">dak.dev</div>
							<div className="text-neutral-400">CATALOG v1.0</div>
						</div>
					</div>
				</div>
			</section>

			<RecommendationsList />
		</main>
	)
}
