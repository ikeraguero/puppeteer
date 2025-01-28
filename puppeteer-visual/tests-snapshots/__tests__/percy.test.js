const puppeteer = require('puppeteer')
const { setTimeout } = require('node:timers/promises')

const percySnapshot = require('@percy/puppeteer')

describe('Percy Visual Test', () => {
	let browser
	let page

	beforeAll(async function () {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
	})

	afterAll(async function () {
		await browser.close()
	})

	test('Full Page Percy Snapshot', async () => {
		await page.goto('https://www.example.com')
		await setTimeout(1000)
		await percySnapshot(page, 'Example page')
	})
})
