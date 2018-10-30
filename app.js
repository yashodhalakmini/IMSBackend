const express = require('express');
const bodyParser = require('body-parser');
// const path = require("path");
// const routes = require("./routes.js");
const mongoose = require("mongoose");
// var session = require("express-session");
// var cookieParser = require("cookie-parser");
// var setUpPassport = require("./setuppassport");
// var passport = require("passport");
var admin_inventoryService = require("./services/admin_inventoryService");
var user_inventoryService = require("./services/user_inventoryService");
var hallService = require("./services/hallService");
var authService=require("./services/authenticationService");
var userService = require("./services/user-service")



const app = express();
// setUpPassport();


mongoose.connect("mongodb://localhost:27017/plain");

//setting the default view engine of the app

// app.set("views", [
//     path.resolve(__dirname, "views"),
//     path.resolve(path.join(__dirname, "views"), "partials"),
//     path.resolve(path.join(__dirname, "views"), "user"),
//     path.resolve(path.join(__dirname, "views"), "admin"),
// ]);

// app.set("view engine", "ejs");

//serving the static files
// app.use(express.static(path.resolve(__dirname, "public")));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json());

// app.use(session({
//     secret: "hi",
//     saveUninitialized: false,
//     resave: false,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

//setting the routes


// app.use(routes);

app.use("/api/authenticate",authService);
app.use("/api/users",userService)
app.use("/api/inventory", admin_inventoryService);
app.use("/api/userinventory", user_inventoryService);
app.use("/api/hall", hallService);




app.listen(4000, function () {
    console.log("App is listning on port 4000")
    // console.log(path.resolve(path.join(__dirname,"views")));
});