'use client'

import { useRef, useState } from 'react'

import { motion, useInView } from 'motion/react'

import { CliTypewriter } from '~/components/cli-typewriter'
import { TextShimmer } from '~/components/motion-primitives/text-shimmer'
import { cn } from '~/utils/cn'

const URL_PROTOCOL_REGEX = /^https?:\/\//
const URL_TRAILING_SLASH_REGEX = /\/$/

const TYPE_COLORS = {
	job: 'bg-blue-950 text-blue-100 border-blue-900',
	project: 'bg-neutral-900 text-neutral-100 border-neutral-800',
	startup: 'bg-violet-950 text-violet-100 border-violet-900',
	gaming: 'bg-emerald-950 text-emerald-100 border-emerald-900',
	education: 'bg-amber-950 text-amber-100 border-amber-900',
	talk: 'bg-rose-950 text-rose-100 border-rose-900',
	award: 'bg-yellow-950 text-yellow-100 border-yellow-900',
	community: 'bg-cyan-950 text-cyan-100 border-cyan-900',
} as const

const YEAR_COLORS = {
	job: 'text-blue-800',
	project: 'text-neutral-800',
	startup: 'text-violet-800',
	gaming: 'text-emerald-800',
	education: 'text-amber-800',
	talk: 'text-rose-800',
	award: 'text-yellow-800',
	community: 'text-cyan-800',
} as const

