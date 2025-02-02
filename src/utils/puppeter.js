const puppeteer = require("puppeteer");

exports.launchBrowser = async () => {
  return await puppeteer.launch({ headless: true });
};
