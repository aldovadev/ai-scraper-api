const scraperService = require("../services/scraper.service");

exports.scrapeEbay = async (req, res) => {
  const { query, pgn, desc } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const products = await scraperService.scrapeProducts(query, pgn, desc);
    res.json({ query, results: products });
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ error: "Failed to scrape eBay" });
  }
};
