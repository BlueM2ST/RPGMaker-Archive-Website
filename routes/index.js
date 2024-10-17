import express from "express";
import { queryDatabase } from "../database.js";

const router = express.Router();

// dynamically create page
router.route("/games").get(async (req, res) => {
  let search =
    req.originalUrl.indexOf("?") > -1 ? req.originalUrl.split("=")[1] : "";
  req.query = await queryDatabase(search);
  res.render("index", { query: req.query });
});

export { router };
