const config = require("config");
const cors = require("cors");
const express = require("express");
const app = express();

// Pending to move it from index
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

if (!config.get("jwtPrivateKey")) {
  throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
}

require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listing listening on ${port}`);
});
