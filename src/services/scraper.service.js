const { launchBrowser } = require("../utils/puppeter");
const { processDataWithAI } = require("../utils/LLM");

exports.scrapeProductsStream = async (query, pgn, desc, sendUpdate) => {
  const results = [];
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
    query
  )}&_sacat=0&_from=R40&_pgn=${pgn}`;
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".s-item"))
      .map((item) => {
        const title =
          item.querySelector(".s-item__title")?.textContent?.trim() || "-";
        const price =
          item.querySelector(".s-item__price")?.textContent?.trim() || "-";
        const link =
          item.querySelector(".s-item__link")?.getAttribute("href") || "-";

        return title !== "Shop on eBay" ? { title, price, link } : null;
      })
      .filter(Boolean);
  });

  if (desc) {
    for (let product of products) {
      if (product.link !== "-") {
        const detailPage = await browser.newPage();
        await detailPage.goto(product.link, { waitUntil: "domcontentloaded" });
        const iframeElement = await detailPage.$("iframe#desc_ifr");

        if (iframeElement) {
          const iframe = await iframeElement.contentFrame();
          if (iframe) {
            product.description = await iframe.evaluate(
              () => document.body.textContent.trim() || "-"
            );
          }
        } else {
          product.description = "-";
        }

        await detailPage.close();
      } else {
        product.description = "-";
      }

      const result = await processDataWithAI(product);
      const resultString = formatAIJson(result);
      results.push(JSON.parse(resultString));

      const percentage = (results.length / products.length) * 100;

      if (sendUpdate) {
        sendUpdate({ loading: `${percentage}%`, products: results });
      }
    }
  } else {
    for (let product of products) {
      product.description = "-";
      const result = await processDataWithAI(product);
      const resultString = formatAIJson(result);
      results.push(JSON.parse(resultString));

      const percentage = (results.length / products.length) * 100;
      console.log(percentage);
      if (sendUpdate) {
        sendUpdate({ loading: `${percentage}%`, products: results });
      }
    }
  }

  await browser.close();

  return { loading: `${percentage}%`, products: results };
};

exports.scrapeProducts = async (query, pgn, desc) => {
  const results = [];
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
    query
  )}&_sacat=0&_from=R40&_pgn=${pgn}`;
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".s-item"))
      .map((item) => {
        const title =
          item.querySelector(".s-item__title")?.textContent?.trim() || "-";
        const price =
          item.querySelector(".s-item__price")?.textContent?.trim() || "-";
        const link =
          item.querySelector(".s-item__link")?.getAttribute("href") || "-";

        return title !== "Shop on eBay" ? { title, price, link } : null;
      })
      .filter(Boolean);
  });

  if (desc) {
    for (let product of products) {
      if (product.link !== "-") {
        const detailPage = await browser.newPage();
        await detailPage.goto(product.link, { waitUntil: "domcontentloaded" });
        const iframeElement = await detailPage.$("iframe#desc_ifr");

        if (iframeElement) {
          const iframe = await iframeElement.contentFrame();
          if (iframe) {
            product.description = await iframe.evaluate(
              () => document.body.textContent.trim() || "-"
            );
          }
        } else {
          product.description = "-";
        }

        await detailPage.close();
      } else {
        product.description = "-";
      }

      const result = await processDataWithAI(product);
      const resultString = formatAIJson(result);
      results.push(JSON.parse(resultString));
    }
  } else {
    for (let product of products) {
      product.description = "-";
      const result = await processDataWithAI(product);
      const resultString = formatAIJson(result);
      results.push(JSON.parse(resultString));
    }
  }

  await browser.close();

  return { products: results };
};

function formatAIJson(inputString) {
  const start = inputString.indexOf("{");
  const end = inputString.lastIndexOf("}");

  return (cleanedString =
    start !== -1 && end !== -1 ? inputString.slice(start, end + 1) : "");
}
