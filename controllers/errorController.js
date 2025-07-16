const path = require("path");

const handler404 = (req, res, next) => {
  res.status(404);
  res.render(path.join(__dirname, "../views/error/notFound.ejs"), {
    path: req.url,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};
module.exports = {
  handler404: handler404,
};
