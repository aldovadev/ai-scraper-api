const express = require("express");
const scraperController = require("../controllers/scraper.controller");

const router = express.Router();

router.get("/stream", scraperController.scrapeProductsStreamController);
router.get("/", scraperController.scrapeProductsController);

module.exports = router;
