const Joi = require("joi");
const mongoose = require("mongoose");

// Schema
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
});

// Model
const Job = mongoose.model("Job", jobSchema);

// Joi Validation
function validateJob(job) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(job, {
    abortEarly: false,
  });
}

exports.Job = Job;
exports.validate = validateJob;
