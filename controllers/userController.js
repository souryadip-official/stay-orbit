const path = require("path");
const home = require("../models/home");
const user = require("../models/user");

const getIndexHomelist = (req, res, next) => {
  res.status(200);
  home
    .find()
    .then((listedHomes) => {
      console.log(listedHomes);
      res.render(path.join(__dirname, "../views/store/index-homelist.ejs"), {
        listedHomes: listedHomes,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => console.log("Error loading files:", err));
};

const getHome = (req, res, next) => {
  res.status(200);
  home
    .find()
    .then((listedHomes) => {
      res.render(path.join(__dirname, "../views/store/main-home.ejs"), {
        listedHomes: listedHomes,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => console.log("Error loading files:", err));
};

const contactUs = (req, res, next) => {
  res.status(200);
  res.render(path.join(__dirname, "../views/store/contact-us.ejs"), {
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

const getHomeWithId = (req, res, next) => {
  home
    .findById(req.params.home_id)
    .then((matchedHome) => {
      console.log(matchedHome);
      if (matchedHome) {
        return res
          .status(200)
          .render(path.join(__dirname, "../views/store/home-detail.ejs"), {
            home: matchedHome,
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user,
          });
      } else {
        return res
          .status(404)
          .render(path.join(__dirname, "../views/error/notFound.ejs"), {
            path: req.url,
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user,
          });
      }
    })
    .catch((err) => {
      console.log(`Error fetching details of ${req.params.home_id}: ${err}`);
      return res
        .status(404)
        .render(path.join(__dirname, "../views/error/notFound.ejs"), {
          path: req.url,
          isLoggedIn: req.session.isLoggedIn,
          user: req.session.user,
        });
    });
};

const addToFavorites = async (req, res, next) => {
  console.log("Add to Favorite request received for home", req.params.home_id);
  const currUserId = req.session.user._id;
  const currUser = await user.findById(currUserId);
  if(currUser.favorites.includes(req.params.home_id)) {
    console.log('Home is already added to favorites!');
  } else {
    currUser.favorites.push(req.params.home_id);
  await currUser.save();
  }
  return res.redirect('/favorites');
};

const removeFromFavorites = async (req, res, next) => {
  console.log("Delete from Favorite request received for home", req.params.home_id);
  const currUserId = req.session.user._id;
  const currUser = await user.findById(currUserId);

  if(!currUser.favorites.includes(req.params.home_id)) {
    console.log("Home is not in the favorites!");
  } else {
    const newFavs = currUser.favorites.filter(homeid => homeid.toString() !== req.params.home_id);
    currUser.favorites = newFavs;
    await currUser.save();
  }
  return res.redirect('/favorites');
};


const getFavorites = async (req, res, next) => {
  const currUserId = req.session.user._id;
  const currUserFavs = await user.findById(currUserId).populate('favorites');
  return res.render(path.join(__dirname, "../views/store/favorite-list.ejs"), {
    favoriteHomes: currUserFavs.favorites,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};


module.exports = {
  getHome: getHome,
  contactUs: contactUs,
  getFavorites: getFavorites,
  getIndexHomelist: getIndexHomelist,
  getHomeWithId: getHomeWithId,
  addToFavorites: addToFavorites,
  removeFromFavorites: removeFromFavorites,
};
