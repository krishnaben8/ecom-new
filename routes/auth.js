const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  const inputPassword = req.body.password;

  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user && res.status(401).json("Wrong User Name");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword != inputPassword && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "30d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Forget password
router.get("/forgetPassword", async (req, res) => {
 
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
   if(!user.email){ res.status(401).json("Wrong email address")}
     res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//change password
router.post ("/changePassword",async (req,res) => {
  try {
    const user=await UserId.findById({
      user:req.body.userId,
      $set:req.body.password
    });
    if(req.res.password){
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
    
  } catch(err) {
    res.status(500).json(err);
  }
  })



module.exports = router;
