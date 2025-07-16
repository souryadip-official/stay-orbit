const path = require("path");
const fs = require("fs");

const home = require("../models/home");
const user = require("../models/user");

const addHome = (req, res, next) => {
  res.status(200);
  res.render(path.join(__dirname, "../views/host/list-home.ejs"), {
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

const submitHome = (req, res, next) => {
  console.log(req.body);

  console.log(req.file?.path);

  const newHome = new home({
    email: req.session.user.email,
    homename: req.body?.homename,
    contactdetails: req.body?.contactdetails,
    location: req.body?.location,
    price: req.body?.price,
    ac_service: req.body?.ac_service,
    description: req.body?.description,
    image:
      req.file?.path ||
      "https://cdn.pixabay.com/photo/2020/05/25/13/41/chalet-5218666_1280.png",
  });
  console.log(newHome);
  newHome
    .save()
    .then(() => {
      console.log("Home saved successfully!");
      res.status(200);
      res.render(path.join(__dirname, "../views/host/submit-response.ejs"), {
        home: newHome,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log("Error is:", err);
      res
        .status(404)
        .render(path.join(__dirname, "../views/error/custom-error.ejs"), {
          message: err,
          isLoggedIn: req.session.isLoggedIn,
          user: req.session.user,
        });
    });
};

const editHostHome = (req, res, next) => {
  home
    .findById(req.params.home_id)
    .then((matchedHome) => {
      if (matchedHome) {
        if (matchedHome.email !== req.session.user.email) {
          return res.redirect("/host/home-lists");
        }
        res
          .status(200)
          .render(path.join(__dirname, "../views/host/edit-home.ejs"), {
            home: matchedHome,
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user,
          });
      } else {
        console.log("Such home does not exists!");
        res
          .status(404)
          .render(path.join(__dirname, "../views/error/notFound.ejs"), {
            path: req.url,
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user,
          });
      }
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      return res
        .status(404)
        .render(path.join(__dirname, "../views/error/notFound.ejs"), {
          path: req.url,
          isLoggedIn: req.session.isLoggedIn,
          user: req.session.user,
        });
    });
};

const updateHostHome = (req, res, next) => {
  const { homename, contactdetails, location, price, ac_service, description } =
    req.body;
  const image = req.file?.path;
  home
    .findById(req.params.home_id)
    .then((updatedHome) => {
      if (updatedHome) {
        if (updatedHome.email !== req.session.user.email) {
          return res.redirect("/host/home-lists");
        }
        (updatedHome.homename = homename),
          (updatedHome.contactdetails = contactdetails);
        updatedHome.location = location;
        updatedHome.price = price;
        updatedHome.ac_service = ac_service;
        updatedHome.description = description;
        if (image && image.trim() !== "") {
          fs.unlink(updatedHome.image, (err) => {
            if (err) console.log("Error deleting the old file!", err);
          });
          updatedHome.image = image.replace(/\\/g, "/");
        }
        updatedHome
          .save()
          .then(() => {
            return res
              .status(200)
              .render(
                path.join(__dirname, "../views/host/submit-response.ejs"),
                {
                  home: updatedHome,
                  isLoggedIn: req.session.isLoggedIn,
                  user: req.session.user,
                }
              );
          })
          .catch((err) => {
            console.log("Error while saving updated home", err);
            return res
              .status(500)
              .render(path.join(__dirname, "../views/error/custom-error.ejs"), {
                message:
                  "An error occurred while saving your updated home details.",
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user,
              });
          });
      } else {
        return res
          .status(404)
          .render(path.join(__dirname, "../views/error/custom-error.ejs"), {
            message: `We're unable to find the home you requested to update!`,
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user,
          });
      }
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      return res
        .status(404)
        .render(path.join(__dirname, "../views/error/notFound.ejs"), {
          path: req.url,
          isLoggedIn: req.session.isLoggedIn,
          user: req.session.user,
        });
    });
};

const deleteHostHome = async (req, res, next) => {
  const homeId = req.params.home_id;
  await home.findById(homeId).then((matchedHome) => {
    if (matchedHome) {
      if (matchedHome.email !== req.session.user.email) {
        return res.redirect("/host/home-lists");
      }
    }
  });
  const deletedHome = await home.findByIdAndDelete(homeId).catch((err) => {
    console.log("Could not find home to delete", err);
    return null;
  });
  if (!deletedHome) {
    return res
      .status(404)
      .render(path.join(__dirname, "../views/error/custom-error.ejs"), {
        message: "We're unable to find the home you requested to delete!",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
  }
  await user
    .updateMany({ favorites: homeId }, { $pull: { favorites: homeId } })
    .then(() => {
      console.log("Home deleted and removed from all users' favorites!");
    })
    .catch((err) => {
      console.log("Home deleted but error while updating favorites:", err);
    });
  return res.redirect("/host/home-lists");
};

const getHostHomes = (req, res, next) => {
  res.status(200);
  home
    .find({ email: req.session.user.email })
    .then((listedHomes) => {
      res.render(path.join(__dirname, "../views/host/host-home-list.ejs"), {
        listedHomes: listedHomes,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => console.log("Error fetching host homes:", err));
};

module.exports = {
  addHome: addHome,
  submitHome: submitHome,
  getHostHomes: getHostHomes,
  editHostHome: editHostHome,
  updateHostHome: updateHostHome,
  deleteHostHome: deleteHostHome,
};
