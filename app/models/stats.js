var mongoose = require("mongoose");

var VisitSchema = mongoose.Schema({
  visit: {
    ip: {
      type: 'String',
       required: true
    },
    page: {
      type: 'String',
       required: true
     }
  }
});

var visitModel = mongoose.model('Visit', VisitSchema);
var Visit = mongoose.model('Visit');

module.exports = {
  Visit: Visit
};
