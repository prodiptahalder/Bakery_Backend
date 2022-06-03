const express = require("express");
const router = express.Router();
const multer = require("multer");

const {getACake, getAllCakes, createCake, updateCake, deleteCake} = require("../controllers/cake");
const { userAuth } = require("../middleware/checkAuth");

// Store Images
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/');
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = function(req, file, cb){

    // cb(null, false); //to not store file
    // cb(null, true); //to store file
    // cb(false); //to not store and throw error

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(false);
    }
};

const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024*1024*100//100MB
    },
    fileFilter: fileFilter
});

//create cake
router.post("/", userAuth, upload.single("mainImage"), createCake);

//get a cake
router.get("/:id", getACake);

// get all cakes
router.get("/", getAllCakes);

// update cake details
router.patch("/:id", userAuth, upload.single("mainImage"), updateCake);

// delete a cake
router.delete("/:id", userAuth, deleteCake);

module.exports = router;