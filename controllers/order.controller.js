const express = require('express')
const router = express.Router()
const Product = require('../models/products')
const User = require('../models/users')
const Order = require('../models/orders')
const { query } = require('express')

//add a new order

router.post('/', async(req,res) =>{
    const {product_id, user_id, status, timeline}= req.body;

    try {
        //check if the product exist and has enough quetity
        const product = await Product.findById(product_id);
        if(!product){
            return res.status(400).json({message: 'Product not found'})
        }
        if(product.qty_available<1){
            return res.status(400).json({message: "Product out of stock."})
        }

        //check if the user exists
        const user = await User.findById(user_id);
        if(user) {
            return res.status(400).json({message: 'User not found.'})
        }

        // create the order
        const order = new Order({
            product: product_id,
            user: user_id,
            status,
            timeline
        })

        await order.save();

        //update the product quentity
        product.qty_available--;
        await product.save()

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.put('/:id', async(req,res) =>{
    const {id} = req.params;
    const {status, timeline} =req.body;

    try {
        // find the order by id
        const order =await Order.findById(id);
        if(!order){
            return res.status(404).json({message: "Order not found"})

        }
        if(status){
            order.status = status;
        }
        if(timeline){
            order.timeline.push(timeline);
        }

        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


router.get('/summary', async(req,res) =>{
    const startDate = new Date(req.query.start_date)
    const endDate = new Date(req,query.end_date)

    try {
        const statsForall = await Order.aggregate([
            //filter orders within the data range
            {
                $match: {
                    created_at:{
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            //group orders by status and count them
            {
                $group: {
                    _id: "$status",
                    count: {$sum:1},
                },
            },
        ])

        const orderStatus = {
            "Confirmed": 0,
            "Yet to dispatch":0,
            "Dispatched": 0,
            "Deliverd":0
        }

        //calculate the total number of orders
        let totalOrders=0;

        orders.forEach((order) => {
            if(order._id === "Confirmed") orderStatus.Confirmed+=1;
            if(order._id === "Yet to Dispatch") orderStatus["Yet to Dispatch"]  +=1;
            if(order._id === 'Dispatched') orderStatus.Dispatched +=1;
            if(order._id === "delivered") orderStatus.Deliverd +=1;
            totalOrders +=1;
        });

        const stats ={
            totalOrders,
            ...orderStatus
        };

        //construct the response obj
        const response = {
            ...stats
        };

        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal problem'})
    }
})

module.exports = router