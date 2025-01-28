"use strict";

var _puppeteer = require("puppeteer");

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _mochaSteps = require("mocha-steps");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

var _chai = require("chai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Mocha steps demo", function () {
  var page = void 0;

  before(async function () {
    page = await _builder2.default.build("Desktop");
  });

  after(async function () {
    await page.close();
  });

  (0, _mochaSteps.step)("Should load Google homepage", async function () {
    await page.goto("http://zero.webappsecurity.com/index.html");
    var signInButton = await page.isElementVisible("#signin_button");
    (0, _chai.expect)(signInButton).to.be.true;
  });

  (0, _mochaSteps.step)("Should login to application", async function () {
    await page.waitAndClick("#signin_button");
    var loginForm = await page.isElementVisible("#login_form");
    (0, _chai.expect)(loginForm).to.be.true;
    var signInButton = await page.isElementVisible("#signin_button");
    (0, _chai.expect)(signInButton).to.be.false;
  });

  (0, _mochaSteps.step)("Step 3", async function () {
    console.log("From step 3");
  });

  (0, _mochaSteps.step)("Step 4", async function () {
    console.log("From step 4");
  });
});