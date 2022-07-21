const mongoose = require("mongoose");

module.exports = function () {
  const db =
    "mongodb+srv://admin:***@nicaragua-trabaja.rea55yc.mongodb.net/nicaragua-trabaja";
  mongoose
    .connect(db)
    .then(() => console.log("Connected to MongoDb"))
    .catch((error) => console.error("Connected to MongoDB"));
};
