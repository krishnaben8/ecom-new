const {
  createCart,
  updateCart,
  deleteCart,
  findUserCart,
  findAllCart,
} = require("../controller/cartcontrollers");
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.route("/").post(verifyToken, createCart);

//UPDATE
router.route("/:id").put(verifyTokenAndAuthorization, updateCart);

//DELETE
router.route("/:id").delete(verifyTokenAndAuthorization, deleteCart);

//GET USER CART
router.route("/find/:userId").get(verifyTokenAndAuthorization, findUserCart);

// //GET ALL

router.route("/").get(verifyTokenAndAdmin, findAllCart);

module.exports = router;
