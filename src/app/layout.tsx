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
	metadataBase: new URL('https://dak.dev'),
	title: {
		default: 'Dak Washbrook | Software Engineer',
		template: '%s | Dak Washbrook',
	},
	description:
		'Software Engineer with 15+ years of experience building scalable, reliable systems. Specializing in AI consulting, system architecture, and full-stack development.',
	keywords: [
		'software engineer',
		'AI consulting',
		'system architecture',
		'full-stack developer',
		'scalable systems',
		'Dak Washbrook',
	],
	authors: [{ name: 'Dak Washbrook', url: 'https://dak.dev' }],
	creator: 'Dak Washbrook',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://dak.dev',
		siteName: 'Dak Washbrook',
		title: 'Dak Washbrook | Software Engineer',
		description:
			'Software Engineer with 15+ years of experience building scalable, reliable systems. Specializing in AI consulting, system architecture, and full-stack development.',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Dak Washbrook | Software Engineer',
		description:
			'Software Engineer with 15+ years of experience building scalable, reliable systems.',
		creator: '@dakdevs',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: 'https://dak.dev',
	},
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
