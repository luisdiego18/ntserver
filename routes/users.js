const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

// GET/me
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// GET
router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// POST
router.post("/", async (req, res) => {
  // Joi validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already register.");

  // Lodash
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // JWT
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
