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
  },
  seoKeywords: {
    type: String,
  },
  seoDescription: {
    type: String,
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


