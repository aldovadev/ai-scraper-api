const express = require("express");
const scraperRoutes = require("./routes/scraper.routes");

const app = express();

app.use(express.json());
app.use("/api/scraper", scraperRoutes);

module.exports = app;
