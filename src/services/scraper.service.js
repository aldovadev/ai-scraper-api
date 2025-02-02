const puppeteer = require("puppeteer");
const { map } = require("../app");

exports.scrapeProducts = async (query, pgn) => {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
    query
  )}&_sacat=0&_from=R40&_pgn=${pgn}`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const pageProducts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".s-item")).map((item) => {
      const title =
        item.querySelector(".s-item__title")?.textContent?.trim() || "-";
      const price =
        item.querySelector(".s-item__price")?.textContent?.trim() || "-";
      const link =
        item.querySelector(".s-item__link")?.getAttribute("href") || "-";

      return { title, price, link };
    });
  });

  for (let product of pageProducts) {
    if (product.link !== "-") {
      const productPage = await browser.newPage();
      await productPage.goto(product.link, {
        waitUntil: "domcontentloaded",
      });

      product.description = await page.evaluate(() => {
        return document.querySelector("#desc_ifr")?.textContent?.trim() || "-";
      });

      console.log(product.description);

      await productPage.close();
    } else {
      product.description = "-";
    }
  }

  await browser.close();
  return pageProducts;
};
