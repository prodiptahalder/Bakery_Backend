const express = require("express");
const router = express.Router();

const {createUser, logIn} = require("../controllers/user");

//create user using sign up
router.post("/signup", createUser);

router.post("/login", logIn);

module.exports = router;