const express = require("express");
const app = express();
const port = 3001;
const middleware = require("./middleware");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require("express-session");

app.listen(port, () => {
    console.log(`Server listening on port ${port}! ✔`);
});

app.set("view engine", "pug");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "french fries",
    resave: true,
    saveUninitialized: false
}));

// routes
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logout");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

app.get("/", middleware.requireLogin, (request, response, next) => {

    const payload = {
        pageTitle: "Home",
        userLoggedIn: request.session.user
    }

    response.status(200).render("home", payload);
});