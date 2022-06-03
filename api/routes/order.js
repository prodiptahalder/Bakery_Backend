const express = require("express");
const router = express.Router();

const {getAllOrders, getAnOrder, createOrder, deleteOrder} = require("../controllers/order");
const { userAuth } = require("../middleware/checkAuth");

// get all orders
router.get("/", userAuth, getAllOrders);

// get an order
router.get("/:id", userAuth, getAnOrder);

// create order
router.post("/", createOrder);

//delete order
router.patch("/:id", userAuth, deleteOrder);

module.exports = router;