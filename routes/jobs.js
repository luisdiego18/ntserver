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

// POST
router.post("/", async (req, res) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
  });
  await job.save();

  res.send(job);
});

// DELETE
router.delete("/:id", [auth, admin], async (req, res) => {
  const job = await Job.findByIdAndRemove(req.params.id);

  if (!job) return res.status(404).send("The job with the given ID is found");

  res.send(job);
});

module.exports = router;
