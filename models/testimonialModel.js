const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    seoTitle: {
      type: String,
    },
    seoKeywords: {
      type: String,
    },
    seoDescription: {
      type: String,
    },
    testimonialImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("testimonial", testimonialSchema);
