const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const port = 3000;

//middleware
const checkForSession = require("./middlewares/checkForSession");
//controllers
const swag_controller = require("./controllers/swag_controller");
const auth_controller = require("./controllers/auth_controller");
const cart_controller = require("./controllers/cart_controller");
const search_controller = require("./controllers/search_controller");

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
app.use(express.static(`${__dirname}/build`));

//swag
app.get("/api/swag", swag_controller.read);

//auth
app.post("/api/login", auth_controller.login);
app.post("/api/register", auth_controller.register);
app.post("/api/signout", auth_controller.signout);
app.get("/api/user", auth_controller.getUser);

//cart
app.post("/api/cart", cart_controller.add);
app.post("/api/cart/checkout", cart_controller.checkout);
app.delete("/api/cart", cart_controller.delete);

//search
app.get("/api/search", search_controller.search);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
