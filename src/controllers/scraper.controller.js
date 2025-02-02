const scraperService = require("../services/scraper.service");

exports.scrapeEbay = async (req, res) => {
  const { query, pgn } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const products = await scraperService.scrapeProducts(query, pgn);
    res.json({ query, results: products });
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ error: "Failed to scrape eBay" });
  }
};
