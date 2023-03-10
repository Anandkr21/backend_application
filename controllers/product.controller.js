const express = require('express')
const router = express.Router()
const Product = require('../models/products')
const User = require('../models/users')
const Order = require('../models/orders')

router.post('/', (req, res) => {
    const product = new Product(req.body);
    product.save((err, product) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json(product);
        }
    })
})


router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json(product);
        }
    })
})

module.exports = router