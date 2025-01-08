const StaticSeo = require("../../models/staticScoModel");
const path = require("path");
const fs = require("fs");

//========================================================================== Add Static SEO Page Controller Function
const addStaticSeoPage = (req, res) => {
  const message = req.session.message || null;
  req.session.message = null;
  res.render("admin-ui/addSeo.ejs", { message });
};

//========================================================================== Add Static SEO Controller Function
const addStaticSeo = async (req, res) => {
  try {
    const { seoTitle, seoKeyword, seoDescription, pageType } = req.body;

    // Validate that pageType is provided and valid
    if (
      !pageType ||
      ![
        "home",
        "about",
        "contact",
        "clients",
        "Plugs & Sockets",
        "blogs",
      ].includes(pageType)
    ) {
      req.session.message = {
        type: "danger",
        message:
          "Invalid Page Type provided. Please choose between 'home', 'about', or 'contact'.",
      };
      return res.redirect("/admin/add-seo");
    }

    const staticSeo = new StaticSeo({
      seoTitle,
      seoKeyword,
      seoDescription,
      pageType,
    });

    await staticSeo.save();

    req.session.message = {
      type: "success",
      message: "Static SEO added successfully!",
    };

    res.redirect("/admin/all-seo");
  } catch (err) {
    console.error("Error adding Static SEO:", err.message);
    req.session.message = {
      type: "danger",
      message: "An error occurred while adding Static SEO. Please try again.",
    };
    res.redirect("/admin/add-seo");
  }
};

//========================================================================== All Static SEO Controller Function
const allStaticSeo = async (req, res) => {
  try {
    const staticSeo = await StaticSeo.find();

    res.render("admin-ui/allSeo.ejs", {
      staticSeo,
      message: req.session.message || null,
    });

    req.session.message = null;
  } catch (err) {
    console.error("Error fetching Static SEOs:", err.message);
    req.session.message = {
      type: "danger",
      message:
        "An error occurred while retrieving Static SEOs. Please try again.",
    };
    res.redirect("/admin");
  }
};

//========================================================================== Update Static SEO Page Controller Function
const updateStaticSeoPage = async (req, res) => {
  try {
    const staticSeo = await StaticSeo.findById(req.params.id);

    if (!staticSeo) {
      req.session.message = {
        type: "danger",
        message: "Static SEO not found.",
      };
      return res.redirect("/admin/all-seo");
    }

    res.render("admin-ui/updateSeo.ejs", { staticSeo });
  } catch (err) {
    console.error("Error fetching Static SEO:", err.message);
    req.session.message = {
      type: "danger",
      message: "An error occurred. Please try again.",
    };
    res.redirect("/admin/all-seo");
  }
};

//========================================================================== Update Static SEO Controller Function
const updateStaticSeo = async (req, res) => {
  try {
    const { id } = req.params;
    const { seoTitle, seoKeyword, seoDescription, pageType } = req.body;

    // Validate that pageType is provided and valid
    if (
      !pageType ||
      ![
        "home",
        "about",
        "contact",
        "clients",
        "Plugs & Sockets",
        "blogs",
      ].includes(pageType)
    ) {
      req.session.message = {
        type: "danger",
        message:
          "Invalid Page Type provided. Please choose between 'home', 'about', or 'contact'.",
      };
      return res.redirect(`/admin/update-seo/${id}`);
    }

    await StaticSeo.findByIdAndUpdate(id, {
      seoTitle,
      seoKeyword,
      seoDescription,
      pageType,
    });

    req.session.message = {
      type: "success",
      message: "Static SEO updated successfully!",
    };

    res.redirect("/admin/all-seo");
  } catch (err) {
    console.error("Error updating Static SEO:", err.message);
    req.session.message = {
      type: "danger",
      message: "An error occurred while updating Static SEO. Please try again.",
    };
    res.redirect("/admin/all-seo");
  }
};

//========================================================================== Delete Static SEO Controller Function
const deleteStaticSeo = async (req, res) => {
  try {
    const { id } = req.params;

    const staticSeo = await StaticSeo.findById(id);

    if (!staticSeo) {
      req.session.message = {
        type: "danger",
        message: "Static SEO not found.",
      };
      return res.redirect("/admin/all-seo");
    }

    await StaticSeo.findByIdAndDelete(id);

    req.session.message = {
      type: "success",
      message: "Static SEO deleted successfully!",
    };

    res.redirect("/admin/all-seo");
  } catch (err) {
    console.error("Error deleting Static SEO:", err.message);
    req.session.message = {
      type: "danger",
      message: "An error occurred while deleting Static SEO. Please try again.",
    };
    res.redirect("/admin/all-seo");
  }
};

//========================================================================== Exporting Controller Functions
module.exports = {
  addStaticSeoPage,
  addStaticSeo,
  allStaticSeo,
  updateStaticSeoPage,
  updateStaticSeo,
  deleteStaticSeo,
};
