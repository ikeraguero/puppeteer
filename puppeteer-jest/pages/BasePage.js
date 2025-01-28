const { setTimeout } = require("node:timers/promises");

export default class BasePage {
  async wait(time) {
    await setTimeout(time);
  }

  async getTitle() {
    return await page.getTitle();
  }

  async getUrl() {
    return await page.getUrl();
  }

  
}
