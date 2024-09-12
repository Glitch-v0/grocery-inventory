const express = require("express");
const path = require("node:path");
const app = express();
require("dotenv").config();
const itemsRouter = require("./routes/item-router");
const categoriesRouter = require("./routes/category-router");
const regionsRouter = require("./routes/region-router");

// set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// serve static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// set up routes
app.get("/", (req, res) => {
  res.render("index", { error: null });
});
app.post("/", (req, res) => {
  const password = req.body.password;
  console.log(password, process.env.ADMIN_PASS);
  if (password == process.env.ADMIN_PASS) {
    res.cookie("admin", "true", {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true, // Helps protect against XSS attacks
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    });
    res.redirect("/items");
    console.log(`Successfully logged in as admin`);
  } else {
    res.render("index", { error: "Incorrect password" });
  }
});
app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);
app.use("/regions", regionsRouter);
app.get("/*", (req, res) => {
  res.render("error", { errorCode: 404, errorMessage: "Invalid Page" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
