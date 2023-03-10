const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId, ref: "User"
    },
    product_id: {
        type:mongoose.Schema.Types.ObjectId, ref: "Product"
    },
    status: {
        type : String,
        enum: ['Confirmed', "Yet to Dispatch", 'Dispatched', "Delivered"]
    },
    timeline: [
        {
            timestamp: { type: Date, default: Date.now},
            status: {
                tyep: String,
                enum: ['Confirmed', "Yet to Dispatch", 'Dispatched', "Delivered"]
            }
        }
    ]
});

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order;