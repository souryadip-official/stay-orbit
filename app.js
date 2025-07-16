const express = require("express");
const path = require("path");
const multer = require("multer");

const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const session = require("express-session");

const connectMongoSession = require("connect-mongodb-session");
const mongoSession = connectMongoSession(session);
const sessionStore = new mongoSession({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

const hostRoutes = require("./routes/hostRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const unknownPathHandler = require("./routes/unknownPathHandler");
const checkIsLoggedInAndHost = require("./middlewares/checkLoggedInAndHost");
const checkisLoggedInAndUser = require("./middlewares/checkisLoggedInAndUser");
const { default: mongoose } = require("mongoose");

const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use(express.static(path.join(__dirname, "./public")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(express.urlencoded());

const { storage } = require('./utils/cloudinary');
app.use(multer({ storage }).single("image"));

app.use("/auth", authRoutes);
app.use("/host", checkIsLoggedInAndHost, hostRoutes);
app.use("/", checkisLoggedInAndUser, userRoutes);
app.use(unknownPathHandler);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo client connection received");
    app.listen(PORT, () => {
      console.log("Server is live at PORT 5000");
    });
  })
  .catch((err) => console.log("Failed to connect to Mongo"));
