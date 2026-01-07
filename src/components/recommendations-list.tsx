'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import Image from 'next/image'

import { TextScramble } from '~/components/motion-primitives/text-scramble'
import { ScreenshotTooltip } from '~/components/screenshot-tooltip'
import { SCREENSHOT_MAP } from '~/data/screenshot-manifest'

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
	Convex: 'https://svgl.app/library/convex_dark.svg',
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

type RecommendationItem = {
	name: string
	description: string
	url: string
	current?: boolean
}

type Category = {
	name: string
	items: RecommendationItem[]
}

const CATEGORIES: Category[] = [
	{
		name: 'IDEs',
		items: [
			{
				name: 'Zed',
				description: 'High-performance code editor',
				url: 'https://zed.dev',
				current: true,
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
				current: true,
			},
			{
				name: 'ChatGPT',
				description: 'AI assistant by OpenAI',
				url: 'https://chatgpt.com',
				current: true,
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
				current: true,
			},
		],
	},
	{
		name: 'AI Tools',
		items: [
			{
				name: 'OpenCode',
				description: 'Terminal-based AI coding assistant',
				url: 'https://opencode.ai',
				current: true,
			},
			{
				name: 'Oh My OpenCode',
				description: 'Configuration framework for OpenCode',
				url: 'https://github.com/code-yeongyu/oh-my-opencode',
				current: true,
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
				current: true,
			},
			{
				name: 'OrbStack',
				description: 'Fast Docker and Linux on Mac',
				url: 'https://orbstack.dev',
				current: true,
			},
			{
				name: 'Conar',
				description: 'AI-powered Postgres database manager',
				url: 'https://conar.app',
				current: true,
			},
			{
				name: 'Yaak',
				description: 'Modern API client',
				url: 'https://yaak.app',
				current: true,
			},
			{
				name: 'Tailscale',
				description: 'Zero-config VPN',
				url: 'https://tailscale.com',
				current: true,
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
				current: true,
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
				current: true,
			},
			{
				name: 'Next.js',
				description: 'React framework for production',
				url: 'https://nextjs.org',
				current: true,
			},
			{
				name: 'TypeScript',
				description: 'JavaScript with types',
				url: 'https://typescriptlang.org',
				current: true,
			},
			{
				name: 'Tailwind CSS',
				description: 'Utility-first CSS framework',
				url: 'https://tailwindcss.com',
				current: true,
			},
			{
				name: 'AWS',
				description: 'Cloud computing platform',
				url: 'https://aws.amazon.com',
				current: true,
			},
			{
				name: 'PostgreSQL',
				description: 'Advanced open source database',
				url: 'https://postgresql.org',
				current: true,
			},
			{
				name: 'MySQL',
				description: 'Popular relational database',
				url: 'https://mysql.com',
				current: true,
			},
			{
				name: 'Zod',
				description: 'TypeScript-first schema validation',
				url: 'https://zod.dev',
				current: true,
			},
			{
				name: 'oRPC',
				description: 'End-to-end typesafe APIs',
				url: 'https://orpc.unnoq.com',
				current: true,
			},
			{
				name: 'Playwright',
				description: 'End-to-end testing framework',
				url: 'https://playwright.dev',
				current: true,
			},
			{
				name: 'Vitest',
				description: 'Fast unit testing framework',
				url: 'https://vitest.dev',
				current: true,
			},
			{
				name: 'Vite',
				description: 'Next-gen frontend build tool',
				url: 'https://vite.dev',
				current: true,
			},
			{
				name: 'Jotai',
				description: 'Primitive and flexible state for React',
				url: 'https://jotai.org',
				current: true,
			},
			{
				name: 'Workflow',
				description: 'Durable workflow engine',
				url: 'https://useworkflow.dev',
				current: true,
			},
			{
				name: 'AI SDK',
				description: 'Build AI-powered applications',
				url: 'https://ai-sdk.dev',
				current: true,
			},
			{
				name: 'TanStack',
				description: 'High-quality open-source libraries for web dev',
				url: 'https://tanstack.com',
				current: true,
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
				current: true,
			},
			{
				name: 'Robinhood',
				description: 'Commission-free investing',
				url: 'https://robinhood.com',
				current: true,
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
				current: true,
			},
			{
				name: 'Drizzle ORM',
				description: 'TypeScript ORM for SQL databases',
				url: 'https://orm.drizzle.team',
				current: true,
			},
			{
				name: 'Effect',
				description: 'TypeScript library for complex applications',
				url: 'https://effect.website',
				current: true,
			},
			{
				name: 'Better Auth',
				description: 'Authentication library for TypeScript',
				url: 'https://better-auth.com',
				current: true,
			},
			{
				name: 'Remeda',
				description: 'Functional utility library for TypeScript',
				url: 'https://remedajs.com',
				current: true,
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
				current: true,
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
				current: true,
			},
			{
				name: 'Convex',
				description: 'Reactive backend platform',
				url: 'https://convex.dev/referral/DAKWAS5392',
				current: true,
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
				current: true,
			},
			{
				name: 'Linear',
				description: 'Issue tracking built for speed',
				url: 'https://linear.app',
				current: true,
			},
			{
				name: 'Notion',
				description: 'All-in-one workspace',
				url: 'https://notion.so',
				current: true,
			},
			{
				name: 'Hey Email',
				description: 'Email that screens out the noise',
				url: 'https://hey.com',
				current: true,
			},
			{
				name: 'Screen Studio',
				description: 'Beautiful screen recordings for Mac',
				url: 'https://screen.studio',
				current: true,
			},
			{
				name: 'DaisyDisk',
				description: 'Disk space analyzer for Mac',
				url: 'https://daisydiskapp.com',
				current: true,
			},
			{
				name: '1Password',
				description: 'Password manager',
				url: 'https://1password.com',
				current: true,
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
				current: true,
			},
			{
				name: 'Discord',
				description: 'Voice, video, and text chat',
				url: 'https://discord.com',
				current: true,
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
				current: true,
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
				current: true,
			},
			{
				name: 'Insta360 Link 2',
				description: 'AI-powered 4K webcam',
				url: 'https://amzn.to/4jumR4c',
				current: true,
			},
			{
				name: 'Elgato Stream Deck +',
				description: 'Studio controller with LCD keys and dials',
				url: 'https://amzn.to/4suFk4A',
				current: true,
			},
			{
				name: 'OBS',
				description: 'Open source streaming and recording',
				url: 'https://obsproject.com',
				current: true,
			},
		],
	},
	{
		name: 'Entertainment',
		items: [
			{
				name: 'Spotify',
				description: 'Music streaming service',
				url: 'https://spotify.com',
				current: true,
			},
			{
				name: 'Apple TV+',
				description: 'Streaming service',
				url: 'https://apple.com/apple-tv-plus',
				current: true,
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
		name: 'What to Watch',
		items: [
			{
				name: 'TBPN',
				description: 'Tech news and product reviews',
				url: 'https://www.youtube.com/@TBPNLive',
				current: true,
			},
			{
				name: 'The Standup',
				description: 'Daily tech and startup podcast',
				url: 'https://open.spotify.com/show/01A062kejnXFkJE01bjN5J',
				current: true,
			},
			{
				name: 'Lex Fridman Podcast',
				description: 'Conversations about science, tech, and philosophy',
				url: 'https://open.spotify.com/show/2MAi0BvDc6GTFvKFPXnkCL',
				current: true,
			},
			{
				name: 'The Diary Of A CEO',
				description: 'Steven Bartlett interviews world-class minds',
				url: 'https://open.spotify.com/show/7iQXmUT7XGuZSzAMjoNWlX',
				current: true,
			},
			{
				name: 'Acquired',
				description: 'Playbooks that built the greatest companies',
				url: 'https://open.spotify.com/show/7Fj0XEuUQLUqoMZQdsLXqp',
				current: true,
			},
			{
				name: 'Soft Skills Engineering',
				description: 'Advice for devs on non-technical stuff',
				url: 'https://open.spotify.com/show/59I1XnvAB9fQzSj9SIKCoI',
				current: true,
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
				current: true,
			},
			{
				name: 'Tesla',
				description: 'Electric vehicles and energy',
				url: 'https://tesla.com',
				current: true,
			},
		],
	},
	{
		name: 'On My Desk',
		items: [
			{
				name: 'Dell UltraSharp U2725QE',
				description: '27" 4K IPS monitor with USB-C hub',
				url: 'https://amzn.to/4qIlLnM',
				current: true,
			},
			{
				name: 'KEF LSX II LT',
				description: 'Wireless HiFi speakers',
				url: 'https://amzn.to/4pwT1NM',
				current: true,
			},
			{
				name: 'Razer DeathAdder V2 X HyperSpeed',
				description: 'Wireless ergonomic gaming mouse',
				url: 'https://amzn.to/4smm1KK',
				current: true,
			},
			{
				name: 'Apple Magic Keyboard',
				description: 'Touch ID and numeric keypad',
				url: 'https://amzn.to/4qCzFaY',
				current: true,
			},
			{
				name: 'Corsair TBT200',
				description: 'Thunderbolt 4 dock with 96W power delivery',
				url: 'https://amzn.to/49cL6As',
				current: true,
			},
			{
				name: 'Apple HomePod mini',
				description: 'Compact smart speaker with Siri',
				url: 'https://amzn.to/49t8E2S',
				current: true,
			},
			{
				name: 'Google Nest Hub',
				description: '7-inch smart display',
				url: 'https://amzn.to/4b7FPvt',
				current: true,
			},
			{
				name: 'Nothing Headphone (1)',
				description: 'KEF-tuned wireless ANC headphones',
				url: 'https://amzn.to/4jvFLHJ',
				current: true,
			},
			{
				name: 'Nothing Ear (3)',
				description: 'Wireless earbuds with 45dB hybrid ANC',
				url: 'https://amzn.to/4pvk3VR',
				current: true,
			},
			{
				name: 'Soundcore AeroClip',
				description: 'Open-ear clip-on earbuds',
				url: 'https://amzn.to/3Z1pOjb',
				current: true,
			},
			{
				name: 'Logitech MX Master 4',
				description: 'Ergonomic wireless mouse with haptic feedback',
				url: 'https://amzn.to/4q9J0Hk',
				current: true,
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
	const [showCurrentOnly, setShowCurrentOnly] = useState(false)
	const [hoveredUrl, setHoveredUrl] = useState<string | null>(null)
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
	const searchInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		searchInputRef.current?.focus()
	}, [])

	const filteredCategories = useMemo(() => {
		let categories = CATEGORIES

		if (showCurrentOnly) {
			categories = categories
				.map((category) => ({
					...category,
					items: category.items.filter((item) => item.current),
				}))
				.filter((category) => category.items.length > 0)
		}

		if (!search.trim()) {
			return categories
		}

		return categories
			.map((category) => ({
				...category,
				items: category.items.filter(
					(item) =>
						fuzzyMatch(item.name, search) ||
						fuzzyMatch(item.description, search),
				),
			}))
			.filter((category) => category.items.length > 0)
	}, [search, showCurrentOnly])

	const totalItems = CATEGORIES.reduce(
		(acc, category) => acc + category.items.length,
		0,
	)

	const currentItems = CATEGORIES.reduce(
		(acc, category) =>
			acc + category.items.filter((item) => item.current).length,
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
						[ACTIVE]
					</div>
					<div className="font-black font-mono text-4xl text-neutral-950 md:text-5xl">
						{currentItems}
					</div>
				</div>
				<div className="col-span-2 bg-white p-6 md:col-span-1">
					<div className="mb-2 font-mono text-neutral-400 text-xs tracking-widest">
						[FILTER]
					</div>
					<div className="flex items-center gap-2 font-mono text-lg">
						<button
							className={`transition-colors ${
								showCurrentOnly
									? 'text-neutral-400 hover:text-neutral-600'
									: 'font-bold text-neutral-950'
							}`}
							onClick={() => setShowCurrentOnly(false)}
							type="button"
						>
							[ALL]
						</button>
						<span className="text-neutral-300">/</span>
						<button
							className={`transition-colors ${
								showCurrentOnly
									? 'font-bold text-neutral-950'
									: 'text-neutral-400 hover:text-neutral-600'
							}`}
							onClick={() => setShowCurrentOnly(true)}
							type="button"
						>
							[ACTIVE]
						</button>
					</div>
				</div>
				<div className="col-span-2 bg-white p-6 md:col-span-1">
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

			<nav className="mb-16 border-neutral-200 border-b pb-8">
				<div className="mb-4 font-mono text-neutral-400 text-xs tracking-widest">
					[JUMP_TO]
				</div>
				<div className="flex flex-wrap gap-2">
					{CATEGORIES.map((category) => (
						<a
							className="font-mono text-neutral-600 text-sm underline transition-colors hover:text-neutral-950"
							href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
							key={category.name}
						>
							{category.name}
						</a>
					))}
				</div>
			</nav>

			<div className="space-y-16">
				{filteredCategories.length === 0 ? (
					<p className="font-mono text-neutral-500">[NO_RESULTS_FOUND]</p>
				) : (
					filteredCategories.map((category, categoryIndex) => (
						<section
							id={category.name.toLowerCase().replace(/\s+/g, '-')}
							key={category.name}
						>
							<div className="mb-8 flex items-center justify-between border-neutral-900 border-b pb-4">
								<h2 className="font-black font-mono text-neutral-950 text-xl uppercase tracking-tight">
									{category.name}
								</h2>
								<span className="font-mono text-neutral-400 text-sm">
									{(categoryIndex + 1).toString().padStart(2, '0')}/
									{filteredCategories.length.toString().padStart(2, '0')}
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
											onMouseEnter={() => setHoveredUrl(item.url)}
											onMouseLeave={() => setHoveredUrl(null)}
											onMouseMove={(e) =>
												setMousePos({ x: e.clientX, y: e.clientY })
											}
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
												<div className="flex items-start justify-between gap-2">
													<TextScramble
														as="h3"
														className="flex-1 font-bold font-mono text-lg text-neutral-900 uppercase tracking-tight"
														duration={0.6}
														speed={0.03}
													>
														{item.name}
													</TextScramble>
													{item.current === true ? (
														<span className="flex shrink-0 items-center gap-1.5 font-mono text-neutral-400 text-xs">
															[ACTIVE]
															<span className="relative flex h-2 w-2">
																<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
																<span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
															</span>
														</span>
													) : (
														<span className="flex shrink-0 items-center gap-1.5 font-mono text-neutral-400 text-xs">
															[INACTIVE]
															<span className="h-2 w-2 rounded-full bg-neutral-300" />
														</span>
													)}
												</div>
												<p className="mt-2 font-mono text-neutral-600 text-sm">
													{item.description}
												</p>
											</div>
											<div className="relative z-10 mt-4 truncate font-mono text-neutral-400 text-xs underline">
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
			{hoveredUrl !== null && (
				<ScreenshotTooltip
					position={mousePos}
					src={SCREENSHOT_MAP[hoveredUrl]}
				/>
			)}
		</div>
	)
}
