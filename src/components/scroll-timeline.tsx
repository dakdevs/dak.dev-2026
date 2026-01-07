'use client'

import { useEffect, useRef, useState } from 'react'

import { motion, useInView, useScroll, useSpring } from 'motion/react'

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
	const ref = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	})

	const scaleY = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	})

	return (
		<div
			className="relative mx-auto max-w-4xl px-4 font-mono"
			ref={ref}
		>
			<div className="mb-16 flex items-center gap-4 text-neutral-400 text-xs uppercase tracking-wider">
				<span className="h-px flex-1 bg-neutral-200" />
				<span>$ history | grep "career" --sort=date --reverse</span>
				<span className="h-px flex-1 bg-neutral-200" />
			</div>

			<div className="relative">
				<div className="absolute top-0 bottom-0 left-[28px] w-px bg-neutral-100 md:left-[28px]" />

				<motion.div
					className="absolute top-0 bottom-0 left-[28px] w-px origin-top bg-neutral-900/10 md:left-[28px]"
					style={{ scaleY }}
				/>

				<div className="space-y-12 pb-32">
					{MILESTONES.toReversed().map((item, index) => (
						<TimelineItem
							index={index}
							item={item}
							key={`${item.year}-${item.company}-${item.title}`}
						/>
					))}
				</div>
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
		amount: 0.2,
	})
	const isSubtle = 'subtle' in item && item.subtle
	const Icon = 'type' in item ? MILESTONE_ICONS[item.type] : TerminalIcon
	const [commandComplete, setCommandComplete] = useState(false)

	const hasCommand = !isSubtle && item.command

	return (
		<motion.div
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			className={cn(
				'group relative flex gap-6 md:gap-10',
				isSubtle &&
					'opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0',
			)}
			initial={{ opacity: 0, y: 20 }}
			ref={ref}
			transition={{ duration: 0.5, delay: index * 0.05 }}
		>
			<div className="flex flex-none flex-col items-center">
				<div
					className={cn(
						'relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 shadow-sm transition-all duration-500',
						isSubtle
							? 'h-8 w-8 rounded-full border-neutral-200 bg-neutral-50'
							: 'border-neutral-100 bg-white',
						isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
					)}
				>
					<Icon
						className={cn(
							'transition-all duration-500',
							isSubtle
								? 'size-3.5 text-neutral-400'
								: 'size-6 text-neutral-700',
							'group-hover:scale-110 group-hover:text-black',
						)}
					/>
				</div>
			</div>

			<div className={cn('min-w-0 flex-1 pt-2', isSubtle && 'pt-0')}>
				<div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
					<span
						className={cn(
							'font-bold font-mono',
							isSubtle
								? 'text-neutral-400 text-xs'
								: 'text-neutral-400 text-sm',
						)}
					>
						{item.year}
					</span>
					{!isSubtle && (
						<span className="h-1 w-1 rounded-full bg-neutral-300" />
					)}
					<span
						className={cn(
							'font-medium text-neutral-900',
							isSubtle ? 'text-xs' : 'text-sm',
						)}
					>
						{item.company}
					</span>
				</div>

				<h3
					className={cn(
						'font-bold text-neutral-900 tracking-tight',
						isSubtle ? 'text-sm' : 'text-xl md:text-2xl',
					)}
				>
					{item.title}
				</h3>

				{!!hasCommand && (
					<div className="mt-3 mb-4 overflow-hidden rounded-md bg-neutral-50 px-3 py-2 font-mono text-xs">
						<div className="flex items-center gap-2 text-neutral-500">
							<span className="select-none font-bold text-neutral-400">$</span>
							<span className="text-neutral-700">
								{isInView ? (
									<CliTypewriter
										hideCursorOnComplete
										onComplete={() => setCommandComplete(true)}
										showCursor={false}
										startDelay={500}
										text={item.command}
										typingSpeed={20}
									/>
								) : null}
							</span>
						</div>
						{'ongoing' in item && item.ongoing && commandComplete ? (
							<BuildingIndicator />
						) : null}
					</div>
				)}

				{!isSubtle && (
					<>
						<p className="mt-3 text-neutral-600 leading-relaxed">
							{item.description}
						</p>

						{item.technologies.length > 0 && (
							<div className="mt-6 flex flex-wrap gap-2">
								{item.technologies.map((tech) => (
									<span
										className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 font-medium text-neutral-600 text-xs transition-colors hover:border-neutral-300 hover:bg-neutral-50"
										key={tech}
									>
										{tech}
									</span>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</motion.div>
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

	return (
		<div className="mt-1 flex items-center gap-1.5 font-medium text-emerald-600">
			<span className="relative flex h-2 w-2">
				<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
				<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
			</span>
			active{'.'.repeat(dots)}
		</div>
	)
}
