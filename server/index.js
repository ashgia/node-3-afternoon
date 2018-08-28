const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const port = 3001;

//middleware
const checkForSession = require("./middlewares/checkForSession");
//controllers
const swag_controller = require("./controllers/swag_controller");

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

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
