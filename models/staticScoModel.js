const mongoose = require("mongoose");

const staticSeo = new mongoose.Schema(
  {
    seoTitle: {
      type: String,
    },
    seoKeyword: {
      type: String,
    },
    seoDescription: {
      type: String,
    },
    pageType: {
      type: String,
      enum: ["home", "about", "contact", "clients", "Plugs & Sockets","blogs"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StaticSeo", staticSeo);
