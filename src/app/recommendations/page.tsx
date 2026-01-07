import type { Metadata } from 'next'

import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Recommendations',
	description: 'Technology and products I recommend',
}

const CATEGORIES = [
	{
		name: 'Development Tools',
		items: [
			{
				name: 'Cursor',
				description: 'AI-powered code editor built on VSCode',
				url: 'https://cursor.com',
			},
			{
				name: 'Warp',
				description: 'Modern terminal with AI assistance',
				url: 'https://warp.dev',
			},
			{
				name: 'Arc',
				description: 'Browser built for power users',
				url: 'https://arc.net',
			},
		],
	},
	{
		name: 'Tech Stack',
		items: [
			{
				name: 'Next.js',
				description: 'React framework for production',
				url: 'https://nextjs.org',
			},
			{
				name: 'TypeScript',
				description: 'JavaScript with types',
				url: 'https://typescriptlang.org',
			},
			{
				name: 'Tailwind CSS',
				description: 'Utility-first CSS framework',
				url: 'https://tailwindcss.com',
			},
			{
				name: 'tRPC',
				description: 'End-to-end typesafe APIs',
				url: 'https://trpc.io',
			},
			{
				name: 'Drizzle ORM',
				description: 'TypeScript ORM for SQL databases',
				url: 'https://orm.drizzle.team',
			},
		],
	},
	{
		name: 'Infrastructure',
		items: [
			{
				name: 'Vercel',
				description: 'Deploy and scale web apps',
				url: 'https://vercel.com',
			},
			{
				name: 'Cloudflare',
				description: 'CDN, DNS, and edge computing',
				url: 'https://cloudflare.com',
			},
			{
				name: 'PlanetScale',
				description: 'Serverless MySQL platform',
				url: 'https://planetscale.com',
			},
		],
	},
	{
		name: 'Productivity',
		items: [
			{
				name: 'Raycast',
				description: 'Launcher and productivity tool for Mac',
				url: 'https://raycast.com',
			},
			{
				name: 'Linear',
				description: 'Issue tracking built for speed',
				url: 'https://linear.app',
			},
			{
				name: 'Notion',
				description: 'All-in-one workspace',
				url: 'https://notion.so',
			},
		],
	},
]

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
				<p className="mb-12 text-neutral-600">
					Technology and products I use and recommend.
				</p>

				<div className="space-y-12">
					{CATEGORIES.map((category) => (
						<section key={category.name}>
							<h2 className="mb-6 font-bold font-mono text-neutral-400 text-sm uppercase tracking-wider">
								{category.name}
							</h2>
							<div className="grid gap-4 sm:grid-cols-2">
								{category.items.map((item) => (
									<a
										className="group rounded-lg border border-neutral-200 p-4 transition-all hover:border-neutral-300 hover:bg-neutral-50"
										href={item.url}
										key={item.name}
										rel="noopener noreferrer"
										target="_blank"
									>
										<h3 className="font-bold font-mono text-neutral-900 group-hover:text-neutral-700">
											{item.name}
										</h3>
										<p className="mt-1 text-neutral-500 text-sm">
											{item.description}
										</p>
									</a>
								))}
							</div>
						</section>
					))}
				</div>
			</main>
		</div>
	)
}
