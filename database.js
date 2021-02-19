require('dotenv').config();
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);

mongoose.set("useUnifiedTopology", true);

mongoose.set("useFindAndModify", false);

class Database {

    constructor() {
        this.connect();
    }


    connect() {
        const stringConnection = `mongodb+srv://${process.env.USER}:${process.env.PWD}@${process.env.CLUSTER}.fdkmb.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
        mongoose.connect(stringConnection)
        .then(() => {
            console.log("Database connection succesful! ✔");
        })
        .catch((err) => {
            console.log(`Database connection error: ${err}! ❌`);
        });
    }
}

module.exports = new Database();