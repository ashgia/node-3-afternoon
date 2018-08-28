const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const port = 3001;

//middleware
const checkForSession = require("./middlewares/checkForSession");
//controllers
const swag_controller = require("./controllers/swag_controller");
const auth_controller = require("./controllers/auth_controller");

const app = express();

app.use(json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);

//swag
app.get("/api/swag", swag_controller.read);

//auth
app.post("/api/login", auth_controller.login);
app.post("/api/register", auth_controller.register);
app.post("/api/signout", auth_controller.signout);
app.get("/api/user", auth_controller.getUser);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
