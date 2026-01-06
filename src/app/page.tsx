import Image from 'next/image'

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8">
			<Image
				src="/dak-logo.svg"
				alt="dak.dev"
				width={200}
				height={80}
				priority
			/>
			<p className="mt-4 text-lg text-neutral-600">Coming soon</p>
		</main>
	)
}
