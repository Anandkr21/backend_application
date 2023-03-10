const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Product = require('../models/products')
const User = require('../models/orders')
const Order = require('../models/users')
const {ObjectId} = mongoose.Types

router.post('/', (req, res) =>{
    const user = new User(req.body)
    user.save((err,user) =>{
        if(err) {
            res.status(400).json({error:err.message});
        }else{
            res.json(user);
        }
    })
})



router.get('/:id', (req,res) =>{
    User.findById(req.params.id, (err,user) =>{
        if(err){
            res.status(400).json({error:err.message});
        }else{
            res.json(user);
        }
    })
})


//GET endpoint to retrieve historical orders of user
router.get('/:userId', async(req,res) =>{
    try {
        //retrive the user ID from request parameter
        const userId = req.params.userId;

        //validate that the user ID is a valid or not;
        if(!ObjectId.isValid(userId)) {
            return res.status(400).json({message: "Invalid user id"});
        }

        //find all orders fo the given user
        const orders = await Order.find({userId}).populate('productId').populate('userId')

        //if no orders for the given user return 404 error
        if(!orders || orders.length === 0){
            return res.status(404).json({message: 'No orders found for this user.'})
        }

        //Return the orders with user and product details
        return res.status(200).json({orders});

    } catch (error) {
        //if an error occured , return a 500 error
        console.log(err)
        return res.status(500).json({message: "internal server error"})
    }
})

module.exports = router