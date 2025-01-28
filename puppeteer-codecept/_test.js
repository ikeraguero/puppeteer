const assert = require('assert')

Feature('Sample Feature')

Scenario('First Test', ({ I }) => {
	I.amOnPage('https://www.example.com')
	I.wait(1)
	I.saveScreenshot('test.png', true)
})

Scenario('Second Test', ({ I }) => {
	I.amOnPage('https://www.example.com')
	I.see('Example')
	I.dontSee('Google')
	I.seeElement('h1')
	I.dontSeeElement('.video-player')
	I.wait(2)
})

Scenario('Third Test', async ({ I }) => {
	I.amOnPage('https://www.example.com')
	const text = await I.grabTextFrom('h1')
	I.wait(3)
	assert.strictEqual(text, 'Example Domain', 'Text does not match...')
})