const MILESTONES = [
	{
		year: '1997',
		title: 'Pantry Inventory System',
		company: 'Home Project',
		type: 'project' as const,
		description:
			'Built a pantry inventory system at 6 years old using Visual Basic and Microsoft Access Database.',
		command: 'run inventory.exe',
		technologies: ['Visual Basic', 'Microsoft Access'],
	},
	{
		year: '2001',
		title: 'K.I.D.S.S.',
		company: 'Kids In Disguise Super Spies',
		type: 'project' as const,
		description:
			'Built my first website at 10 years old using Microsoft FrontPage. Had HTACCESS login, members-only area, and forms for submitting spy reports. Inspired by Spy Kids.',
		command: 'frontpage index.htm',
		technologies: ['Microsoft FrontPage', 'HTML', 'HTACCESS'],
	},
	{
		year: '2008',
		title: 'School Newspaper Website',
		company: 'El Camino Real High School',
		type: 'project' as const,
		url: 'https://www.ecrchs.net/',
		description: 'Created the high school newspaper website.',
		command: 'wp theme activate newspaper',
		technologies: ['WordPress', 'HTML', 'CSS'],
	},
	{
		year: '2008',
		title: 'EC Eye Website',
		company: 'El Camino Real High School',
		type: 'project' as const,
		url: 'https://www.ecrchs.net/',
		description:
			"Built the website for EC Eye, the school's weekly news broadcast that I helped produce.",
		command: 'wp theme activate eceye',
		technologies: ['WordPress', 'HTML', 'CSS'],
	},
	{
		year: '2009',
		title: 'Graduated',
		company: 'El Camino Real High School',
		type: 'education' as const,
		url: 'https://www.ecrchs.net/',
		description: 'Finished high school. Ready to build.',
		command: 'exit 0',
		technologies: [],
	},
	{
		year: '2010',
		title: 'Lead Full-Stack Developer',
		company: 'Dellamoda.com',
		type: 'job' as const,
		description:
			'Hired as helping hand at Italian leather goods ecommerce store. Redesigned production website, driving record traffic. Built internal tooling. Created Laravel app to circumvent X-Cart via MySQL for automations. Shipped new streamlined returns system.',
		command: 'php artisan serve',
		technologies: [
			'Retail Pro',
			'PHP',
			'X-Cart',
			'Laravel',
			'HTML',
			'CSS',
			'JS/jQuery',
		],
	},
	{
		year: '2012',
		title: 'PvP All Day',
		company: 'Aion Online Community',
		type: 'gaming' as const,
		description:
			'Built a video showcase site to curate Aion PvP content. Started with WordPress, rewrote in raw PHP in 2014. Added Twitch integration for streamers. 30k monthly active users.',
		command: 'php -S localhost:8000',
		technologies: ['WordPress', 'PHP', 'MySQL', 'Twitch API'],
	},
	{
		year: '2016',
		title: 'Senior Software Engineer',
		company: 'NCSoft',
		type: 'job' as const,
		url: 'https://nc.com',
		description:
			'Only backend dev on a team of 5, supporting AAA game launches for 100k+ monthly active users. Rebuilt core platform from PHP to Node.js/TypeScript, increasing contributor capacity 500%. Introduced GraphQL boosting performance 500%. Built CI/CD pipelines in Groovy, Node.js Platform SDK, and migrated services to Kubernetes. Relaunched game forums on Invision Power Board with platform integration.',
		command: 'kubectl apply -f production.yaml',
		technologies: [
			'Node.js',
			'TypeScript',
			'PHP',
			'GraphQL',
			'Kubernetes',
			'AWS',
			'MongoDB',
			'MSSQL',
			'Groovy',
			'React',
		],
	},
	{
		year: '2019',
		title: 'Senior Software Engineer (Lead)',
		company: 'Weedmaps',
		type: 'job' as const,
		url: 'https://weedmaps.com',
		description:
			'Scaled features to 500k+ businesses and 16M users. Led 8-12 engineer teams. Cut release cadence from months to weekly. Reduced CI build times from 40 min to 5 min with GitHub Actions. Built ML training UI increasing throughput 60%. Migrated platforms from AWS ECS and Rancher to Kubernetes. Optimized DataDog observability costs.',
		command: 'kubectl rollout status deployment/weedmaps',
		technologies: [
			'React',
			'Next.js',
			'TypeScript',
			'Node.js',
			'Golang',
			'Ruby on Rails',
			'Elixir/Phoenix',
			'Kubernetes',
			'AWS',
			'Docker',
			'GitHub Actions',
			'GraphQL',
			'PostgreSQL',
			'MongoDB',
		],
	},
	{
		year: '2019',
		title: 'Creator',
		company: 'Zephyr',
		type: 'gaming' as const,
		ongoing: true,
		description:
			'Built a scheduling platform and player toolset for Aion Online. Full-stack solution scaled to 26k MAU at peak.',
		command: 'bun run build',
		technologies: [
			'Next.js',
			'TypeScript',
			'tRPC',
			'MySQL',
			'Mantine UI',
			'Payload CMS',
			'Vercel',
		],
	},
	{
		year: '2019',
		title: 'Co-Owner',
		company: 'The Web Team',
		type: 'startup' as const,
		ongoing: true,
		description:
			'Consulting firm helping small to medium sized businesses scale their operations with technology and AI. Delivering custom software solutions, automation, and digital transformation strategies.',
		command: 'twt --consult',
		technologies: [
			'Next.js',
			'TypeScript',
			'React',
			'Node.js',
			'PostgreSQL',
			'OpenAI',
			'AWS',
			'Vercel',
		],
	},
	{
		year: '2022',
		title: 'Co-Founder & Founding Engineer',
		company: 'Trestle',
		type: 'startup' as const,
		url: 'https://gotrestle.com',
		description:
			'Architected Next.js/TypeScript foundation supporting $2.1M pre-seed round. Built construction tech platform centralizing project management, growing users from 230 to 2,300 in under a year. Created concurrent vector embedding operations for public records similarity analysis. Led team of 3 engineers.',
		command: 'bun run inngest:dev',
		technologies: [
			'Next.js',
			'TypeScript',
			'tRPC',
			'Radix UI',
			'Tailwind CSS',
			'Prisma',
			'MongoDB',
			'MySQL',
			'OpenAI',
			'Inngest',
			'AWS',
			'Vercel',
			'Bun',
		],
	},
	{
		year: '2022',
		title:
			'Talk: "CS Master\'s vs Self-Taught: What actually matters in the real world?"',
		company: 'Moorpark College',
		type: 'talk' as const,
		description: 'Joint presentation on career paths in software engineering.',
		collaborator: {
			name: 'Steven Alexander Littaua',
			url: 'https://www.linkedin.com/in/littaua/',
		},
		subtle: true,
		command: '',
		technologies: [],
	},
	{
		year: '2023',
		title: 'Lead Developer',
		company: 'MyAion.xyz',
		type: 'gaming' as const,
		url: 'https://myaion.xyz',
		ongoing: true,
		description:
			'Rewrote legacy C# web app in Next.js/TypeScript serving 12k+ MAU. Implemented caching boosting performance 10x while cutting database load 20x. Led small dev team maintaining high code quality and fast feature delivery.',
		command: 'bun run deploy',
		technologies: [
			'Next.js',
			'TypeScript',
			'tRPC',
			'MySQL',
			'Mantine UI',
			'Vercel',
		],
	},
	{
		year: '2023',
		title: 'Talk: "Observability in Production-grade Environments"',
		company: 'Fullerton College',
		type: 'talk' as const,
		description:
			'Guest lecture on monitoring, logging, and observability practices.',
		subtle: true,
		command: '',
		technologies: [],
	},
	{
		year: '2023',
		title: 'Talk: "Mastering Understanding in a High-Speed Industry"',
		company: 'Fullerton College',
		type: 'talk' as const,
		description:
			'Guest lecture on continuous learning and staying current in tech.',
		subtle: true,
		command: '',
		technologies: [],
	},
	{
		year: '2024',
		title: 'Co-Founder & CTO',
		company: 'Dunbar',
		type: 'startup' as const,
		description:
			'Built Next.js/TypeScript full-stack with tRPC under domain-driven design. Architected async workflows on BullMQ and Trigger.dev. Built Tauri/Rust desktop app for automated browsing and scraping. Created AI ingestion pipelines with Claude, OpenAI, and Gemini for 150+ self-serve users. Secured angel funding.',
		command: 'bun run trigger:dev',
		technologies: [
			'Next.js',
			'TypeScript',
			'tRPC',
			'Radix UI',
			'Tailwind CSS',
			'Rust',
			'Tauri',
			'BullMQ',
			'Trigger.dev',
			'PostgreSQL',
			'OpenAI',
			'Anthropic',
			'Gemini',
			'AWS',
			'Vercel',
		],
	},
	{
		year: '2024',
		title: 'Director of Technology',
		company: 'tech night!',
		type: 'community' as const,
		url: 'https://technight.events',
		ongoing: true,
		description:
			'Built technight.events with professional networking link page features. Mentored dozens of aspiring engineers in project execution and career planning. Coordinated meetups, hackathons, and conferences. Produced and edited 30+ hours of video.',
		command: 'bun run dev',
		technologies: [
			'Next.js',
			'TypeScript',
			'oRPC',
			'PostgreSQL',
			'Tailwind CSS',
			'Vercel',
		],
	},
	{
		year: '2024',
		title: 'Next.js Conference 2024 Community Challenge Winner',
		company: 'Vercel',
		type: 'award' as const,
		url: 'https://nextjs.org/conf',
		description: 'Won the community challenge at Next.js Conf 2024.',
		subtle: true,
		command: '',
		technologies: [],
	},
	{
		year: '2025',
		title: 'Software Engineer (Contract)',
		company: 'Zero Email',
		type: 'job' as const,
		url: 'https://0.email',
		description:
			'Implemented AI email composer using OpenAI and Google Gemini. Various feature work and bug fixes.',
		command: 'bun run build',
		technologies: [
			'Next.js',
			'TypeScript',
			'tRPC',
			'PostgreSQL',
			'Tailwind CSS',
			'OpenAI',
			'Gemini',
			'Cloudflare',
			'Vercel',
			'Bun',
		],
	},
	{
		year: '2025',
		title: 'Senior Full-Stack Engineer',
		company: 'Mercury',
		type: 'job' as const,
		url: 'https://mercury.com',
		ongoing: true,
		description:
			'Cards Experience team. Helped launch Standalone IO to beta. Architected dashboard for credit-only orgs. Built async combobox components for card issuance. Refactored billing address copy flow. Resolved production PostgreSQL issues. Developed Linked Accounts Modal with Plaid integration.',
		command: 'nix develop',
		technologies: [
			'TypeScript',
			'React',
			'React Router',
			'Haskell',
			'PostgreSQL',
			'Storybook',
			'TanStack Query',
		],
	},
]

