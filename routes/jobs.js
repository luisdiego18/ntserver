const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Job, validate } = require("../models/job");
const express = require("express");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
});

// GET/:id
router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.send(job);
});

// POST
router.post("/", async (req, res) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
  });
  await job.save();

  res.send(job);
});

// PUT
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, description: req.body.description },
    { new: true }
  );

  if (!job)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(job);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const job = await Job.findByIdAndRemove(req.params.id);

  if (!job) return res.status(404).send("The job with the given ID is found");

  res.send(job);
});

module.exports = router;
