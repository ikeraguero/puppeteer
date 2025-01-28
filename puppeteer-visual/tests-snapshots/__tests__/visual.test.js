const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')
const { KnownDevices: devices } = puppeteer
const { setTimeout } = require('node:timers/promises')
expect.extend({ toMatchImageSnapshot })

describe('Visual Regression Testing', () => {
	let browser
	let page

	beforeAll(async function () {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
	})

	afterAll(async function () {
		await browser.close()
	})

	test('Full Page Snapshot', async () => {
		await page.goto('https://www.example.com')
		await page.waitForSelector('h1')
		const image = await page.screenshot()

		expect(Buffer.from(image)).toMatchImageSnapshot({
			failureThresholdType: 'pixel',
			failureThreshold: 500,
		})
	})

	test('Single Element Snapshot', async function () {
		await page.goto('https://www.example.com')
		const h1 = await page.waitForSelector('h1')
		const image = await h1.screenshot()
		expect(Buffer.from(image)).toMatchImageSnapshot({
			failureThresholdType: 'percent',
			failureThreshold: 0.01,
		})
	})

	test('Mobile Snapshot', async function () {
		await page.goto('https://www.example.com')
		await page.waitForSelector('h1')
		await page.emulate(devices['iPhone X'])

		const image = await page.screenshot()
		expect(Buffer.from(image)).toMatchImageSnapshot({
			failureThresholdType: 'percent',
			failureThreshold: 0.01,
		})
	})

	test('Mobile Snapshot', async function () {
		await page.goto('https://www.example.com')
		await page.waitForSelector('h1')
		await page.emulate(devices['iPad landscape'])

		const image = await page.screenshot()
		expect(Buffer.from(image)).toMatchImageSnapshot({
			failureThresholdType: 'percent',
			failureThreshold: 0.01,
		})
	})

	test.only('Remove Element Before Snapshot', async function () {
		await page.goto('https://www.example.com')
		await page.evaluate(() => {
			;(document.querySelectorAll('h1') || []).forEach((el) => el.remove())
		})
		await setTimeout(5000)
	})
})
