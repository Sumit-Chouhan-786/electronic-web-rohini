const mongoose = require("mongoose");

const siteSettingSchema = new mongoose.Schema(
  {
    email: { type: String, },
    address: { type: String,  },
    number: { type: String, },
    alterNumber: { type: String },
    whatsappNumber: { type: String, required: false },
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    instagram: { type: String, required: false },
    telegram: { type: String, required: false },
    youtube: { type: String, required: false },
    linkedin: { type: String, required: false },
    location: { type: String, required: false },
    logo: { type: String, },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteSetting", siteSettingSchema);
