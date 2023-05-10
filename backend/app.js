const express = require('express');
const app = express();
app.use(express.json());
const errorMiddleWare = require('./middlewares/error')

//import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
app.use('/api/v1', products);
app.use('/api/v1', auth);
//middleware
app.use(errorMiddleWare);
module.exports = app;   