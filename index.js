// index.js
// where your node app starts

// init project
require('dotenv').config();
const requestIp = require('request-ip');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const ipMiddleware = (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  next();
}

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(requestIp.mw());
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// get users ip, language, and software
app.get('/api/whoami', (req, res) => {
  const ipaddress = req.clientIp;
  const language = req.acceptsLanguages()[0];
  const software = req.get('User-Agent');

  res.json({
    ipaddress,
    language,
    software,
  })
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
