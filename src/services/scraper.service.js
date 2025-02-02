const puppeteer = require("puppeteer");
const { map } = require("../app");
const { processWithAI } = require("../utils/LLM");

exports.scrapeProducts = async (query, pgn, desc) => {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
    query
  )}&_sacat=0&_from=R40&_pgn=${pgn}&desc=${desc}`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const products = await page.evaluate(() => {
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

  for (let product of products) {
    if (product.link !== "-") {
      await page.goto(product.link, { waitUntil: "domcontentloaded" });

      const iframeElement = await page.$("iframe#desc_ifr");
      let description = "-";

      if (iframeElement) {
        const iframe = await iframeElement.contentFrame();
        if (iframe) {
          description = await iframe.evaluate(
            () => document.body.textContent.trim() || "-"
          );
        }
      }
      product.description = description;
    } else {
      description = await page.evaluate(() => {
        return (
          document.querySelector("#viTabs_0_is")?.textContent?.trim() ||
          document.querySelector(".itemAttr")?.textContent?.trim() ||
          "-"
        );
      });
    }
  }

  await browser.close();

  products = await processWithAI(products, query);

  return products;
};
