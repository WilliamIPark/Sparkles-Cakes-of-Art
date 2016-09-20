//Require Express
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');

var data = {
  visits: {
    index: [],
    about: [],
    gallery: [],
    palate: []
  },
  referrers: {
    index: {},
    about: {},
    gallery: {},
    palate: {}
  }
}

//Set view engine as pug/jade
app.set('views', './app/views')
app.set('view engine', 'pug');

//Serve favicon
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));

//Serve the static assets from the public/ directory.
app.use(express.static(path.join(__dirname, 'public/')));

//Routing

app.get('/', function(req,res){
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname+'/app/index.html'));

  //Adds to visit count. Unique visits only.
  addVisitor(req, "index");

  //Adds a the referring URL.
  addRef(req, req.get('Referrer'), "index");
});

app.get('/about', function(req,res){
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname+'/app/about.html'));

  //Adds to visit count. Unique visits only.
  addVisitor(req, "about");

  //Adds a the referring URL.
  addRef(req, req.get('Referrer'), "about");
});

app.get('/gallery', function(req,res){
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname+'/app/gallery.html'));

  //Adds to visit count. Unique visits only.
  addVisitor(req, "gallery");

  //Adds a the referring URL.
  addRef(req, req.get('Referrer'), "gallery");
});

app.get('/palate', function(req,res){
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname+'/app/palate.html'));

  //Adds to visit count. Unique visits only.
  addVisitor(req, "palate");

  //Adds a the referring URL.
  addRef(req, req.get('Referrer'), "palate");
});

app.get('/stats', function(req, res) {
  res.render('stats', data);
});

//Adds referrals for stats page.
function addRef(req, url, page) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if(data.referrers[page][url] == null) {
    data.referrers[page][url] = [];
    data.referrers[page][url].push(ip);
    data.referrers[page][url].sort();
    return true;
  }
  else {
    if(data.referrers[page][url].indexOf(ip) == -1) {
      data.referrers[page][url].push(ip);
      data.referrers[page][url].sort();
      return true;
    }
    return false;
  }
}

//Adds new visitors and checks they're unique by IP address.
function addVisitor(req, page) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if(data.visits[page].indexOf(ip) == -1) {
    data.visits[page].push(ip);
    data.visits[page].sort();
    return true;
  }
  return false;
}

app.listen(80, function () {
  console.log('Server running on port 80.');
});
