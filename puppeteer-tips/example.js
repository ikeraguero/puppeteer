const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://pptr.dev");
  await page.waitForSelector("title");

  const metrics = await page.evaluate(() => JSON.stringify(window.performance));
  console.log(JSON.parse(metrics));

  await browser.close();
})();

// //accessibility

// (async () => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.goto("https://pptr.dev");
//   await page.waitForSelector("title");

//   const snapshot = await page.accessibility.snapshot();
//   console.log(snapshot);

//   await browser.close();
// })();

// //faking geolocation
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   const context = browser.defaultBrowserContext();
//   await context.overridePermissions("https://pptr.dev", ["geolocation"]);

//   await page.goto("https://pptr.dev");
//   await page.waitForSelector("title");

//   await page.setGeolocation({ latitude: 90, longitude: 0 });

//   await browser.close();
// })();

// //pdf
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto("https://www.example.com", { waitUntil: "networkidle0" });
//   await page.pdf({ path: "example.pdf", format: "A4" });
//   await browser.close();
// })();

// //devices
// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.emulate(devices["iPhone X"]);
//   await page.goto("https://pptr.dev");
//   await page.waitFor(10000);
//   await browser.close();
// })();
