import Image from 'next/image'
import Link from 'next/link'

import { ScrollTimeline } from '~/components/scroll-timeline'

export const metadata = {
	title: 'Career | Dak Washbrook',
	description: 'A timeline of my professional journey in software engineering.',
}

export default function CareerPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="flex items-center justify-between p-6">
				<Link href="/">
					<Image
						alt="dak.dev"
						height={32}
						priority
						src="/dak-logo.svg"
						width={80}
					/>
				</Link>
				<nav className="flex gap-6">
					<Link
						className="font-mono text-neutral-500 text-sm transition-colors hover:text-neutral-900"
						href="/recommendations"
					>
						Recommendations
					</Link>
					<Link
						className="font-medium font-mono text-neutral-900 text-sm"
						href="/career"
					>
						Career
					</Link>
				</nav>
			</header>

			<main className="flex-1 px-6 pb-24">
				<section className="mx-auto mb-16 max-w-3xl pt-12 md:mb-24 md:pt-24">
					<h1 className="mb-6 font-bold font-mono text-4xl tracking-tight">
						Professional Timeline
					</h1>
					<p className="max-w-2xl font-mono text-lg text-neutral-600 leading-relaxed">
						Over the last 15 years, I've gone from building inventory systems in
						Visual Basic as a kid to architecting scalable cloud platforms for
						millions of users.
					</p>
					<p className="mt-4 max-w-2xl font-mono text-neutral-500">
						This is a living history of the code I've shipped, the teams I've
						led, and the problems I've solved.
					</p>
				</section>

				<ScrollTimeline />
			</main>
		</div>
	)
}
