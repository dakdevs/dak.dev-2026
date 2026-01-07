'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import Image from 'next/image'

import { TextScramble } from '~/components/motion-primitives/text-scramble'

const URL_PROTOCOL_REGEX = /^https?:\/\//
const URL_TRAILING_SLASH_REGEX = /\/$/

const LOGO_MAP: Record<string, string> = {
	'1Password': 'https://svgl.app/library/1password-dark.svg',
	'Apple Music': 'https://svgl.app/library/apple.svg',
	'Apple TV+': 'https://svgl.app/library/apple.svg',
	AWS: 'https://svgl.app/library/aws_dark.svg',
	ChatGPT: 'https://svgl.app/library/openai.svg',
	Claude: 'https://svgl.app/library/anthropic_black.svg',
	Cloudflare: 'https://svgl.app/library/cloudflare.svg',
	Cursor: 'https://svgl.app/library/cursor_dark.svg',
	Discord: 'https://svgl.app/library/discord.svg',
	'Drizzle ORM': 'https://svgl.app/library/drizzle-orm_dark.svg',
	Effect: 'https://svgl.app/library/effect_light.svg',
	GoLand: 'https://svgl.app/library/goland.svg',
	'Google AI': 'https://svgl.app/library/gemini.svg',
	'IntelliJ IDEA Ultimate': 'https://svgl.app/library/intellijidea.svg',
	Jotai: 'https://svgl.app/library/jotai.svg',
	Linear: 'https://svgl.app/library/linear.svg',
	MySQL: 'https://svgl.app/library/mysql-icon-dark.svg',
	'Next.js': 'https://svgl.app/library/nextjs_icon_dark.svg',
	Notion: 'https://svgl.app/library/notion.svg',
	OBS: 'https://svgl.app/library/obs.svg',
	'Oh My OpenCode': 'https://svgl.app/library/github_light.svg',
	OpenCode: 'https://svgl.app/library/github_light.svg',
	PlanetScale: 'https://svgl.app/library/planetscale.svg',
	Playwright: 'https://svgl.app/library/playwright.svg',
	PostgreSQL: 'https://svgl.app/library/postgresql.svg',
	Raycast: 'https://svgl.app/library/raycast.svg',
	React: 'https://svgl.app/library/react_dark.svg',
	RustRover: 'https://svgl.app/library/rustrover.svg',
	Slack: 'https://svgl.app/library/slack.svg',
	Spotify: 'https://svgl.app/library/spotify.svg',
	Suno: 'https://svgl.app/library/suno.svg',
	Tailscale: 'https://svgl.app/library/tailscale.svg',
	'Tailwind CSS': 'https://svgl.app/library/tailwindcss.svg',
	Tesla: 'https://svgl.app/library/tesla.svg',
	TypeScript: 'https://svgl.app/library/typescript.svg',
	Vercel: 'https://svgl.app/library/vercel.svg',
	Vite: 'https://svgl.app/library/vitejs.svg',
	Vitest: 'https://svgl.app/library/vitest.svg',
	WebStorm: 'https://svgl.app/library/webstorm.svg',
	X: 'https://svgl.app/library/x.svg',
	Zed: 'https://svgl.app/library/zed-logo_dark.svg',
	Zen: 'https://svgl.app/library/zen-browser.svg',
	Zod: 'https://svgl.app/library/zod.svg',
}

