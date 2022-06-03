const mongoose = require("mongoose");

const Order = require("../models/order");

// CREATE ORDER
const createOrder = (req, res) => {
    const order = new Order({
        name: req.body.name,
        contact:req.body.contact,
        cake: req.body.cake,
    });
    order.save()
    .then(order => {
        if(!order) res.status(404).json({message: "Order not present"});
        res.status(201).json({message: "Order created", order: order});
    })
    .catch(err => {
        res.status(500).json({message: "Error while placing order", err:err});
    });
};

// get all orders 
const getAllOrders = (req, res) => {
    Order.find()
    .sort({createdAt:-1})
    .populate("cake")
    .exec()
    .then( orders => {
        if(orders.length < 0) res.status(404).json({message: "No Orders found"});
        res.status(200).json({message: "Orders found successfully", count:orders.length, orders:orders});
    })
    .catch(err => {
        res.status(500).json({message: "Error while finding orders", err:err});
    });
};

// get an order 
const getAnOrder = (req, res) => {
    const id = req.params.id;
    Order.findById(id)
    .populate("cake")
    .exec()
    .then( order => {
        if(!order) res.status(404).json({message: "No Order found"});
        res.status(200).json({message: "Order found", order:order});
    })
    .catch(err => {
        res.status(500).json({message: "Error while finding order", err:err});
    });
};

// delete order
const deleteOrder = (req, res) => {
    const id = req.params.id;
    Order.deleteOne(id)
    .exec()
    .then( order => {
        if(!order) res.status(404).json({message: "No Order found"});
        res.status(200).json({message: "Order deleted successfully", order:order});
    })
    .catch(err => {
        res.status(500).json({message: "Error while deleting order", err:err});
    });
};

module.exports = {getAllOrders, getAnOrder, createOrder, deleteOrder};