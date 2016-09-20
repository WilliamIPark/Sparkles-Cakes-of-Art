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
  addRef(req.get('Referrer'), "index");
});

app.get('/about', function(req,res){
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname+'/app/about.html'));

  //Adds to visit count. Unique visits only.
  addVisitor(req, "about");

  //Adds a the referring URL.
  addRef(req.get('Referrer'), "about");
});

app.get('/gallery', function(req,res){
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname+'/app/gallery.html'));

  //Adds to visit count. Unique visits only.
  addVisitor(req, "gallery");

  //Adds a the referring URL.
  addRef(req.get('Referrer'), "gallery");
});

app.get('/palate', function(req,res){
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname+'/app/palate.html'));

  //Adds to visit count. Unique visits only.
  addVisitor(req, "palate");

  //Adds a the referring URL.
  addRef(req.get('Referrer'), "palate");
});

app.get('/stats', function(req, res) {
  res.render('stats', data);
});

//Adds referrals for stats page.
function addRef(url, page) {
  if(data.referrers[page][url] == null) {
    data.referrers[page][url] = 1;
    return true;
  }
  else {
    data.referrers[page][url]++;
    return true;
  }
}

function addVisitor(req, page) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if(data.visits[page].indexOf(ip) == -1) {
    data.visits[page].push(ip);
    return true;
  }
  return false;
}

app.listen(80, function () {
  console.log('Server running on port 80.');
});
