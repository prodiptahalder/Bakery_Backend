
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const createUser = (req, res)=>{
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) res.status(500).json({message: "Error while generating hash", err:err});
        else{
            const user = new User({
                _id:new  mongoose.Types.ObjectId(),
                email:req.body.email,
                password: hash,
            });
            user.save()
            .then(user => {
                res.status(201).json({message:"User created", user: user});
            })
            .catch( err => {
                if(err && err.code && err.code==11000 ){
                    res.status(422).json({message:`email: ${err.keyValue["email"]} already exists`, err:err});
                }
                else if(err && err._message && err._message==="User validation failed"){
                    res.status(500).json({message:err.message, err:err});
                }
                else res.status(500).json({message:"Error while creating user", err:err});
            });
        }
    });
};

const logIn = (req, res) => {
    User.find({email:req.body.email})
    .exec()//generates promise
    .then(user => {
        if(user.length<1){
            res.status(401).json({message:"Auth failed"});
        }
        else{
            bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
                if(err) res.status(401).json({message:"Auth failed"});
                else if(result) {
                    const token = jwt.sign({
                        ...user[0]
                    }, 
                    process.env.jwtKey, 
                    {
                        expiresIn:"3h"
                    });
                    res.status(200).json({message:"Auth Successful", token: token});
                }
                else res.status(401).json({message:"Auth failed"});
            })
        }
    })
    .catch(err => {
        res.status(500).json({message:"Error", err:err});
    })
};

module.exports = {createUser, logIn};