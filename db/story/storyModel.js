var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({
  userId: String,
  storyTitle: String,
  visits: Number,
  createdDate: Date,
  pages: [{
    pageOrder: Number,
    memlyId: String,
    imgUrl: String,
    location: {
      lat: Number,
      lng: Number
    },
    caption: String
  }]
});

exports.storyModel = mongoose.model('Story', storySchema);
