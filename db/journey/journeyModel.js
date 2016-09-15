var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var journeySchema = new Schema({
  userId: String,
  avatarUrl: String,
  username: String,
  journeyTitle: String,
  visits: Number,
  createdDate: Date,
  pages: [{
    order: Number,
    memlyId: String,
    imgUrl: String,
    location: {
      lat: Number,
      lng: Number
    },
    caption: String
  }]
});

exports.journeyModel = mongoose.model('Journey', journeySchema);
