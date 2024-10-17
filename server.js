import express from "express";
import { router as indexRouter } from "./routes/index.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke");
});
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  console.log("Started");
  res.render("index", { query: [] });
});


// set up routes
app.use("", indexRouter)

app.listen(process.env.PORT || 3000);
