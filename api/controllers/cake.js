const mongoose = require('mongoose');

const Cake = require('../models/cake');

// CREATE A CAKE
const createCake = (req, res) => {
    const cake = new Cake({
        _id:new  mongoose.Types.ObjectId(),
        name:req.body.name,
        mainImage:req.file.path,
        description:req.body.description,
        price:req.body.price,
        cakeId:req.body.cakeId
    });
    console.log(cake);
    cake.save()
    .then(cake => {
        res.status(201).json({message:"Cake created 🎂", cake:cake});
    })
    .catch(err => {
        res.status(500).json({message:"Error while creating Cake", err:err});
    });
};

// GET CAKE BY ID
const getACake = (req, res) => {
    const id = req.params.id;
    Cake.findById(id)
    .select("_id name mainImage description price cakeId")
    .exec()
    .then(cake => {
        if(!cake){
            res.status(404).json({message:"Cake not found"});
        }
        res.status(200).json({message:"Cake found", cake:cake});
    })
    .catch(err => {
        res.status(500).json({message:"Error while searching cake", err:err});
    });
};

// GET ALL CAKES
const getAllCakes = (req, res) => {
    Cake.find()
    .select("_id name mainImage description price cakeId")
    .exec()
    .then(cakes => {
        if(cakes.length <= 0){
            res.status(404).json({message:"Cakes not found"});
        }
        res.status(200).json({message:"Cakes found", count:cakes.length, cakes:cakes});
    })
    .catch(err => {
        res.status(500).json({message:"Error while searching for cakes", err:err});
    });
};

// UPDATE A CAKE 
const updateCake = (req, res) => {
    const id = req.params.id;
    const newCake = {
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        cakeId:req.body.cakeId
    };
    if(req.file && req.file.path){
        newCake["mainImage"]=req.file.path;
    }
    Cake.updateOne({_id:id}, {$set: newCake})
    .exec()
    .then( cake => {
        if(!cake)  res.status(404).json({message:"No cake found"});
        res.status(200).json({message:"Cake details updated", cake:cake});
    })
    .catch( err => {
        res.status(500).json({message:"Error while updating cake details", err:err});
    });
};

// DELETE CAKE 
const  deleteCake = (req, res) => {
    const id = req.params.id;
    Cake.deleteOne({_id:id})
    .exec()
    .then( cake => {
        if(!cake) res.status(404).json({message:"No Cake found"});
        res.status(200).json({message:"Cake deleted", cake:cake});
    })
    .catch( err => {
        res.status(500).json({message:"Error while deleting cake", err:err});
    });
};

module.exports = {getACake, getAllCakes, createCake, updateCake, deleteCake};