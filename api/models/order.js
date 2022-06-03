const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cake:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cake",
        required: true
    },
    name:{
        type:String,
        required: true
    },
    contact:{
        type:String,
        required: true
    }
},
{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema);