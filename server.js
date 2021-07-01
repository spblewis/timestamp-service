// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// The timestamp api itself
app.get("/api/:date?", (req, res) => {

  // if date is undefined, set it to now
  if (!req.params.date) {
    req.params.date = Date.now();
  }

  // If date is a numerical string, convert to a number
  if (!isNaN(+req.params.date)) {
    req.params.date = +req.params.date;
  }

  // Convert to a date object
  const date = new Date(req.params.date);

  // Check validity, return json for either an error or a timestamp as expected
  if (date.toString() === "Invalid Date") {
    res.json({
      error: date.toString()
    })
  } else {
    res.json({
      unix: date.valueOf(), 
      utc: date.toUTCString()
    });
  } 
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

