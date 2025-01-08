// utils/SiteSettingData.js
const SiteSetting = require("../models/siteSettingModel");
const Service = require("../models/serviceModel");
const StaticSeo = require("../models/staticScoModel");
const SiteSettingData = async () => {
  try {
    const siteSettings = await SiteSetting.find();
    return siteSettings;
  } catch (err) {
    console.error("Error fetching site site setting:", err.message);
    throw err;
  }
};

const AllServicesData = async () => {
  try {
    const services = await Service.find();
    return services;
  } catch (err) {
    console.error("Error fetching services:", err.message);
    throw err;
  }
};
const AllStaticSeo = async () => {
  try {
    const seo = await StaticSeo.find();
    return seo;
  } catch (err) {
    console.error("Error fetching seo:", err.message);
    throw err;
  }
};

module.exports = { AllServicesData, SiteSettingData, AllStaticSeo };
