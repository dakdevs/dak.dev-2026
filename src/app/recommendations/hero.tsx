'use client'

import { motion } from 'motion/react'

export function RecommendationsHero() {
	return (
		<section className="mx-auto mb-24 max-w-5xl pt-24 md:pt-32">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="border-neutral-900 border-b pb-8"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			>
				<h1 className="font-black font-mono text-6xl text-neutral-950 uppercase tracking-tighter md:text-9xl">
					Rec_Index
				</h1>
				<div className="mt-4 flex flex-col justify-between gap-4 font-mono text-sm md:flex-row md:items-end">
					<p className="max-w-xl text-neutral-600 leading-relaxed">
						[QUERY_INIT]: A curated registry of tools, libraries, and products.
						Battle-tested in production environments and daily workflows.
					</p>
					<div className="text-right">
						<div className="font-bold text-neutral-950">dak.dev</div>
						<div className="text-neutral-400">CATALOG v1.0</div>
					</div>
				</div>
			</motion.div>
		</section>
	)
}
