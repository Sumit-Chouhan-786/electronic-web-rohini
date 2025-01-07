const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  seoTitle: {
    type: String,
    required: true,
  },
  seoKeywords: {
    type: String,
    required: true,
  },
  seoDescription: {
    type: String,
    required: true,
  },
  aboutImage: {
    type: String,
    require:true
  },
  status: {
    type: String,
    enum: ["active", "deactive"],
    default: "active",
  },
 
}, { timestamps: true } );

module.exports = mongoose.model("About", aboutSchema);


