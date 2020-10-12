const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoute = require("./src/Routes/Auth");
const userRoute = require("./src/Routes/Users");
require("dotenv").config();

app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
    bodyParser.json(),
    
  );
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
