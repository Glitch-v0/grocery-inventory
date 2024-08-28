const express = require("express");
const path = require("node:path");
const app = express();
const routes = require("./routes/UPDATETHIS");

// set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// serve static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// set up routes
app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
