'use client'

import type { MotionProps } from 'motion/react'
import type { JSX } from 'react'

import { useEffect, useRef, useState } from 'react'

import { motion } from 'motion/react'

export type TextScrambleProps = {
	children: string
	duration?: number
	speed?: number
	characterSet?: string
	as?: React.ElementType
	className?: string
	trigger?: boolean
	onScrambleComplete?: () => void
} & MotionProps

const defaultChars =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function TextScramble({
	children,
	duration = 0.8,
	speed = 0.04,
	characterSet = defaultChars,
	className,
	as: Component = 'p',
	trigger = true,
	onScrambleComplete,
	...props
}: TextScrambleProps) {
	const MotionComponent = motion.create(
		Component as keyof JSX.IntrinsicElements,
	)
	const [displayText, setDisplayText] = useState(children)
	const isAnimatingRef = useRef(false)
	const text = children

	useEffect(() => {
		if (!trigger) {
			return
		}
		if (isAnimatingRef.current) {
			return
		}

		isAnimatingRef.current = true

		const steps = duration / speed
		let step = 0

		const interval = setInterval(() => {
			let scrambled = ''
			const progress = step / steps

			for (let i = 0; i < text.length; i += 1) {
				if (text[i] === ' ') {
					scrambled += ' '
					continue
				}

				if (progress * text.length > i) {
					scrambled += text[i]
				} else {
					scrambled +=
						characterSet[Math.floor(Math.random() * characterSet.length)]
				}
			}

			setDisplayText(scrambled)
			step += 1

			if (step > steps) {
				clearInterval(interval)
				setDisplayText(text)
				isAnimatingRef.current = false
				onScrambleComplete?.()
			}
		}, speed * 1000)

		return () => clearInterval(interval)
	}, [trigger, text, duration, speed, characterSet, onScrambleComplete])

	return (
		<MotionComponent
			className={className}
			{...props}
		>
			{displayText}
		</MotionComponent>
	)
}
