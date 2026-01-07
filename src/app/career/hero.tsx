'use client'

import { motion } from 'motion/react'

export function CareerHero() {
	return (
		<section className="mx-auto mb-24 max-w-5xl pt-24 md:mb-32 md:pt-32">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="border-neutral-900 border-b pb-8"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			>
				<h1 className="font-black font-mono text-6xl text-neutral-950 uppercase tracking-tighter md:text-9xl">
					Career_Log
				</h1>
				<div className="mt-4 flex flex-col justify-between gap-4 font-mono text-sm md:flex-row md:items-end">
					<p className="max-w-xl text-neutral-600 leading-relaxed">
						[ARCHIVE_INIT]: A chronological database of shipped code, leadership
						milestones, and technical evolution. From Visual Basic inventory
						systems to AI-native applications and distributed cloud
						architectures.
					</p>
					<div className="text-right">
						<div className="font-bold text-neutral-950">dak.dev</div>
						<div className="text-neutral-400">VERSION 2.0.0</div>
					</div>
				</div>
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="mt-12 grid grid-cols-2 gap-px bg-neutral-200 md:grid-cols-4"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
			>
				<Stat
					delay={0.2}
					label="EXP_YEARS"
					value="15"
				/>
				<Stat
					delay={0.3}
					label="USR_IMPACT"
					value="50M+"
				/>
				<Stat
					delay={0.4}
					label="STARTUPS"
					value="06"
				/>
				<Stat
					delay={0.5}
					label="STACK_SIZE"
					value="25+"
				/>
			</motion.div>
		</section>
	)
}

function Stat({
	label,
	value,
	delay,
}: {
	label: string
	value: string
	delay: number
}) {
	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="bg-white p-6"
			initial={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
		>
			<div className="mb-2 font-mono text-neutral-400 text-xs tracking-widest">
				[{label}]
			</div>
			<div className="font-black font-mono text-4xl text-neutral-950 md:text-5xl">
				{value}
			</div>
		</motion.div>
	)
}
