const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const cookieParser = require("cookie-parser");
const portfinder = require('portfinder');






// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const api = process.env.API_URL;
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
app.use(cookieParser());


app.use((req, res, next) => {
  console.log(`Route called: ${req.method} ${req.originalUrl}`);
  next();
});

const Cate = require("./routes/BestinnCatepost");
const Mainpost = require("./routes/maniPost")


app.use('/categories', Cate);
app.use('/mainpost', Mainpost);

const PORT = process.env.PORT || 4005;



mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Mongo is ready");
  })
  .catch((err) => {
    console.log(err);
  });


portfinder.getPortPromise({ port: process.env.PORT || 4005 })
  .then((port) => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error finding an available port:', err);
  });