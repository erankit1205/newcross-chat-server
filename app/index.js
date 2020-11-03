const express = require("express");
const mongoose = require("mongoose");
const authenticate = require("./helpers/authenticate")

const authController  = require("./controllers/auth-controller");
const messageController  = require("./controllers/message-controller");

const BASE_URL = "/app/v1";

const PORT = process.env.NODE_ENV || 3000;

require("../env-dev");

mongoose.connect(`mongodb://mongodb/messagedb`, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
    console.log('MongoDB is connected');
  })
    .catch( function(err) {
    console.log("Not connected to mongo",err);
  });

let app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

let authenticateUser = (req, res, next) => {
  if(req._parsedUrl.pathname === BASE_URL + '/login') {
      next();
  } else {
      authenticate.verify(req, res, next);
  }
}
app.use(authenticateUser);

app.use(`${BASE_URL}/login`, authController);
app.use(`${BASE_URL}/message`, messageController);

module.exports = app;