var Visit = require("../models/stats").Visit;

module.exports = {
  //Save a new visit.
  newVisit: function(ip, page){
    var v = new Visit();
    v.visit.ip = "127.0.0.1";
    v.visit.page = "index";
    v.save((err) => {
      if(err){
        console.log("ERROR");
        throw err;
      }
      console.log("HI");
      return "Hello";
    });
    console.log("HI2");
  }
}
