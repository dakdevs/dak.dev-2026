'use client'

import { useEffect, useRef, useState } from 'react'

import { motion, useInView, useReducedMotion } from 'motion/react'

import { CliTypewriter } from '~/components/cli-typewriter'
import {
	BriefcaseIcon,
	GamepadIcon,
	GraduationCapIcon,
	MicrophoneIcon,
	RocketIcon,
	TerminalIcon,
	TrophyIcon,
	UsersIcon,
} from '~/components/icons'
import { cn } from '~/utils/cn'

const MILESTONE_ICONS = {
	project: TerminalIcon,
	job: BriefcaseIcon,
	education: GraduationCapIcon,
	talk: MicrophoneIcon,
	award: TrophyIcon,
	startup: RocketIcon,
	community: UsersIcon,
	gaming: GamepadIcon,
} as const

type MilestoneType = keyof typeof MILESTONE_ICONS

const MILESTONES = [
	{
		year: '1997',
		title: 'Pantry Inventory System',
		company: 'Home Project',
		type: 'project' as MilestoneType,
		description:
			'Built a pantry inventory system at 6 years old using Visual Basic and Microsoft Access Database.',
		command: 'run inventory.exe',
		technologies: ['Visual Basic', 'Microsoft Access'],
	},
	{
		year: '2001',
		title: 'K.I.D.S.S.',
		company: 'Kids In Disguise Super Spies',
		type: 'project' as MilestoneType,
		description:
			'Built my first website at 10 years old using Microsoft FrontPage. Had HTACCESS login, members-only area, and forms for submitting spy reports. Inspired by Spy Kids.',
		command: 'frontpage index.htm',
		technologies: ['Microsoft FrontPage', 'HTML', 'HTACCESS'],
	},
	{
		year: '2007',
		title: 'School Newspaper Website',
		company: 'El Camino Real High School',
		type: 'project' as MilestoneType,
		url: 'https://www.ecrchs.net/',
		description: 'Created the high school newspaper website.',
		command: 'wp theme activate newspaper',
		technologies: ['WordPress', 'HTML', 'CSS'],
	},
	{
		year: '2008',
		title: 'EC Eye Website',
		company: 'El Camino Real High School',
		type: 'project' as MilestoneType,
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
		type: 'education' as MilestoneType,
		url: 'https://www.ecrchs.net/',
		description: 'Finished high school. Ready to build.',
		command: 'exit 0',
		technologies: [],
	},
	{
		year: '2010',
		title: 'Lead Full-Stack Developer',
		company: 'Dellamoda.com',
		type: 'job' as MilestoneType,
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
		type: 'gaming' as MilestoneType,
		description:
			'Built a video showcase site to curate Aion PvP content. Started with WordPress, rewrote in raw PHP in 2014. Added Twitch integration for streamers. 30k monthly active users.',
		command: 'php -S localhost:8000',
		technologies: ['WordPress', 'PHP', 'MySQL', 'Twitch API'],
	},
	{
		year: '2016',
		title: 'Senior Software Engineer',
		company: 'NCSoft',
		type: 'job' as MilestoneType,
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
		type: 'job' as MilestoneType,
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
		type: 'gaming' as MilestoneType,
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
		year: '2022',
		title: 'Co-Founder & Founding Engineer',
		company: 'Trestle',
		type: 'startup' as MilestoneType,
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
		type: 'talk' as MilestoneType,
		description: 'Joint presentation on career paths in software engineering.',
		subtle: true,
		command: '',
		technologies: [],
	},
	{
		year: '2023',
		title: 'Lead Developer',
		company: 'MyAion.xyz',
		type: 'gaming' as MilestoneType,
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
		type: 'talk' as MilestoneType,
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
		type: 'talk' as MilestoneType,
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
		type: 'startup' as MilestoneType,
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
		type: 'community' as MilestoneType,
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
		type: 'award' as MilestoneType,
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
		type: 'job' as MilestoneType,
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
		type: 'job' as MilestoneType,
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
	return (
		<div className="relative mx-auto max-w-3xl px-4 pt-12 pb-24 font-mono">
			<div className="mb-12 text-neutral-500 text-sm">
				<span className="text-neutral-400">$</span> history | grep "career"
				--sort=date --reverse
			</div>

			<div className="relative">
				<div className="absolute top-3 bottom-3 left-[27px] w-px bg-neutral-200 md:left-[27px]" />

				<div className="space-y-0">
					{MILESTONES.toReversed().map((item) => (
						<TimelineItem
							item={item}
							key={`${item.year}-${item.company}-${item.title}`}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

function TimelineItem({ item }: { item: (typeof MILESTONES)[0] }) {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, { once: true, margin: '-10% 0px -5% 0px' })
	const shouldReduceMotion = useReducedMotion()
	const isSubtle = 'subtle' in item && item.subtle
	const Icon = 'type' in item ? MILESTONE_ICONS[item.type] : TerminalIcon
	const [commandComplete, setCommandComplete] = useState(false)
	const [titleComplete, setTitleComplete] = useState(false)

	const hasCommand = !isSubtle && item.command

	return (
		<div
			className={cn(
				'group relative flex gap-6 md:gap-8',
				isSubtle ? 'pb-8' : 'pb-16',
				'last:pb-0',
			)}
			ref={ref}
		>
			<div className="flex w-[54px] flex-none flex-col items-center">
				<div
					className={cn(
						'absolute top-[18px] left-[28px] h-px bg-neutral-200 transition-all duration-500',
						isInView ? 'w-6 opacity-100' : 'w-0 opacity-0',
					)}
				/>

				<div
					className={cn(
						'relative z-10 mt-[9px] flex items-center justify-center rounded-full border bg-white ring-8 ring-white transition-all duration-500',
						isSubtle
							? 'h-3 w-3 border-neutral-300 bg-neutral-100'
							: 'h-5 w-5 border-neutral-900 bg-white',
						isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
					)}
				>
					{!isSubtle && (
						<div className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
					)}
				</div>
			</div>

			<div className="min-w-0 flex-1 pt-1">
				<div className="mb-4 flex items-center gap-3">
					<div
						className={cn(
							'inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50/50 px-3 py-1 font-medium text-neutral-600 backdrop-blur-sm transition-all duration-500',
							isSubtle ? 'text-xs' : 'text-xs',
							isInView
								? 'translate-x-0 opacity-100'
								: '-translate-x-4 opacity-0',
						)}
					>
						<Icon className="size-3.5" />
						{item.year}
					</div>
				</div>

				<div className="relative">
					{hasCommand ? (
						<div className="mb-4 font-mono text-xs">
							<div className="flex items-center gap-2 text-neutral-500">
								<span className="font-bold text-neutral-500">$</span>
								<span className="opacity-75">
									{isInView ? (
										<CliTypewriter
											hideCursorOnComplete
											onComplete={() => setCommandComplete(true)}
											showCursor={false}
											startDelay={200}
											text={item.command}
											typingSpeed={shouldReduceMotion ? 0 : 40}
										/>
									) : null}
								</span>
							</div>
							{'ongoing' in item && item.ongoing && commandComplete ? (
								<BuildingIndicator />
							) : null}
						</div>
					) : null}

					<h3
						className={cn(
							'mb-2 font-bold tracking-tight',
							isSubtle
								? 'text-neutral-500 text-sm'
								: 'text-neutral-900 text-xl',
						)}
					>
						{isInView && (hasCommand ? commandComplete : true) ? (
							<CliTypewriter
								hideCursorOnComplete
								onComplete={() => setTitleComplete(true)}
								startDelay={hasCommand ? 100 : 200}
								text={item.title}
								typingSpeed={shouldReduceMotion ? 0 : 30}
							/>
						) : null}
					</h3>

					<motion.div
						animate={
							titleComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
						}
						initial={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.4 }}
					>
						<div
							className={cn(
								'font-medium text-neutral-500',
								isSubtle ? 'mb-2 text-neutral-400 text-xs' : 'mb-4 text-sm',
							)}
						>
							@{' '}
							{item.url ? (
								<a
									className="underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900 hover:decoration-neutral-900"
									href={item.url}
									rel="noopener noreferrer"
									target="_blank"
								>
									{item.company}
								</a>
							) : (
								item.company
							)}
						</div>
						{!isSubtle && (
							<p className="max-w-lg text-neutral-600 text-sm leading-relaxed md:text-base">
								{item.description}
							</p>
						)}
						{!isSubtle && item.technologies.length > 0 && (
							<div className="mt-4 flex flex-wrap gap-2">
								{item.technologies.map((tech) => (
									<span
										className="rounded-md bg-neutral-100 px-2 py-1 text-neutral-500 text-xs transition-colors hover:bg-neutral-200"
										key={tech}
									>
										{tech}
									</span>
								))}
							</div>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	)
}

function BuildingIndicator() {
	const [dots, setDots] = useState(1)

	useEffect(() => {
		const interval = setInterval(() => {
			setDots((d) => (d % 3) + 1)
		}, 400)
		return () => clearInterval(interval)
	}, [])

	return <div className="mt-1 text-green-600">building{'.'.repeat(dots)}</div>
}
