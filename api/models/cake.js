const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        unique:true,
        required:true
    },
    mainImage:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    cakeId:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Cake", cakeSchema);