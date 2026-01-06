import Image from 'next/image'

import { GithubIcon, LinkedInIcon, XIcon } from '~/components/icons'

const socials = [
	{
		name: 'GitHub',
		href: 'https://github.com/dakdevs',
		icon: GithubIcon,
	},
	{
		name: 'X',
		href: 'https://x.com/dakdevs',
		icon: XIcon,
	},
	{
		name: 'LinkedIn',
		href: 'https://linkedin.com/in/dwashbrook',
		icon: LinkedInIcon,
	},
]

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="flex justify-center p-6">
				<Image
					alt="dak.dev"
					height={32}
					priority
					src="/dak-logo.svg"
					width={80}
				/>
			</header>
			<main className="flex flex-1 flex-col items-center justify-center p-8">
				<Image
					alt="Portrait sketch"
					height={200}
					src="/sketch.png"
					width={200}
				/>
				<p className="mt-6 max-w-md text-center text-neutral-600">
					Software Engineer with 15 years of professional experience and a 20+
					year track record in software development, known for mastering complex
					systems and leading scalable, reliable architecture.
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
			</main>
		</div>
	)
}
