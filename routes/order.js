const {
  createOrder,
  updateOrder,
  deleteOrder,
  findUserId,
  monthlyIncome,
} = require("../controller/ordercontrollers");
const { findAllUser } = require("../controller/usercontrollers");
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.route("/").put(verifyToken, createOrder);

//UPDATE
router.route("/:id").put(verifyTokenAndAdmin, updateOrder);

//DELETE
router.route("/:id").delete(verifyTokenAndAdmin, deleteOrder);

//GET USER ORDERS
router.route("/find/:userId").get(verifyTokenAndAuthorization, findUserId);

// //GET ALL

router.route("/").get(verifyTokenAndAdmin, findAllUser);

// GET MONTHLY INCOME

router.route("/income").get(verifyTokenAndAdmin, monthlyIncome);

module.exports = router;
