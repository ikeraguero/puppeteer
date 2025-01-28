const { launch } = require("puppeteer");

module.exports = {
  launch: {
    headless: false,
    args: [
      "--disable-extensions",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--disable-popup-blocking",
      "--disable-web-security",
      "--ignore-certificate-errors",
      "--disable-web-security",
      "--allow-insecure-localhost",
    ],
  },
  browserContext: "default",
};
