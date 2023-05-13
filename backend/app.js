const express = require('express');
const app = express();
app.use(express.json());
const errorMiddleWare = require('./middlewares/error')
const cookieParser = require('cookie-parser')
//import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use(cookieParser())
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
//middleware
app.use(errorMiddleWare);
module.exports = app;   