const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const DatabaseConnection = require('./config/db');
const orderController = require('./controllers/order.controller');
const productController = require('./controllers/product.controller');
const userControler = require('./controllers/user.controller');
const app = express();

app.user(bodyParser.urlencoded({extended: false}));
app.user(bodyParser.json());

//Database connection
DatabaseConnection();

app.get("/", (req,res) =>{
    res.send('welcome');
});


app.use('/orders', orderController)
app.use('/products', productController)
app.use('/users', userControler)

app.listen(3000, () =>{
    console.log('Server is running at port 3000')
})