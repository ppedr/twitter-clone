const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (request, response, next) => {
    
    if(request.session) {
        request.session.destroy(() => {
            response.redirect("/login");
        })
    }
});


module.exports = router;