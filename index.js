'use strict';

var express = require('express');
var compression = require('compression');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var responseTime = require('response-time');
var serveFavicon = require('serve-favicon');
var url = require('url');

var app = express();
//listen port expressjs
var port = process.env.PORT||8081;

app.use(responseTime({
  digits: 4
})); //make this the first middleware

app.use(compression({
  threshold: 1
}));

app.use(logger(':method :url :status :res[content-length] - :response-time ms'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var favIconFile = path.join(__dirname, 'static-assets', 'rogue.ico');

console.log('middle-ware section');

app.use(
  serveFavicon(
    favIconFile, {
      maxAge: '1m'
    }
  )
);

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use('/vendor', express.static(__dirname + '/static-assets'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/dist'));

/*redirect 404 to index.html */
app.use(function (req, res, next) {
  res.set({
    'Location': '/'
  });
  res.status(301);
  res.end();
});

/* final catch all */

app.use(function (err, req, res, next) {
  if (err) {
    console.log(JSON.stringify(err));
    res.set({
      "X-Error": JSON.stringify(err)
    });
    res.status(500).send({
      error: JSON.stringify(err)
    });
  }
});

app.listen(port, function () {
  console.log('The server is running at port:', port);
});

process.on('SIGINT', function () {
  console.log("Caught [SIGINT] interrupt signal");
  process.exit(0);
});
