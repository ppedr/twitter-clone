const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../schema/UserSchema");
const app = express();
const router = express.Router();

app.set("view engine", "pug");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (request, response, next) => {
    response.status(200).render("register");
});

router.post("/", async (request, response, next) => {

    const firstName = request.body.firstName.trim();
    const lastName = request.body.lastName.trim();
    const username = request.body.username.trim();
    const email = request.body.email.trim();
    const password = request.body.password;
    const payload = request.body;

    if (!(firstName && lastName && username && email && password)) {
        payload.errorMessage = "Make sure each field has a valid value!";
        response.status(200).render("register", payload);
    }
    else {
        const user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        .catch((err) => {
            console.log(err);
            payload.errorMessage = "Something went wrong!";
            response.status(200).render("register", payload);
        });

        if(user == null) {
            const data = request.body;

            data.password = await bcrypt.hash(password, 10);

            User.create(data)
            .then((user) => {
                request.session.user = user;
                return response.redirect("/");
            });
        }
        else {
            if(email == user.email) {
                payload.errorMessage = "Email already in user!";
            }
            else {
                payload.errorMessage = "Username already in user!";
            }
            response.status(200).render("register", payload);
        }

    }
    
    
});

module.exports = router;