const CATEGORIES = [
	{
		name: 'IDEs',
		items: [
			{
				name: 'Zed',
				description: 'High-performance code editor',
				url: 'https://zed.dev',
			},
			{
				name: 'Cursor',
				description: 'AI-powered code editor built on VSCode',
				url: 'https://cursor.com',
			},
			{
				name: 'WebStorm',
				description: 'JavaScript and TypeScript IDE',
				url: 'https://jetbrains.com/webstorm',
			},
			{
				name: 'GoLand',
				description: 'Go IDE with smart coding assistance',
				url: 'https://jetbrains.com/go',
			},
			{
				name: 'RustRover',
				description: 'Rust IDE with deep code insight',
				url: 'https://jetbrains.com/rust',
			},
			{
				name: 'IntelliJ IDEA Ultimate',
				description: 'Full-stack Java and polyglot IDE',
				url: 'https://jetbrains.com/idea',
			},
		],
	},
	{
		name: 'AI Models',
		items: [
			{
				name: 'Claude',
				description: 'AI assistant by Anthropic',
				url: 'https://claude.ai',
			},
			{
				name: 'ChatGPT',
				description: 'AI assistant by OpenAI',
				url: 'https://chatgpt.com',
			},
			{
				name: 'Google AI',
				description: 'Gemini and AI tools',
				url: 'https://ai.google',
			},
			{
				name: 'Suno',
				description: 'AI music generation',
				url: 'https://suno.com',
			},
		],
	},
	{
		name: 'AI Tools',
		items: [
			{
				name: 'OpenCode',
				description: 'Terminal-based AI coding assistant',
				url: 'https://github.com/opencode-ai/opencode',
			},
			{
				name: 'Oh My OpenCode',
				description: 'Configuration framework for OpenCode',
				url: 'https://github.com/code-yeongyu/oh-my-opencode',
			},
		],
	},
	{
		name: 'Dev Tools',
		items: [
			{
				name: 'Ghostty',
				description: 'Fast, native terminal emulator',
				url: 'https://ghostty.org',
			},
			{
				name: 'OrbStack',
				description: 'Fast Docker and Linux on Mac',
				url: 'https://orbstack.dev',
			},
			{
				name: 'Conar',
				description: 'AI-powered Postgres database manager',
				url: 'https://conar.app',
			},
			{
				name: 'Yaak',
				description: 'Modern API client',
				url: 'https://yaak.app',
			},
			{
				name: 'Tailscale',
				description: 'Zero-config VPN',
				url: 'https://tailscale.com',
			},
		],
	},
	{
		name: 'Browsers',
		items: [
			{
				name: 'Dia',
				description: 'AI-native browser',
				url: 'https://dia.dev',
			},
			{
				name: 'Zen',
				description: 'Privacy-focused Firefox fork',
				url: 'https://zen-browser.app',
			},
			{
				name: 'Comet',
				description: 'Minimalist browser for Mac',
				url: 'https://usecomet.app',
			},
		],
	},
	{
		name: 'Tech Stack',
		items: [
			{
				name: 'React',
				description: 'UI library for building interfaces',
				url: 'https://react.dev',
			},
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
				name: 'AWS',
				description: 'Cloud computing platform',
				url: 'https://aws.amazon.com',
			},
			{
				name: 'PostgreSQL',
				description: 'Advanced open source database',
				url: 'https://postgresql.org',
			},
			{
				name: 'MySQL',
				description: 'Popular relational database',
				url: 'https://mysql.com',
			},
			{
				name: 'Zod',
				description: 'TypeScript-first schema validation',
				url: 'https://zod.dev',
			},
			{
				name: 'oRPC',
				description: 'End-to-end typesafe APIs',
				url: 'https://orpc.unnoq.com',
			},
			{
				name: 'Playwright',
				description: 'End-to-end testing framework',
				url: 'https://playwright.dev',
			},
			{
				name: 'Vitest',
				description: 'Fast unit testing framework',
				url: 'https://vitest.dev',
			},
			{
				name: 'Vite',
				description: 'Next-gen frontend build tool',
				url: 'https://vite.dev',
			},
			{
				name: 'Jotai',
				description: 'Primitive and flexible state for React',
				url: 'https://jotai.org',
			},
			{
				name: 'Workflow',
				description: 'Durable workflow engine',
				url: 'https://useworkflow.dev',
			},
			{
				name: 'AI SDK',
				description: 'Build AI-powered applications',
				url: 'https://ai-sdk.dev',
			},
		],
	},
	{
		name: 'Dev Libraries',
		items: [
			{
				name: '@t3-oss/env-core',
				description: 'Type-safe environment variables',
				url: 'https://env.t3.gg',
			},
			{
				name: 'Drizzle ORM',
				description: 'TypeScript ORM for SQL databases',
				url: 'https://orm.drizzle.team',
			},
			{
				name: 'Effect',
				description: 'TypeScript library for complex applications',
				url: 'https://effect.website',
			},
			{
				name: 'Better Auth',
				description: 'Authentication library for TypeScript',
				url: 'https://better-auth.com',
			},
			{
				name: 'Remeda',
				description: 'Functional utility library for TypeScript',
				url: 'https://remedajs.com',
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
			{
				name: 'Hey Email',
				description: 'Email that screens out the noise',
				url: 'https://hey.com',
			},
			{
				name: 'Screen Studio',
				description: 'Beautiful screen recordings for Mac',
				url: 'https://screen.studio',
			},
		],
	},
	{
		name: 'Tech Tools',
		items: [
			{
				name: 'DaisyDisk',
				description: 'Disk space analyzer for Mac',
				url: 'https://daisydiskapp.com',
			},
			{
				name: '1Password',
				description: 'Password manager',
				url: 'https://1password.com',
			},
		],
	},
	{
		name: 'Communications',
		items: [
			{
				name: 'Slack',
				description: 'Team messaging and collaboration',
				url: 'https://slack.com',
			},
			{
				name: 'Discord',
				description: 'Voice, video, and text chat',
				url: 'https://discord.com',
			},
		],
	},
	{
		name: 'Social Media',
		items: [
			{
				name: 'X',
				description: 'Real-time social network',
				url: 'https://x.com/dakdevs',
			},
		],
	},
	{
		name: 'Creator Tools',
		items: [
			{
				name: 'Hollyland',
				description: 'Wireless microphone systems',
				url: 'https://amzn.to/49NuHl9',
			},
			{
				name: 'Insta360 Link 2',
				description: 'AI-powered 4K webcam',
				url: 'https://amzn.to/4jumR4c',
			},
			{
				name: 'Elgato Stream Deck +',
				description: 'Studio controller with LCD keys and dials',
				url: 'https://amzn.to/4suFk4A',
			},
			{
				name: 'OBS',
				description: 'Open source streaming and recording',
				url: 'https://obsproject.com',
			},
		],
	},
	{
		name: 'Finance',
		items: [
			{
				name: 'Mercury',
				description: 'Banking for startups',
				url: 'https://mercury.com/share/dakdevs',
			},
			{
				name: 'Robinhood',
				description: 'Commission-free investing',
				url: 'https://robinhood.com',
			},
		],
	},
	{
		name: 'Entertainment',
		items: [
			{
				name: 'Apple TV+',
				description: 'Streaming service',
				url: 'https://apple.com/apple-tv-plus',
			},
			{
				name: 'Spotify',
				description: 'Music streaming service',
				url: 'https://spotify.com',
			},
			{
				name: 'Apple Music',
				description: 'Lossless audio streaming',
				url: 'https://apple.com/apple-music',
			},
			{
				name: 'Tidal',
				description: 'Hi-fi music streaming',
				url: 'https://tidal.com',
			},
		],
	},
	{
		name: 'Lifestyle',
		items: [
			{
				name: 'Eight Sleep',
				description: 'Smart mattress cover with temperature control',
				url: 'https://refer.eight.sl/dak74975',
			},
			{
				name: 'Tesla',
				description: 'Electric vehicles and energy',
				url: 'https://tesla.com',
			},
		],
	},
]

