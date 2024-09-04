const express = require('express');
const path = require('node:path');
const app = express();
const itemsRouter = require('./routes/item-router');
const categoriesRouter = require('./routes/category-router');
const warehousesRouter = require('./routes/warehouse-router');

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set up middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// serve static files
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// set up routes
app.get('/', (req, res) => {
  res.redirect('/items');
});
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);
app.use('/warehouses', warehousesRouter);
app.get('/*', (req, res) => {
  res.render('error', { errorCode: 404, errorMessage: 'Invalid Page' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
