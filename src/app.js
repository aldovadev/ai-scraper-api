const express = require("express");
const dotenv = require("dotenv");
const scraperRoutes = require("./routes/scraper.routes");
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/scraper", scraperRoutes);

module.exports = app;
