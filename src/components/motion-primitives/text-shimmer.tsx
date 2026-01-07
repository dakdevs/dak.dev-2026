'use client'

import type { JSX } from 'react'

import React from 'react'

import { motion } from 'motion/react'

import { cn } from '~/utils/cn'

export type TextShimmerProps = {
	children: string
	as?: React.ElementType
	className?: string
	duration?: number
	delay?: number
}

function TextShimmerComponent({
	children,
	as: Component = 'p',
	className,
	duration = 0.8,
	delay = 5,
}: TextShimmerProps) {
	const MotionComponent = motion.create(
		Component as keyof JSX.IntrinsicElements,
	)

	return (
		<MotionComponent
			animate={{
				filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)'],
			}}
			className={cn('inline-block', className)}
			transition={{
				duration,
				ease: 'easeInOut',
				repeat: Number.POSITIVE_INFINITY,
				repeatDelay: delay,
			}}
		>
			{children}
		</MotionComponent>
	)
}

export const TextShimmer = React.memo(TextShimmerComponent)
