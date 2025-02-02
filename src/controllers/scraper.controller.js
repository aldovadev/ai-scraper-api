const scraperService = require("../services/scraper.service");

exports.scrapeProductsStreamController = async (req, res) => {
  const { query, pgn } = req.query;
  let { desc } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendUpdate = (data) => {
    res.write(JSON.stringify(data));
  };

  try {
    await scraperService.scrapeProductsStream(
      query,
      pgn,
      desc === "true",
      sendUpdate
    );
  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).json({ message: "An error occurred while scraping data." });
  }
};

exports.scrapeProductsController = async (req, res) => {
  const { query, pgn } = req.query;
  let { desc } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const result = await scraperService.scrapeProducts(
      query,
      pgn,
      desc === "true"
    );

    return result;
  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).json({ message: "An error occurred while scraping data." });
  }
};
