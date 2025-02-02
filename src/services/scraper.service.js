const puppeteer = require("puppeteer");

exports.scrapeProducts = async (query, pgn) => {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
    query
  )}&_sacat=0&_from=R40&_pgn=${pgn}`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".s-item")).map((item) => {
      const title =
        item.querySelector(".s-item__title")?.textContent?.trim() || "No title";
      const price =
        item.querySelector(".s-item__price")?.textContent?.trim() || "No price";
      const link =
        item.querySelector(".s-item__link")?.getAttribute("href") || "#";
      return { title, price, link };
    });
  });

  await browser.close();
  return products;
};
