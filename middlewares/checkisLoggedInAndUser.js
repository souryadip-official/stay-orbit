const checkisLoggedInAndUser = (req, res, next) => {
  if (req.url === "/" || req.url === "/contact-us") return next();
  else if (!req.session.isLoggedIn) return res.redirect("/auth/login");
  const user = req.session?.user;
  if (user && user.userType !== "guest") return res.redirect("/");
  return next();
};

module.exports = checkisLoggedInAndUser;
