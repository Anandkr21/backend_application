const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const DatabaseConnection = require('./config/db');
const orderController = require('./controllers/products.controller');
const userControler = require('./controllers/user.controller');
const app = express();

app.use(bodyParser.urlencoded({edtended: false}));
app.user(bodyParser.json());

//Database connection
DatabaseConnection();

app.get("/", (req,res) =>{
    res.send('welcome');
});

app.listen(3000, () =>{
    console.log('Server is running at port 3000')
})