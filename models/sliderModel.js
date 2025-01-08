const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema(
  {
    sliderImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slider", sliderSchema);
