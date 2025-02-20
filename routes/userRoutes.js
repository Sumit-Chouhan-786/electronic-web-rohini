const express = require("express");
const router = express.Router();
const getAllTeamsForAbout = require("../controllers/admin/teamController");
const getAllServicesIndex = require("../controllers/admin/servicesController");
const getAllTestimonialsForIndex = require("../controllers/admin/testimonialController");
const getAllBlogsForIndex = require("../controllers/admin/blogController");
const getAllSliderIndex = require("../controllers/admin/sliderController");
const getAllAboutForIndex = require("../controllers/admin/aboutController");
const {allGalleryClient} = require("../controllers/admin/imageGalleryController");
const { createAppointment } = require("../controllers/admin/appoinmentController");

// Route to fetch and render all services for the index page
router.get("/", async (req, res) => {
  try {
    // Fetch services and testimonials asynchronously
    const services = await getAllServicesIndex.getAllServicesIndex();
    const about = await getAllAboutForIndex.getAllAboutForIndex();
    const teams = await getAllTeamsForAbout.getAllTeamsForAbout();
    const testimonials =
      await getAllTestimonialsForIndex.getAllTestimonialsForIndex();
    const blogs = await getAllBlogsForIndex.getAllBlogsForIndex();
    const sliders = await getAllSliderIndex.getAllSliderIndex();

    // Render the index page with fetched data
    res.render("user-ui/index", {
      services,
      about,
      testimonials,
      blogs,
      sliders,
      teams,
    });
  } catch (err) {
    console.error("Error fetching data for the index page:", err);

    // Render an error page with a friendly message
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the page. Please try again later.",
    });
  }
});
router.post("/", createAppointment);



// Route to fetch and render details for a specific service
router.get("/blog-details/:id", async (req, res) => {
  try {
    const blogId = req.params.id; // Extract the service ID from the URL
    const blogs = await getAllBlogsForIndex.getAllBlogsForIndex();
    const blog = await getAllBlogsForIndex.getBlog(blogId); // Fetch specific service by ID

    if (!blog) {
      // Handle case where no service is found
      console.error(`blog with ID ${blogId} not found.`);
      return res.status(404).render("error", {
        title: "blog Not Found",
        message: "The requested service details could not be found.",
      });
    }

    // Render the service-details page with the fetched service data
    res.render("../views/user-ui/blog-details.ejs", { blog, blogs });
  } catch (err) {
    console.error("Error fetching blog details:", err.message);

    // Handle server error
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the blog details. Please try again later.",
    });
  }
});

// Route to fetch and render details for a specific service
router.get("/service-details/:id", async (req, res) => {
  try {
    const allServices = await getAllServicesIndex.getAllServicesIndex();
    const serviceId = req.params.id; // Extract the service ID from the URL
    const service = await getAllServicesIndex.getService(serviceId); // Fetch specific service by ID

    if (!service) {
      // Handle case where no service is found
      console.error(`Service with ID ${serviceId} not found.`);
      return res.status(404).render("error", {
        title: "Service Not Found",
        message: "The requested service details could not be found.",
      });
    }

    console.log("Service Details:", service, allServices);

    // Render the service-details page with the fetched service data
    res.render("../views/user-ui/service-details.ejs", {
      service,
      allServices,
    });
  } catch (err) {
    console.error("Error fetching service details:", err.message);

    // Handle server error
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the service details. Please try again later.",
    });
  }
});

