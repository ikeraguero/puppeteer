import puppeteer from "puppeteer";
import { step } from "mocha-steps";
import Builder from "../builder";
import { expect } from "chai";
import LoginPage from "../pages/LoginPage";

describe("Mocha steps demo", function () {
  let page;
  let loginPage;

  before(async () => {
    page = await Builder.build("Desktop");
    loginPage = await new LoginPage(page);
  });

  after(async () => {
    await page.close();
  });

  step("Should load Google homepage", async () => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    expect(await page.isElementVisible("#signin_button")).to.be.true;
  });

  step("Should display login form", async () => {
    await page.waitAndClick("#signin_button");
    expect(await page.isElementVisible("#login_form")).to.be.true;
    expect(await page.isElementVisible("#signin_button")).to.be.false;
  });

  step("Should login to application", async () => {
    // await page.waitAndType("#user_login", "username");
    // await page.waitAndType("#user_password", "password");
    // await page.waitAndClick(".btn-primary");
    await loginPage.login("username", "password");
    expect(await page.isElementVisible(".nav-tabs")).to.be.true;
  });

  step("SHould have 6 navbar links", async () => {
    expect(await page.getCount(".nav-tabs li")).to.equal(6);
  });

  step("Step 3", async () => {
    console.log("From step 3");
  });

  step("Step 4", async () => {
    console.log("From step 4");
  });
});
