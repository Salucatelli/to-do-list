//Imports
require("dotenv").config();
const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const connectToDb = require("./database/db");
const app = express();




connectToDb();
const PORT = process.env.PORT;





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);





//Server Run
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
