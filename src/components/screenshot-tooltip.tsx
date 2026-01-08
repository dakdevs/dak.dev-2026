'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import Image from 'next/image'

const TOOLTIP_OFFSET = 16
const TOOLTIP_WIDTH = 320
const TOOLTIP_HEIGHT = 200

export function ScreenshotTooltip({
	src,
	position,
}: {
	src: string | undefined
	position: { x: number; y: number }
}) {
	const [mounted, setMounted] = useState(false)
	const [imageLoaded, setImageLoaded] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!(mounted && src)) {
		return null
	}

	const viewportWidth = window.innerWidth
	const viewportHeight = window.innerHeight

	let left = position.x + TOOLTIP_OFFSET
	let top = position.y + TOOLTIP_OFFSET

	if (left + TOOLTIP_WIDTH > viewportWidth - TOOLTIP_OFFSET) {
		left = position.x - TOOLTIP_WIDTH - TOOLTIP_OFFSET
	}

	if (top + TOOLTIP_HEIGHT > viewportHeight - TOOLTIP_OFFSET) {
		top = position.y - TOOLTIP_HEIGHT - TOOLTIP_OFFSET
	}

	left = Math.max(TOOLTIP_OFFSET, left)
	top = Math.max(TOOLTIP_OFFSET, top)

	return createPortal(
		<div
			className="pointer-events-none fixed z-50 hidden md:block"
			style={{ left, top }}
		>
			<div className="overflow-hidden rounded-lg bg-white p-2 shadow-2xl">
				<div
					className="relative overflow-hidden rounded bg-neutral-100"
					style={{ width: TOOLTIP_WIDTH, height: TOOLTIP_HEIGHT }}
				>
					{!imageLoaded && (
						<div className="absolute inset-0 animate-pulse bg-neutral-200" />
					)}
					<Image
						alt=""
						className={`object-cover object-top transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
						fill
						onLoad={() => setImageLoaded(true)}
						src={src}
						unoptimized
					/>
				</div>
			</div>
		</div>,
		document.body,
	)
}
