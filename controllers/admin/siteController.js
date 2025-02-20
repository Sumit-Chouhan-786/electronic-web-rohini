const SiteSetting = require("../../models/siteSettingModel");
const path = require("path");
const fs = require("fs");

//======================================================================== Render Site Settings page
const siteSettingsPage = async (req, res) => {
  try {
    const settings = await SiteSetting.findOne();
    res.render("admin-ui/siteSetting.ejs");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading site settings.");
  }
};

//======================================================================== Render the page to display current Site Settings (GET)
const siteSettingsDisplayPage = async (req, res) => {
  try {
    // Fetch site settings from the database
    const settings = await SiteSetting.findOne();

    if (!settings) {
      // If no settings are found, show a message and redirect
      req.session.message = {
        type: "error",
        message: "No site settings found.",
      };
      return res.redirect("/admin/site-setting"); 
    }

    // Render the display page with settings
    res.render("admin-ui/allSiteSetting.ejs", {
      title: "Current Site Settings",
      settings,
    });
  } catch (err) {
    console.error("Error loading site settings:", err);

    // Send a clear error message with proper HTTP status code
    res.status(500).send("Error loading site settings.");
  }
};

//======================================================================== Add Site Setting
const addSiteSetting = async (req, res) => {
  try {
    const siteSettingData = {
      email: req.body.email,
      address: req.body.address,
      number: req.body.number,
      alterNumber: req.body.alterNumber,
      whatsappNumber: req.body.whatsappNumber,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      telegram: req.body.telegram,
      youtube: req.body.youtube,
      linkedin: req.body.linkedin,
      location: req.body.location,
      logo: req.file ? req.file.filename : undefined, // Ensure file handling
    };

    // Check if a site setting already exists
    const existingSetting = await SiteSetting.findOne();

    if (existingSetting) {
      // Update the existing site setting
      await SiteSetting.updateOne({}, siteSettingData);
      req.session.message = {
        type: "success",
        message: "Site setting updated successfully!",
      };
    } else {
      // Create a new site setting
      await SiteSetting.create(siteSettingData);
      req.session.message = {
        type: "success",
        message: "Site setting added successfully!",
      };
    }

    res.redirect("/admin/site-setting-display");
  } catch (err) {
    console.error(err);
    req.session.message = {
      type: "error",
      message: "Error adding/updating site setting.",
    };
    res.redirect("/admin/site-setting");
  }
};

//======================================================================== Update Site Setting (PATCH)
const updateSiteSetting = async (req, res) => {
  try {
    const id = req.params.id;

    let newLogo = "";
    if (req.file) {
      newLogo = req.file.filename;

      // Delete the old logo if it exists
      const setting = await SiteSetting.findById(id);
      if (setting && setting.logo) {
        const oldLogoPath = path.join(
          __dirname,
          "../../",
          "uploads",
          setting.logo
        );
        try {
          fs.unlinkSync(oldLogoPath);
        } catch (err) {
          console.error("Error deleting old logo:", err);
        }
      }
    }

    const updatedData = {
      email: req.body.email,
      address: req.body.address,
      number: req.body.number,
      alterNumber: req.body.alterNumber,
      whatsappNumber: req.body.whatsappNumber,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      telegram: req.body.telegram,
      youtube: req.body.youtube,
      linkedin: req.body.linkedin,
      location: req.body.location,
      ...(req.file && { logo: newLogo }), // Include new logo only if uploaded
    };

    // Update the site setting
    await SiteSetting.findByIdAndUpdate(id, updatedData, { new: true });

    req.session.message = {
      type: "success",
      message: "Site setting updated successfully!",
    };
    res.redirect("/admin/site-setting-display");
  } catch (err) {
    console.error(err);
    req.session.message = {
      type: "error",
      message: "Error updating site setting.",
    };
    res.redirect("/admin/site-setting");
  }
};

module.exports = {
  siteSettingsPage,
  siteSettingsDisplayPage,
  addSiteSetting,
  updateSiteSetting,
};
