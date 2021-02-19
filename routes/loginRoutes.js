const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const User = require("../schema/UserSchema");
const bcrypt = require("bcrypt");

app.set("view engine", "pug");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (request, response, next) => {
    response.status(200).render("login");
});

router.post("/", async (request, response, next) => {

    const payload = request.body;

    if(request.body.logUsername && request.body.logPassword){
        const user = await User.findOne({
            $or: [
                { username: request.body.logUsername },
                { email: request.body.logPassword }
            ]
        })
        .catch((err) => {
            console.log(err);
            payload.errorMessage = "Something went wrong!";
            response.status(200).render("login", payload);
        });

        if(user != null) {
            const result = await bcrypt.compare(request.body.logPassword, user.password);

            if(result === true) {
                request.session.user = user;
                return response.redirect("/");
            }
        }

        payload.errorMessage = "Login credentials incorrect!";
        response.status(200).render("login", payload);
    }

    payload.errorMessage = "Make sure each field has a valid value!";
    response.status(200).render("login");
});

module.exports = router;