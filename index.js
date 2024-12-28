const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const cookieParser = require("cookie-parser");







// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const api = process.env.API_URL;
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
app.use(cookieParser());


const Cate = require("./routes/BestinnCatepost");
const Mainpost = require("./routes/maniPost")


app.use('/categories', Cate);
app.use('/mainpost', Mainpost);

const PORT = process.env.PORT || 4000;



mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Mongo is ready");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}  http://localhost:4000`);
});
