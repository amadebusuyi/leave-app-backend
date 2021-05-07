const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser')

const app = express();

//Allow cross origin request
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());


/****************** PATHS ************************/

var indexRouter = require('./routes/index');

app.use('/', indexRouter);

/****************END OF PATHS*************************/


/*PATH NOT FOUND HANDLER*/

app.use(function(req, res, next){
  res.status(404);

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found', code: 404 });
    return;
  }

  res.type('txt').send('Not found');
});


// set port, listen for requests
var port = process.env.PORT || 7004;
app.listen(port, () => {
  console.log("Server is running on port "+port);
});

module.exports = app;