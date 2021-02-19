const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);

mongoose.set("useUnifiedTopology", true);

mongoose.set("useFindAndModify", false);

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://admin:admin@twitterclonecluster.fdkmb.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority")
        .then(() => {
            console.log("Database connection succesful! ✔");
        })
        .catch((err) => {
            console.log(`Database connection error: ${err}! ❌`);
        });
    }
}

module.exports = new Database();