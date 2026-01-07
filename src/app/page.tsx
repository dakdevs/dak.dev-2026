import Image from 'next/image'

import { GithubIcon, LinkedInIcon, XIcon } from '~/components/icons'

const socials = [
	{
		name: 'X',
		href: 'https://x.com/dakdevs',
		icon: XIcon,
	},
	{
		name: 'GitHub',
		href: 'https://github.com/dakdevs',
		icon: GithubIcon,
	},
	{
		name: 'LinkedIn',
		href: 'https://linkedin.com/in/dwashbrook',
		icon: LinkedInIcon,
	},
]

export default function HomePage() {
	return (
		<main className="flex flex-1 flex-col items-center justify-center p-8">
			<Image
				alt="Portrait sketch"
				height={200}
				src="/sketch.png"
				width={200}
			/>
			<h1 className="mt-6 font-bold font-mono text-2xl tracking-tight">
				Dak Washbrook
			</h1>
			<p className="mt-4 max-w-md text-center text-neutral-600">
				Software Engineer with 15 years of professional experience and a 20+
				year track record in software development, known for mastering complex
				systems, designing AI workflows and systems, and leading scalable,
				reliable architecture.
			</p>
			<nav className="mt-8 flex items-center gap-6">
				{socials.map((social) => (
					<a
						aria-label={social.name}
						className="text-neutral-500 transition-colors hover:text-neutral-900"
						href={social.href}
						key={social.name}
						rel="noopener noreferrer"
						target="_blank"
					>
						<social.icon className="size-5" />
					</a>
				))}
			</nav>
			<a
				className="mt-12 font-mono text-neutral-400 text-sm"
				href="https://cal.com/dak"
				rel="noopener noreferrer"
				target="_blank"
			>
				AI Consulting — $750/hr
			</a>
		</main>
	)
}
