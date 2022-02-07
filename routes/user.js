const {
  createController,
  findUser,
  deleteUser,
  findAllUser,
  findUserStats,
} = require("../controller/usercontrollers");
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//UPDATE
router.route("/:id").put(verifyTokenAndAuthorization, createController);

//DELETE
router.route("/:id").delete(verifyTokenAndAuthorization, deleteUser);

//GET USER
router.route("/find/:id").get(verifyTokenAndAdmin, findUser);

//GET ALL USER
router.route("/").get(verifyTokenAndAdmin, findAllUser);

//GET USER STATS

router.route("/stats").get(verifyTokenAndAdmin, findUserStats);

module.exports = router;