export function ScrollTimeline() {
	const totalItems = MILESTONES.length

	return (
		<div className="relative mx-auto max-w-5xl px-4 font-mono">
			<div className="mb-24 flex items-center justify-between border-neutral-900 border-y py-4">
				<div className="font-bold text-neutral-500 text-sm uppercase tracking-widest">
					Index
				</div>
				<div className="font-bold text-neutral-500 text-sm uppercase tracking-widest">
					Specification
				</div>
			</div>

			<div className="space-y-0">
				{MILESTONES.toReversed().map((item, index) => (
					<TimelineItem
						index={totalItems - index}
						item={item}
						key={`${item.year}-${item.company}-${item.title}`}
					/>
				))}
			</div>
		</div>
	)
}

function TimelineItem({
	item,
	index,
}: {
	item: (typeof MILESTONES)[0]
	index: number
}) {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, {
		once: true,
		margin: '-10% 0px -10% 0px',
		amount: 0.1,
	})

	const isSubtle = 'subtle' in item && item.subtle
	const [commandComplete, setCommandComplete] = useState(false)
	const hasCommand = !isSubtle && item.command

	const displayIndex = index.toString().padStart(2, '0')
	const typeColor = TYPE_COLORS[item.type] || TYPE_COLORS.project
	const isOngoing = 'ongoing' in item && item.ongoing
	const yearColor = isOngoing
		? YEAR_COLORS[item.type] || YEAR_COLORS.project
		: 'text-neutral-200'
	return (
		<motion.div
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
			className={cn(
				'group relative border-neutral-300 border-b border-dashed py-16',
				isSubtle && 'opacity-60',
			)}
			initial={{ opacity: 0, y: 40 }}
			ref={ref}
			transition={{
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			}}
		>
			<div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-16">
				<div className="flex flex-row items-baseline justify-between md:flex-col md:justify-start">
					<div className="font-mono text-neutral-400 text-sm tracking-widest">
						NO. {displayIndex}
					</div>
					{isOngoing ? (
						<TextShimmer
							as="div"
							className={cn(
								'mt-2 font-black font-mono text-7xl tracking-tighter md:text-8xl',
								yearColor,
							)}
							delay={6}
							duration={1}
						>
							{item.year}
						</TextShimmer>
					) : (
						<div
							className={cn(
								'mt-2 font-black font-mono text-7xl tracking-tighter md:text-8xl',
								yearColor,
							)}
						>
							{item.year}
						</div>
					)}
				</div>

				<div className="space-y-8">
					<div>
						<div className="mb-2 flex items-center gap-3">
							<span
								className={cn(
									'inline-block border px-2 py-0.5 font-bold font-mono text-xs uppercase tracking-wider',
									typeColor,
								)}
							>
								{item.type}
							</span>
							{!!item.url && (
								<a
									className="font-mono text-neutral-400 text-xs underline"
									href={item.url}
									rel="noopener noreferrer"
									target="_blank"
								>
									{item.url
										.replace(URL_PROTOCOL_REGEX, '')
										.replace(URL_TRAILING_SLASH_REGEX, '')}
								</a>
							)}
						</div>
						<h3 className="mb-1 font-black font-mono text-3xl text-neutral-900 uppercase leading-none tracking-tight md:text-5xl">
							{item.title}
						</h3>
						<div className="font-mono text-lg text-neutral-500 uppercase tracking-widest">
							{item.company}
						</div>
					</div>

					<p className="max-w-2xl font-mono text-lg text-neutral-700 leading-relaxed">
						{item.description}
						{'collaborator' in item && !!item.collaborator && (
							<>
								{' '}
								Collaboration with{' '}
								<a
									className="text-neutral-900 underline"
									href={item.collaborator.url}
									rel="noopener noreferrer"
									target="_blank"
								>
									{item.collaborator.name}
								</a>
								.
							</>
						)}
					</p>

					{!!hasCommand && (
						<div className="mt-8 overflow-hidden rounded-lg bg-neutral-950 font-mono text-neutral-300 text-sm">
							<div className="flex items-center gap-2 border-neutral-800 border-b bg-neutral-900 px-4 py-2">
								<div className="h-2 w-2 bg-neutral-700" />
								<div className="h-2 w-2 bg-neutral-700" />
								<div className="h-2 w-2 bg-neutral-700" />
								<div className="ml-2 text-neutral-500 text-xs">
									bash — 80x24
								</div>
							</div>
							<div className="p-4">
								<div className="flex gap-2">
									<span className="text-emerald-500">➜</span>
									<span className="text-blue-400">~</span>
									<span className="text-neutral-100">
										{isInView ? (
											<CliTypewriter
												hideCursorOnComplete
												onComplete={() => setCommandComplete(true)}
												showCursor={false}
												startDelay={500}
												text={item.command}
												typingSpeed={30}
											/>
										) : null}
									</span>
								</div>
								{'ongoing' in item && !!item.ongoing && commandComplete && (
									<div className="mt-2 text-emerald-500">
										[PROCESS_RUNNING] Waiting for next instruction...
									</div>
								)}
							</div>
						</div>
					)}

					{item.technologies.length > 0 && (
						<div className="flex flex-wrap gap-2 pt-2">
							{item.technologies.map((tech) => (
								<span
									className="border border-neutral-200 bg-white px-3 py-1 font-mono text-neutral-600 text-xs uppercase tracking-wider"
									key={tech}
								>
									{tech}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	)
}
