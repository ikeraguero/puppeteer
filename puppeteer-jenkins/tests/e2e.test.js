const puppeteer = require('puppeteer')

describe('End to End Test', () => {
	let browser
	let page

	before(async function () {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
		await page.setDefaultTimeout(10000)
	})

	after(async function () {
		await browser.close()
	})

	it('Should submit form', async function () {
		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.waitForSelector('#main-form')
		await page.type('#developer-name', 'Mike')
		await page.click('#tried-test-cafe')
		await page.click('#submit-button')
		await page.waitForSelector('.result-content')
	})

	it('Should select value from select box', async function () {
		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.waitForSelector('#main-form')
		await page.select('#preferred-interface', 'JavaScript API')
	})
})
