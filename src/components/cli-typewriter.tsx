'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '~/utils/cn'

type CliTypewriterProps = {
	text: string
	className?: string
	cursorClassName?: string
	typingSpeed?: number
	startDelay?: number
	showCursor?: boolean
	hideCursorOnComplete?: boolean
	loop?: boolean
	loopDelay?: number
	onComplete?: () => void
}

export function CliTypewriter({
	text,
	className,
	cursorClassName,
	typingSpeed = 80,
	startDelay = 500,
	showCursor = true,
	hideCursorOnComplete = false,
	loop = false,
	loopDelay = 2000,
	onComplete,
}: CliTypewriterProps) {
	const [displayedText, setDisplayedText] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const [isComplete, setIsComplete] = useState(false)

	const onCompleteRef = useRef(onComplete)
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		onCompleteRef.current = onComplete
	}, [onComplete])

	// biome-ignore lint/correctness/useExhaustiveDependencies: text is intentionally included to reset animation when it changes
	useEffect(() => {
		setDisplayedText('')
		setIsTyping(false)
		setIsComplete(false)

		timeoutRef.current = setTimeout(() => {
			setIsTyping(true)
		}, startDelay)

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [text, startDelay])

	useEffect(() => {
		if (!isTyping) {
			return
		}

		if (displayedText.length >= text.length) {
			setIsTyping(false)
			setIsComplete(true)
			onCompleteRef.current?.()

			if (loop) {
				timeoutRef.current = setTimeout(() => {
					setDisplayedText('')
					setIsComplete(false)
					setIsTyping(true)
				}, loopDelay)

				return () => {
					if (timeoutRef.current) {
						clearTimeout(timeoutRef.current)
					}
				}
			}
			return
		}

		const variance = Math.random() * 60 - 30
		const delay = Math.max(20, typingSpeed + variance)

		timeoutRef.current = setTimeout(() => {
			setDisplayedText((prev) => text.slice(0, prev.length + 1))
		}, delay)

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [isTyping, displayedText, text, typingSpeed, loop, loopDelay])

	const shouldShowCursor = showCursor && !(hideCursorOnComplete && isComplete)

	return (
		<span className={cn('inline-flex items-baseline', className)}>
			<span>{displayedText}</span>
			{shouldShowCursor ? (
				<span
					aria-hidden="true"
					className={cn(
						'ml-0.5 inline-block h-[1.1em] w-[0.5em] translate-y-[0.1em] bg-current',
						isTyping ? 'opacity-100' : 'animate-cursor-blink',
						cursorClassName,
					)}
				/>
			) : null}
		</span>
	)
}
