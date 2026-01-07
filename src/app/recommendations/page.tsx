import type { Metadata } from 'next'

import Image from 'next/image'
import Link from 'next/link'

import { RecommendationsList } from '~/components/recommendations-list'

export const metadata: Metadata = {
	title: 'Recommendations',
	description: 'Technology and products I recommend',
}

export default function RecommendationsPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="flex justify-center p-6">
				<Link href="/">
					<Image
						alt="dak.dev"
						height={32}
						priority
						src="/dak-logo.svg"
						width={80}
					/>
				</Link>
			</header>

			<main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-12 pb-24">
				<h1 className="mb-4 font-bold font-mono text-2xl tracking-tight">
					Recommendations
				</h1>
				<p className="mb-8 text-neutral-600">
					Technology and products I use and recommend.
				</p>

				<RecommendationsList />
			</main>
		</div>
	)
}
