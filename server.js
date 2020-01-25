const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const models = require('./models');
const routes = require("./routes");



app.use(logger('dev'));
// Define middleware here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
  key: 'user_sid',
  secret: 'something',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

models.sequelize.sync().then(function()
{console.log('Nice! Database looks fine');
}).catch(function(err){
    console.log(err, 'Something went wrong with the Database Update!');
});
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user){
    res.clearCookie('user_sid');
  }
  next();
})

sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid){
    res.status(200).send({ inSession: true});
  } else {
    next();
  }
}

app.get('/api', sessionChecker, (req, res) => {
  res.status(200).send({ inSession: false });
});

app.get('/api/hello', (req, res) => {
  res.status(200).send({ backMsg: 'Express App Works' });
});
