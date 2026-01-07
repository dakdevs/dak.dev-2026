import '~/orpc/orpc.server'
import '~/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { Analytics } from '@vercel/analytics/next'

import { Header } from '~/components/header'
import { mono } from '~/fonts'
import { cn } from '~/utils/cn'

export const viewport: Viewport = {
	maximumScale: 1,
	themeColor: '#ffffff',
}

export const metadata: Metadata = {
	title: {
		default: 'dak.dev',
		template: '%s | dak.dev',
	},
	description: 'Personal website',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html
			className={cn(mono.variable, 'flex h-full flex-col antialiased')}
			lang="en-US"
		>
			<body className="flex min-h-screen flex-col">
				<Header />
				{children}
				<Analytics />
			</body>
		</html>
	)
}
