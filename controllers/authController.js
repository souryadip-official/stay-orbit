const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const path = require("path");

const user = require("../models/user");

const loginPage = (req, res, next) => {
  return res.render(path.join(__dirname, "../views/auth/login.ejs"), {
    isLoggedIn: false,
    message: "",
    user: {},
  });
};

const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  user
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .render(path.join(__dirname, "../views/auth/login.ejs"), {
            isLoggedIn: false,
            message: "User does not exist.",
            user: {},
          });
      }
      bcrypt.compare(password, user.password).then((isValid) => {
        if (isValid) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save((err) => {
            if (err) {
              console.log("Session save error:", err);
              return res.redirect("/auth/login");
            }
            return res.redirect("/");
          });
        } else {
          return res
            .status(401)
            .render(path.join(__dirname, "../views/auth/login.ejs"), {
              isLoggedIn: false,
              message: "Wrong password",
              user: {},
            });
        }
      });
    })
    .catch((err) => {
      console.log("Login Error", err);
      return res
        .status(500)
        .render(path.join(__dirname, "../views/error/custom-error.ejs"), {
          isLoggedIn: false,
          message: "Internal Server Error",
          user: {},
        });
    });
};

const registerPage = (req, res, next) => {
  return res.render(path.join(__dirname, "../views/auth/register.ejs"), {
    isLoggedIn: false,
    errors: [],
    oldInput: {},
    user: {},
  });
};

const postRegister = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must at least be 2 characters long!")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name should contain only alphabets!"),

  check("lastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last name if given, should contain only alphabets!"),

  check("email")
    .isEmail()
    .withMessage("Please enter valid email")
    .normalizeEmail(),

  check("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password must be 4 characters long!"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match!");
      }
      return true;
    }),
  check("userType")
    .notEmpty()
    .withMessage("Please select an user type.")
    .trim()
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions.")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),
  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newUser = new user({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            userType: userType,
            favorites: [],
          });
          return newUser.save();
        })
        .then(() => {
          console.log("User registered successfully!");
          res.redirect("/auth/login");
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(422)
            .render(path.join(__dirname, "../views/auth/register.ejs"), {
              isLoggedIn: false,
              errors: [err.message],
              oldInput: { firstName, lastName, email, password, userType },
              user: {},
            });
        });
    } else {
      return res
        .status(422)
        .render(path.join(__dirname, "../views/auth/register.ejs"), {
          isLoggedIn: false,
          errors: errors.array().map((err) => err.msg),
          oldInput: { firstName, lastName, email, password, userType },
          user: {},
        });
    }
  },
];

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/");
    else return res.redirect("/auth/login");
  });
};

module.exports = {
  loginPage: loginPage,
  postLogin: postLogin,
  registerPage: registerPage,
  postRegister: postRegister,
  logout: logout,
};
