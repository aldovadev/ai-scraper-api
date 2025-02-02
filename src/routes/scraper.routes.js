const express = require("express");
const { scrapeEbay } = require("../controllers/scraper.controller");

const router = express.Router();

router.get("/", scrapeEbay);

module.exports = router;
