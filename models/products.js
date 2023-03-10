const mongoose = require("mongoose");

const productSchema = new mongoose.connect({
    name : String,
    cost_unit_price : Number,
    qty_available : Number,
    sku : String
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product