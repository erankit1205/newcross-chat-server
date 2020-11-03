const express = require("express");
const mongoose = require("mongoose");

const authController  = require("./controllers/auth-controller");
const BASE_URL = "/app/v1";

const PORT = process.env.NODE_ENV || 3000;

require("../env-dev");

mongoose.connect(`mongodb://localhost:27017/messagedb`, { useNewUrlParser: true, useUnifiedTopology: true }).then( function() {
    console.log('MongoDB is connected');
  })
    .catch( function(err) {
    console.log("Not connected to mongo",err);
  });

let app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
});

app.use(`${BASE_URL}/login`, authController);