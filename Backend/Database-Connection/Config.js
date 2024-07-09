const mongoose = require("mongoose");

const URI = process.env.SERVER_LINK;

//const URI = process.env.CON_URL

const DBConnection = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database Connected")
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = DBConnection