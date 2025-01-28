import puppeteer from "puppeteer";
import { timeout } from "puppeteer";

const { KnownDevices: devices } = puppeteer;

export default class Builder {
  static async build(viewport) {
    const launchOptions = {
      headless: true,
      slowMo: 0,
      args: ["--no-sandbox", "--disable-setui-sandbox", "disable-web-security"],
    };
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    const extendedPage = new Builder(page);

    await page.setDefaultTimeout(10000);

    switch (viewport) {
      case "Mobile":
        const mobileViewPort = devices["iPhone X"];
        await page.emulate(mobileViewPort);
        break;
      case "Tablet":
        const tabletViewport = devices["iPad landscape"];
        await page.emulate(tabletViewport);
        break; // Add missing break here
      case "Desktop":
        await page.setViewport({ width: 800, height: 600 });
        break;
      default:
        throw new Error(
          "Supported devices are only MOBILE, TABLET and DESKTOP"
        );
    }

    return new Proxy(extendedPage, {
      get: (target, property, receiver) => {
        if (target[property]) {
          return target[property];
        }

        let value = browser[property];
        if (value instanceof Function) {
          return function (...args) {
            return value.apply(this === receiver ? browser : this, args);
          };
        }

        value = page[property];
        if (value instanceof Function) {
          return function (...args) {
            return value.apply(this === receiver ? page : this, args);
          };
        }

        return value;
      },
    });
  }

  constructor(page) {
    this.page = page;
  }

  async waitAndClick(selector) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async waitAndType(selector, text) {
    await this.page.waitForSelector(selector);
    await this.page.type(selector, text);
  }

  async getText(selector) {
    await this.page.waitForSelector(selector);
    const text = await this.page.$eval(selector, (e) => e.innerHTML);
    return text;
  }

  async getCount(selector) {
    await this.page.waitForSelector(selector);
    const count = await this.page.$eval(selector, (items) => length);
    return count;
  }

  async waitForXPathAndClick(xpath) {
    await this.page.waitForXPath(xpath);
    const elements = await this.page.$x(xpath);
    if (elements.length > 1) {
      console.warn("waitForXPathAndClick returned more than one result");
    }
    await elements[0].click();
  }

  async isElementVisible(selector) {
    let visible = true;
    await this.page
      .waitForSelector(selector, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false;
      });
    return visible;
  }

  async isXPathVisible(xpath) {
    let visible = true;
    await this.page
      .waitForXPath(xpath, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false;
      });
    return visible;
  }
}
