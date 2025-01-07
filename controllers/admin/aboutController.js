const About = require("../../models/aboutModel");
const path = require("path");
const fs = require("fs");

//========================================================================== Add About Controller Function
const addAbout = async (req, res) => {
  try {
    // Check if an image was uploaded
    if (!req.file) {
      req.session.message = {
        type: "danger",
        message: "Image upload failed. Please try again.",
      };
      return res.redirect("/admin/add-about");
    }

    // Create a new about entry
    const about = new About({
      heading: req.body.heading,
      description: req.body.description,
      seoTitle: req.body.seoTitle,
      seoKeywords: req.body.seoKeywords,
      seoDescription: req.body.seoDescription,
      aboutImage: req.file.filename,
      status: req.body.status || "active",
    });

    // Save the about entry to the database
    await about.save();

    req.session.message = {
      type: "success",
      message: "About added successfully!",
    };

    res.redirect("/admin/all-about");
  } catch (err) {
    console.error("Error adding about:", err.message);
    req.session.message = {
      type: "danger",
      message: "An error occurred while adding the about. Please try again.",
    };
    res.redirect("/admin/add-about");
  }
};

//========================================================================== Add About Page Controller Function
const addAboutPage = (req, res) => {
  const message = req.session.message || null;
  req.session.message = null; // Clear the session message after rendering
  res.render("admin-ui/addAbout.ejs", { message });
};

//========================================================================== All Abouts Controller Function
const allAbout = async (req, res) => {
  try {
    const about = await About.find();

    res.render("admin-ui/allAbout.ejs", {
      about, // Pass the about entries to the view
      message: req.session.message || null, // Display success/error messages
    });

    req.session.message = null; // Clear the session message
  } catch (err) {
    console.error("Error fetching about entries:", err.message);
    req.session.message = {
      type: "danger",
      message:
        "An error occurred while retrieving about entries. Please try again.",
    };
    res.redirect("/admin");
  }
};

//========================================================================== Update About Page Controller Function
const updateAboutPage = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      return res.status(404).json({ message: "About entry not found" });
    }

    res.render("admin-ui/updateAbout.ejs", {
      title: "Update About",
      about,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//========================================================================== Update About Controller Function
const updateAbout = async (req, res) => {
  const id = req.params.id;
  let new_image = "";

  try {
    if (req.file) {
      new_image = req.file.filename;

      // Delete the previous image if a new image is uploaded
      if (req.body.old_image) {
        const oldImagePath = "./uploads/" + req.body.old_image; // Ensure correct path
        try {
          fs.unlinkSync(oldImagePath); // Delete the old image
        } catch (err) {
          console.log("Error deleting old image:", err);
        }
      }
    } else {
      new_image = req.body.old_image;
    }

    await About.findByIdAndUpdate(id, {
      heading: req.body.heading,
      description: req.body.description,
      seoTitle: req.body.seoTitle,
      seoKeywords: req.body.seoKeywords,
      seoDescription: req.body.seoDescription,
      aboutImage: new_image,
      status: req.body.status || "active",
    });

    req.session.message = {
      type: "success",
      message: "About updated successfully!",
    };
    res.redirect("/admin/all-about");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
};

//========================================================================== Delete About Controller Function
const deleteAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res.status(404).send("About entry not found");
    }

    const imagePath = path.join(
      __dirname,
      "../../",
      "uploads",
      about.aboutImage
    );
    try {
      fs.unlinkSync(imagePath);
    } catch (err) {
      console.log("Error deleting image:", err);
    }

    await About.findByIdAndDelete(req.params.id);

    req.session.message = {
      type: "success",
      message: "About entry deleted successfully!",
    };
    res.redirect("/admin/all-about");
  } catch (err) {
    console.error(err);
    res.json({ message: err.message, type: "danger" });
  }
};

//========================================================================== Get All About Entries for Index
const getAllAboutForIndex = async () => {
  try {
    return await About.find();
  } catch (err) {
    throw new Error("Error fetching about entries");
  }
};

//========================================================================== Get Single About Entry
const getAbout = async (aboutId) => {
  try {
    return await About.findById(aboutId);
  } catch (err) {
    throw new Error("Error fetching about entry");
  }
};

//========================================================================== Exporting Controller Functions
module.exports = {
  addAbout,
  getAllAboutForIndex,
  getAbout,
  addAboutPage,
  allAbout,
  updateAbout,
  deleteAbout,
  updateAboutPage,
};
