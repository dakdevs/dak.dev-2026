import chromium from '@sparticuz/chromium'
import { chromium as playwright } from 'playwright-core'

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function extractUrlsFromSource(): Array<{ name: string; url: string }> {
	const sourcePath = join(
		__dirname,
		'../src/components/recommendations-list.tsx',
	)
	const content = readFileSync(sourcePath, 'utf-8')

	const items: Array<{ name: string; url: string }> = []
	const itemRegex = /name:\s*'([^']+)'[\s\S]*?url:\s*'([^']+)'/g

	for (const match of content.matchAll(itemRegex)) {
		const [, name, url] = match
		if (name && url && url.startsWith('http')) {
			items.push({ name, url })
		}
	}

	return items
}

function slugify(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '')
}

async function generateScreenshots() {
	const outputDir = join(__dirname, '../public/screenshots')
	const manifestPath = join(__dirname, '../src/data/screenshot-manifest.ts')

	mkdirSync(outputDir, { recursive: true })
	mkdirSync(join(__dirname, '../src/data'), { recursive: true })

	console.log('Extracting URLs from recommendations...')
	const items = extractUrlsFromSource()
	console.log(`Found ${items.length} items to screenshot`)

	const toGenerate = items.filter((item) => {
		const slug = slugify(item.name)
		const screenshotPath = join(outputDir, `${slug}.jpg`)
		if (existsSync(screenshotPath)) {
			console.log(`Skipping ${item.name} - already exists`)
			return false
		}
		return true
	})

	console.log(`Need to generate ${toGenerate.length} new screenshots`)

	if (toGenerate.length === 0) {
		console.log('All screenshots already exist, generating manifest only...')
		generateManifest(items, manifestPath)
		return
	}

	console.log('Launching browser...')
	const isVercel = process.env.VERCEL === '1'

	const browser = await playwright.launch({
		executablePath: isVercel ? await chromium.executablePath() : undefined,
		args: isVercel ? chromium.args : [],
		headless: true,
	})

	const context = await browser.newContext({
		viewport: { width: 1280, height: 800 },
		deviceScaleFactor: 1,
	})

	const BATCH_SIZE = 5
	for (let i = 0; i < toGenerate.length; i += BATCH_SIZE) {
		const batch = toGenerate.slice(i, i + BATCH_SIZE)
		console.log(
			`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(toGenerate.length / BATCH_SIZE)}`,
		)

		await Promise.all(
			batch.map(async (item) => {
				const slug = slugify(item.name)
				const outputPath = join(outputDir, `${slug}.jpg`)

				try {
					const page = await context.newPage()
					await page.goto(item.url, {
						waitUntil: 'networkidle',
						timeout: 30_000,
					})

					await page.waitForTimeout(1000)

					await page.screenshot({
						path: outputPath,
						type: 'jpeg',
						quality: 80,
					})

					await page.close()
					console.log(`  Generated: ${item.name}`)
				} catch (error) {
					console.error(`  Failed: ${item.name} - ${(error as Error).message}`)
				}
			}),
		)
	}

	await browser.close()
	console.log('Browser closed')

	generateManifest(items, manifestPath)
}

function generateManifest(
	items: Array<{ name: string; url: string }>,
	manifestPath: string,
) {
	const manifest: Record<string, string> = {}

	for (const item of items) {
		const slug = slugify(item.name)
		manifest[item.url] = `/screenshots/${slug}.jpg`
	}

	const content = `export const SCREENSHOT_MAP: Record<string, string> = ${JSON.stringify(manifest, null, '\t')}
`

	writeFileSync(manifestPath, content)
	console.log(`Generated manifest with ${Object.keys(manifest).length} entries`)
}

generateScreenshots().catch(console.error)
