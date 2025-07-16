const checkIsLoggedInAndHost = (req, res, next) => {
  if (!req.session.isLoggedIn) res.redirect("/auth/login");
  else if (req.session?.user.userType !== "host") res.redirect("/");
  else next();
};

module.exports = checkIsLoggedInAndHost;
