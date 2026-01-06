'use client'

import { useRef } from 'react'

import {
	motion,
	useInView,
	useReducedMotion,
	useScroll,
	useSpring,
} from 'motion/react'

import { cn } from '~/utils/cn'

const MILESTONES = [
	{
		year: '2008',
		title: 'Hello World',
		company: 'Bedroom Coder',
		description:
			'Wrote my first lines of code. Basic HTML/CSS sites and simple Python scripts. The obsession began here.',
		command: 'init',
	},
	{
		year: '2010',
		title: 'Junior Developer',
		company: 'TechStart Inc',
		description:
			'First professional role. Learned git the hard way, broke production once, fixed it twice. Full stack PHP/jQuery.',
		command: 'git commit -m "feat: first job"',
	},
	{
		year: '2014',
		title: 'Senior Engineer',
		company: 'ScaleUp Solutions',
		description:
			'Led a team of 5. Migrated legacy monoliths to microservices. Obsessed over performance metrics and clean architecture.',
		command: 'docker compose up -d',
	},
	{
		year: '2017',
		title: 'Lead Architect',
		company: 'Enterprise Corp',
		description:
			'Designed high-availability systems serving millions of users. Introduced Rust and Go to the tech stack. 99.99% uptime.',
		command: 'kubectl apply -f production.yaml',
	},
	{
		year: '2020',
		title: 'Principal Engineer',
		company: 'Innovate Labs',
		description:
			'Focus on developer experience and core platform primitives. Open source maintainer. Mentoring the next generation.',
		command: 'npm publish --access public',
	},
	{
		year: '2023',
		title: 'Indie Hacker',
		company: 'Stealth',
		description:
			'Building tools for builders. Exploring AI agents, local-first software, and p2p protocols.',
		command: 'cargo build --release',
	},
	{
		year: '2025',
		title: 'The Future',
		company: 'dak.dev',
		description:
			'Crafting the next era of software interfaces. Blending design and engineering into a singular discipline.',
		command: './run_future.sh',
	},
]

export function ScrollTimeline() {
	const containerRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start 0.8', 'end end'],
	})

	const shouldReduceMotion = useReducedMotion()

	const springConfig = {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	}

	const scaleY = useSpring(scrollYProgress, springConfig)

	return (
		<div
			className="relative mx-auto max-w-3xl px-4 py-24 font-mono"
			ref={containerRef}
		>
			<div className="mb-12 text-neutral-500 text-sm">
				<span className="text-neutral-400">$</span> history | grep "career"
				--sort=date
			</div>

			<div className="relative">
				<div className="absolute top-2 bottom-0 left-0 w-px bg-neutral-200 md:left-[120px]" />

				<motion.div
					className="absolute top-2 bottom-0 left-0 z-10 w-px bg-neutral-900 md:left-[120px]"
					style={{
						scaleY: shouldReduceMotion ? 1 : scaleY,
						transformOrigin: 'top',
					}}
				/>

				<div className="space-y-24">
					{MILESTONES.map((item) => (
						<TimelineItem
							item={item}
							key={item.year}
						/>
					))}
				</div>

				<div className="relative mt-12 pl-8 md:ml-[120px]">
					<span className="font-bold text-neutral-900">{'>'}</span>{' '}
					<span className="inline-block h-5 w-2.5 animate-cursor-blink bg-neutral-900 align-middle" />
				</div>
			</div>
		</div>
	)
}

function TimelineItem({ item }: { item: (typeof MILESTONES)[0] }) {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' })
	const shouldReduceMotion = useReducedMotion()

	return (
		<div
			className={cn(
				'group relative grid grid-cols-[1fr] gap-x-8 gap-y-4 md:grid-cols-[120px_1fr]',
			)}
			ref={ref}
		>
			<div className="md:text-right">
				<div
					className={cn(
						'inline-block px-1 font-bold text-sm transition-colors duration-500',
						isInView ? 'text-neutral-900' : 'text-neutral-300',
					)}
				>
					[{item.year}]
				</div>
			</div>

			<div className="relative border-l-0 pl-8 md:pl-8">
				<motion.div
					animate={
						isInView
							? { opacity: 1, x: 0 }
							: { opacity: 0, x: shouldReduceMotion ? 0 : -10 }
					}
					initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<motion.div
						animate={isInView ? { opacity: 1 } : { opacity: 0 }}
						className="mb-4 flex items-center gap-2 font-mono text-neutral-500 text-xs"
						initial={{ opacity: 0 }}
						transition={{ duration: 0.5, delay: 0.7 }}
					>
						<span className="font-bold text-neutral-500">$</span>
						<span className="opacity-75">{item.command}</span>
					</motion.div>

					<h3 className="mb-2 font-bold text-neutral-900 text-xl tracking-tight">
						{item.title}
					</h3>
					<div className="mb-4 font-medium text-neutral-500 text-sm">
						@ {item.company}
					</div>
					<p className="max-w-lg text-neutral-600 text-sm leading-relaxed md:text-base">
						{item.description}
					</p>
				</motion.div>
			</div>
		</div>
	)
}
