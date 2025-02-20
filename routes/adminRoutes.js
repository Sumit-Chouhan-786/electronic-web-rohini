const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");
const adminController = require("../controllers/admin/authController");
const sliderController = require("../controllers/admin/sliderController");
const blogController = require("../controllers/admin/blogController");
const {
  deleteAppointment,
} = require("../controllers/admin/appoinmentController");
const imageGalleryController = require("../controllers/admin/imageGalleryController");
const staticSeoController = require("../controllers/admin/staticSeoController");
const pagesController = require("../controllers/admin/pagesController");
const serviceController = require("../controllers/admin/servicesController");
const testimonialController = require("../controllers/admin/testimonialController");
const aboutController = require("../controllers/admin/aboutController");
const videoGalleryController = require("../controllers/admin/videoGalleryController");
const siteSettingController = require("../controllers/admin/siteController");
const teamController = require("../controllers/admin/teamController");
const {
  getAllAppointmentForIndex,
} = require("../controllers/admin/appoinmentController");

//============================================================================== Public Routes
router.get("/signup", adminController.renderSignUp);
router.post("/signup", adminController.handleSignUp);

router.get("/login", adminController.renderLogin);
router.post("/login", adminController.handleLogin);

//============================================================================== Apply `isAuthenticated` middleware to all routes
// This applies to all routes after this point
router.use(adminController.checkAdminAuth);

//============================================================================== Protected Routes
router.get("/dashboard", adminController.renderDashboard);
router.get("/update", adminController.renderUpdate);
router.post("/update", adminController.handleUpdatePassword);

router.get("/logout", adminController.handleLogout);

//========================================================= Site settings
router.get("/site-setting", siteSettingController.siteSettingsPage);
router.get(
  "/site-setting-display",
  siteSettingController.siteSettingsDisplayPage
);

router.post(
  "/site-setting",
  upload.single("logo"),
  siteSettingController.addSiteSetting
);

router.patch(
  "/site-setting/:id",
  upload.single("logo"),
  siteSettingController.updateSiteSetting
);

//================================================= Slider routes
router.get("/add-slider", sliderController.addSliderPage);
router.post(
  "/add-slider",
  upload.single("sliderImage"),
  sliderController.addSlider
);
router.get("/all-slider", sliderController.allSlidersPage);
router.get("/update-slider/:id", sliderController.updateSliderPage);
router.post(
  "/update-slider/:id",
  upload.single("sliderImage"),
  sliderController.updateSlider
);
router.get("/delete-slider/:id", sliderController.deleteSlider);

//================================================================= Services routes start
// Add Service
router.get("/add-service", serviceController.addServicePage);
router.post(
  "/add-service",
  upload.single("image"),
  serviceController.addService
);

// Update Service
router.get("/update-service/:id", serviceController.updateServicePage);
router.post(
  "/update-service/:id",
  upload.single("image"),
  serviceController.updateService
);

// Delete Service
router.get("/delete-service/:id", serviceController.deleteService);

// All Services
router.get("/all-services", serviceController.allServices);
//================================================================= Services routes end

// ==================================================================Pages routes start
router.get("/add-page", pagesController.addPageView);
router.post("/add-page", upload.single("pageImage"), pagesController.addPage);
router.get("/update-page/:id", pagesController.updatePageView);
router.post(
  "/update-page/:id",
  upload.single("pageImage"),
  pagesController.updatePage
);
router.get("/all-pages", pagesController.allPages);
router.get("/delete-page/:id", pagesController.deletePage);
// ==================================================================Pages routes end

//====================================================================== Testimonials routes start
router.get("/add-testimonial", testimonialController.addTestimonialPage);
router.post(
  "/add-testimonial",
  upload.single("testimonialImage"),
  testimonialController.addTestimonial
);
router.get(
  "/update-testimonial/:id",
  testimonialController.updateTestimonialPage
);
router.post(
  "/update-testimonial/:id",
  upload.single("testimonialImage"),
  testimonialController.updateTestimonial
);
router.get("/delete-testimonial/:id", testimonialController.deleteTestimonial);
router.get("/all-testimonial", testimonialController.allTestimonials);
//====================================================================== Testimonials routes end

//====================================================================== images gallery routes start
router.get("/add-image-gallery", imageGalleryController.addGalleryImagePage);
router.post(
  "/add-image-gallery",
  upload.single("galleryImage"),
  imageGalleryController.addGalleryImage
);
router.get(
  "/update-image-gallery/:id",
  imageGalleryController.updateGalleryImagePage
);
router.post(
  "/update-image-gallery/:id",
  upload.single("galleryImage"),
  imageGalleryController.updateGalleryImage
);
router.get("/all-image-gallery", imageGalleryController.allGalleryImagesPage);
router.get(
  "/delete-image-gallery/:id",
  imageGalleryController.deleteGalleryImage
);
//====================================================================== images gallery routes end
router.get("/add-video-gallery", videoGalleryController.addVideoGalleryPage);
router.get("/all-video-gallery", videoGalleryController.allVideoGalleryPage);

//============================================================================== enquire routes start

router.get("/enquire", async (req, res) => {
  try {
    const enquire = await getAllAppointmentForIndex();

    res.render("admin-ui/allEnquire", { enquire });
  } catch (err) {
    console.error("Error fetching data for the enquire page:", err);
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the page. Please try again later.",
    });
  }
});
router.get("/deleteAppointments/:id", deleteAppointment);
//============================================================================== enquire routes end

//========================================================================= blogs routes start
router.get("/add-blog", blogController.addBlogPage);
router.post("/add-blog", upload.single("blogImage"), blogController.addBlog);
router.get("/update-blog/:id", blogController.updateBlogPage);
router.post(
  "/update-blog/:id",
  upload.single("blogImage"),
  blogController.updateBlog
);
router.get("/delete-blog/:id", blogController.deleteBlog);
router.get("/all-blogs", blogController.allBlogs);
//========================================================================= blogs routes end
//======================================================================= team routes start
router.get("/add-team", teamController.addTeamPage);
router.post("/add-team", upload.single("teamImage"), teamController.addTeam);
router.get("/update-team/:id", teamController.updateTeamPage);
router.post(
  "/update-team/:id",
  upload.single("teamImage"),
  teamController.updateTeam
);
router.get("/delete-team/:id", teamController.deleteTeam);
router.get("/all-team", teamController.allTeams);
//======================================================================= team routes end
//================================================================== add about routes start
// Add About Routes
router.get("/add-about", aboutController.addAboutPage);
router.post(
  "/add-about",
  upload.single("aboutImage"),
  aboutController.addAbout
);
router.get("/update-about/:id", aboutController.updateAboutPage);
router.post(
  "/update-about/:id",
  upload.single("aboutImage"),
  aboutController.updateAbout
);
router.get("/delete-about/:id", aboutController.deleteAbout);
router.get("/all-about", aboutController.allAbout);
//================================================================== add about routes end

//================================================================ Add StaticSeo Routes start
router.get("/add-seo", staticSeoController.addStaticSeoPage);
router.post("/add-seo", staticSeoController.addStaticSeo);
router.get("/update-seo/:id", staticSeoController.updateStaticSeoPage);
router.post("/update-seo/:id", staticSeoController.updateStaticSeo);
router.get("/delete-seo/:id", staticSeoController.deleteStaticSeo);
router.get("/all-seo", staticSeoController.allStaticSeo);
//================================================================ Add StaticSeo Routes end

module.exports = router;
