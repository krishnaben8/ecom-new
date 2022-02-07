const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
} = require("../controller/productcontroller");
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.route("/").post(verifyTokenAndAdmin, createProduct);

//UPDATE
router.route("/:id").put(verifyTokenAndAdmin, updateProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//GET PRODUCT
router.route("/find/:id").get(getProduct);

//GET ALL PRODUCTS
router.route("/").get(getAllProduct);

module.exports = router;
