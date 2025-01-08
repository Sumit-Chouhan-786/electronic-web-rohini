const mongoose = require("mongoose");

// Define the schema
const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
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
    category: {
      type: String,
      required: true,
      enum: [
        "Adult cardiac disease",
        "Pediatric Cardiac Disease",
        "Cardiac Arrhythmia",
        "Heart Failure",
      ],
    },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const MyModel = mongoose.model("Service", ServiceSchema);

module.exports = MyModel;
