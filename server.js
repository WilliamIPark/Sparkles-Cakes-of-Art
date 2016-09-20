//Require Express
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');

var visits = {
  index: 1,
  about: 1,
  gallery: 1,
  menu: 1
};

var data = {
  visits: {
    index: 1,
    about: 1,
    gallery: 1,
    menu: 1
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
  res.sendFile(path.join(__dirname+'/app/index.html'));
  console.log('Index Visits: ' + data.visits.index++);
  //__dirname : It will resolve to your project folder.

  //Adds a the referring URL.
  addRef(req.get('Referrer'), "index");
});

app.get('/about', function(req,res){
  res.sendFile(path.join(__dirname+'/app/about.html'));
  console.log('About Visits: ' + data.visits.about++);
  //__dirname : It will resolve to your project folder.

  //Adds a the referring URL.
  addRef(req.get('Referrer'), "about");
});

app.get('/gallery', function(req,res){
  res.sendFile(path.join(__dirname+'/app/gallery.html'));
  console.log('Gallery Visits: ' + data.visits.gallery++);
  //__dirname : It will resolve to your project folder.

  //Adds a the referring URL.
  addRef(req.get('Referrer'), "gallery");
});

app.get('/palate', function(req,res){
  res.sendFile(path.join(__dirname+'/app/palate.html'));
  console.log('Palate Visits: ' + data.visits.menu++);
  //__dirname : It will resolve to your project folder.

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
    console.log("data.referrers[" + page + "][" + url + "] = " + data.referrers[page][url]);
    return true;
  }
  else {
    data.referrers[page][url]++;
    console.log("data.referrers[" + page + "][" + url + "] = " + data.referrers[page][url]);
    return true;
  }
}

app.listen(80, function () {
  console.log('Server running on port 80.');
});
