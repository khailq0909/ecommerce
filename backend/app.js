const express = require('express');
const app = express();
app.use(express.json());
const errorMiddleWare = require('./middlewares/error')

//import all routes
const products = require('./routes/product');

app.use('/api/v1', products);

//middleware
app.use(errorMiddleWare);
module.exports = app;   