function fuzzyMatch(text: string, query: string): boolean {
	const lowerText = text.toLowerCase()
	const lowerQuery = query.toLowerCase()

	let queryIndex = 0
	for (
		let i = 0;
		i < lowerText.length && queryIndex < lowerQuery.length;
		i += 1
	) {
		if (lowerText[i] === lowerQuery[queryIndex]) {
			queryIndex += 1
		}
	}
	return queryIndex === lowerQuery.length
}

export function RecommendationsList() {
	const [search, setSearch] = useState('')
	const searchInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		searchInputRef.current?.focus()
	}, [])

	const filteredCategories = useMemo(() => {
		if (!search.trim()) {
			return CATEGORIES
		}

		return CATEGORIES.map((category) => ({
			...category,
			items: category.items.filter(
				(item) =>
					fuzzyMatch(item.name, search) || fuzzyMatch(item.description, search),
			),
		})).filter((category) => category.items.length > 0)
	}, [search])

	const totalItems = CATEGORIES.reduce(
		(acc, category) => acc + category.items.length,
		0,
	)

	return (
		<div className="mx-auto max-w-5xl">
			<div className="mb-16 grid grid-cols-2 gap-px bg-neutral-200 md:grid-cols-4">
				<div className="bg-white p-6">
					<div className="mb-2 font-mono text-neutral-400 text-xs tracking-widest">
						[TOTAL_ENTRIES]
					</div>
					<div className="font-black font-mono text-4xl text-neutral-950 md:text-5xl">
						{totalItems}
					</div>
				</div>
				<div className="bg-white p-6">
					<div className="mb-2 font-mono text-neutral-400 text-xs tracking-widest">
						[CATEGORIES]
					</div>
					<div className="font-black font-mono text-4xl text-neutral-950 md:text-5xl">
						{CATEGORIES.length}
					</div>
				</div>
				<div className="col-span-2 bg-white p-6">
					<div className="mb-2 font-mono text-neutral-400 text-xs tracking-widest">
						[SEARCH_QUERY]
					</div>
					<input
						className="w-full border-0 bg-transparent font-mono text-2xl text-neutral-950 placeholder:text-neutral-300 focus:outline-none md:text-3xl"
						onChange={(e) => setSearch(e.target.value)}
						placeholder="grep..."
						ref={searchInputRef}
						type="text"
						value={search}
					/>
				</div>
			</div>

			<div className="space-y-16">
				{filteredCategories.length === 0 ? (
					<p className="font-mono text-neutral-500">[NO_RESULTS_FOUND]</p>
				) : (
					filteredCategories.map((category, categoryIndex) => (
						<section key={category.name}>
							<div className="mb-8 flex items-center justify-between border-neutral-900 border-b pb-4">
								<h2 className="font-black font-mono text-neutral-950 text-xl uppercase tracking-tight">
									{category.name}
								</h2>
								<span className="font-mono text-neutral-400 text-sm">
									{(categoryIndex + 1).toString().padStart(2, '0')}/
									{CATEGORIES.length.toString().padStart(2, '0')}
								</span>
							</div>
							<div className="grid gap-px bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
								{category.items.map((item) => {
									const logoUrl = LOGO_MAP[item.name]
									return (
										<a
											className="relative flex flex-col justify-between overflow-hidden bg-white p-6 transition-colors duration-200 hover:bg-neutral-50"
											href={item.url}
											key={item.name}
											rel="noopener noreferrer"
											target="_blank"
										>
											{logoUrl !== undefined && (
												<Image
													alt=""
													aria-hidden="true"
													className="pointer-events-none absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-[0.08] grayscale"
													height={96}
													src={logoUrl}
													unoptimized
													width={96}
												/>
											)}
											<div className="relative z-10">
												<TextScramble
													as="h3"
													className="font-bold font-mono text-lg text-neutral-900 uppercase tracking-tight"
													duration={0.6}
													speed={0.03}
												>
													{item.name}
												</TextScramble>
												<p className="mt-2 font-mono text-neutral-600 text-sm">
													{item.description}
												</p>
											</div>
											<div className="relative z-10 mt-4 font-mono text-neutral-400 text-xs underline">
												{item.url
													.replace(URL_PROTOCOL_REGEX, '')
													.replace(URL_TRAILING_SLASH_REGEX, '')}
											</div>
										</a>
									)
								})}
							</div>
						</section>
					))
				)}
			</div>
		</div>
	)
}