router.get("/about", async (req, res) => {
  try {
    const about = await getAllAboutForIndex.getAllAboutForIndex();
    res.render("../views/user-ui/about.ejs", { about });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching about deta.");
  }
});
router.get("/team-details/:id", async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await getAllTeamsForAbout.getTeam(teamId);

    if (!team) {
      // Handle case where no team is found
      console.error(`Team with ID ${teamId} not found.`);
      return res.status(404).render("error", {
        title: "Team Not Found",
        message: "The requested team details could not be found.",
      });
    }

    console.log("Team Details:", team);

    // Render the team-details page with the fetched team data
    res.render("../views/user-ui/team-details.ejs", { team });
  } catch (err) {
    console.error("Error fetching team details:", err.message);

    // Render an error page for unexpected server errors
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the team details page. Please try again later.",
    });
  }
});
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await getAllBlogsForIndex.getAllBlogsForIndex();

    res.render("user-ui/blog", { blogs });
  } catch (err) {
    console.error("Error fetching data for the blog page:", err);
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the page. Please try again later.",
    });
  }
});

// Route to display the contact page (appointment form)
router.get("/contact", async (req, res) => {
  try {
    // Fetch doctors (teams) and services
    const [teams, services] = await Promise.all([
      getAllTeamsForAbout.getAllTeamsForAbout(),
      getAllServicesIndex.getAllServicesIndex(),
    ]);

    // Render the contact page with the services and teams data
    res.render("user-ui/contact", {
      title: "Book an Appointment",
      teams: teams,
      services: services,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching doctors and services.");
  }
});

router.post("/contact", createAppointment);


router.get("/adult-cardiac-disease", async (req, res) => {
  try {
    // Fetch services and testimonials asynchronously
    const services = await getAllServicesIndex.getAllServicesIndex();

    // Render the index page with fetched data
    res.render("user-ui/adult-cardiac-disease", { services });
  } catch (err) {
    console.error("Error fetching data for the index page:", err);

    // Render an error page with a friendly message
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the page. Please try again later.",
    });
  }
});

router.get("/pediatric-cardiac-disease", async (req, res) => {
  try {
    // Fetch services and testimonials asynchronously
    const services = await getAllServicesIndex.getAllServicesIndex();

    // Render the index page with fetched data
    res.render("user-ui/pediatric-cardiac-disease", { services });
  } catch (err) {
    console.error("Error fetching data for the index page:", err);

    // Render an error page with a friendly message
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the page. Please try again later.",
    });
  }
});
router.get("/cardiac-arrhythmia", async (req, res) => {
  try {
    // Fetch services and testimonials asynchronously
    const services = await getAllServicesIndex.getAllServicesIndex();

    // Render the index page with fetched data
    res.render("user-ui/cardiac-arrhythmia", { services });
  } catch (err) {
    console.error("Error fetching data for the index page:", err);

    // Render an error page with a friendly message
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the page. Please try again later.",
    });
  }
});
router.get("/heart-failure", async (req, res) => {
  try {
    // Fetch services and testimonials asynchronously
    const services = await getAllServicesIndex.getAllServicesIndex();

    // Render the index page with fetched data
    res.render("user-ui/heart-failure", { services });
  } catch (err) {
    console.error("Error fetching data for the index page:", err);

    // Render an error page with a friendly message
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the page. Please try again later.",
    });
  }
});

router.get("/teams", async (req, res) => {
  try {
    // Fetch services and testimonials asynchronously
    const teams = await getAllTeamsForAbout.getAllTeamsForAbout();

    // Render the index page with fetched data
    res.render("user-ui/teams", { teams });
  } catch (err) {
    console.error("Error fetching data for the index page:", err);

    // Render an error page with a friendly message
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the page. Please try again later.",
    });
  }
});
router.get("/clients", async (req, res) => {
  try {
    // Fetch services and testimonials asynchronously
    const clients = await allGalleryClient();

    // Render the index page with fetched data
    res.render("user-ui/clients", { clients });
  } catch (err) {
    console.error("Error fetching data for the index page:", err);

    // Render an error page with a friendly message
    res.status(500).render("error", {
      title: "Error",
      message:
        "An error occurred while loading the page. Please try again later.",
    });
  }
});

router.get("/policy",(req,res)=>{
  res.render("user-ui/privacy.ejs");
});


module.exports = router;
