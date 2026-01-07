import Image from 'next/image'
import Link from 'next/link'

export function Header({ currentPage }: { currentPage?: string }) {
	return (
		<header className="flex items-center justify-between p-6">
			<Link href="/">
				<Image
					alt="dak.dev"
					height={32}
					priority
					src="/dak-logo.svg"
					width={80}
				/>
			</Link>
			<nav className="flex gap-6">
				<Link
					className={`font-mono text-sm ${currentPage === 'career' ? 'text-neutral-900' : 'text-neutral-500'}`}
					href="/career"
				>
					Career
				</Link>
				<Link
					className={`font-mono text-sm ${currentPage === 'recommendations' ? 'text-neutral-900' : 'text-neutral-500'}`}
					href="/recommendations"
				>
					Recommendations
				</Link>
			</nav>
		</header>
	)
}
