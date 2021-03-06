const express = require("express");
const app = express();
const registerRoute = require("./Routers/login/login");
const postsRoute = require("./Routers/posts/posts_route");
const getRoute = require('./Routers/posts/get_route')
const followRoute = require("./Routers/follow/follow");
const main = require("./Routers/main");
const bodyParser = require("body-parser");
//Cros Error
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//For Enviornment
const dotenv = require("dotenv");
dotenv.config();

// BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//MonogoDB Atlas connection
const mongoose = require("mongoose");
mongoose.connect(
  process.env.ATLAS,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("DB connected");
  }
);
mongoose.connection.on("error", (err) => {
  console.log(err);
});

//Middlewears for Registrations
app.use("/register/", registerRoute);
app.use("/api/post", postsRoute);
app.use("/api/get", getRoute)

//Middlewears After Registrations
app.use("/main/", main);
app.use("/users/", followRoute);
//Others
app.listen(process.env.PORT || 8000, console.log("Server runnng "));
