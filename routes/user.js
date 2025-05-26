const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET user with id
router.get("/userid", async (req, res) => {
  try {
    const id = req.query;
    const users = await User.find({ _id: new mongoose.Types.ObjectId(id) });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST create user
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// PUT create user
router.put("/", async (req, res) => {
  const { id,name, email } = req.body;
  try {
    const {id, ...updates} = req.body;
    const newUser = await User.findOneAndUpdate({_id:new mongoose.Types.ObjectId(id)},{...updates});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// DELETE user by ID
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
