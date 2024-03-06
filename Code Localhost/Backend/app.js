const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const User = require("./models/User");

const port = 5000;
const MONGO_URI =
  "mongodb+srv://taikhoan2609:matkhau2609@asm-03.jag7lpr.mongodb.net/";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.CLIENT,
      process.env.ADMIN,
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(express.json());

// Khai bao SESSION
const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "secretcode",
    store: store,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   secure: true,
    //   httpOnly: true,
    // sameSite: "none",
    //   domain: process.env.DOMAIN || "localhost",
    // },
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id).then((user) => {
    req.user = user;

    next();
  });
});

// Routes
const authRoute = require("./routes/authRoute");
const homeRoute = require("./routes/homeRoute");
const shopRoute = require("./routes/shopRoute");
const adminRoute = require("./routes/adminRoute");

app.use("/auth", authRoute);
app.use("/shop", shopRoute);
app.use("/admin", adminRoute);
app.get("/", homeRoute);

mongoose
  .connect(MONGO_URI)
  .then((data) => {
    app.listen(process.env.PORT || port);
  })
  .catch((err) => {
    res.redirect("/500");
  });
