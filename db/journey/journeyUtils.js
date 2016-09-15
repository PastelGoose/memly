var Journey = require('./journeyModel').journeyModel;
var Memly = require('../memly/model').memlyModel;

var createAndSaveNewJourney = function(req, cb) {
  // Create new instance of Journey and save to database
  console.log('-----req.body', req.body);
  var newJourney = new Journey();
  //newJourney.userId = req.session.passport.user._id;
  //newJourney.username = req.session.passport.user.name.split(' ')[0];
  //newJourney.avatarUrl = req.session.passport.user.profilePhotoUrl;
  newJourney.journeyTitle = req.body.journeyTitle;
  newJourney.visits = 1;
  newJourney.createdDate = new Date();
  newJourney.pages = req.body.pages;
  newJourney.caption = req.body.caption;
  
  // search DB to find and attach memly ID and location?
  // Async forEach without Promises:
  var pagesLength = newJourney.pages.length;
  var pagesProcessed = 0;

  // if (pagesLength !== 0) {

  //   newJourney.pages.forEach(function(page, index) {
  //     pagesProcessed++;

  //     //do stuff
  //     Memly.findOne({'media.url': page.imgUrl}, function(err, result) {
  //       if (err) {
  //         console.log('there was an error inside journeyUtils: ', err);
  //       } else {
  //         newJourney.pages[index].memlyId = result._id;
  //         newJourney.pages[index].location = {lat: result.location.lat, lng: result.location.lng};
  //       }
  //     });

  //     if (pagesProcessed === pagesLength) {
  //       newJourney.save();
  //       cb();
  //     }

  //   });
  // } else {
  //   console.log('No Pages!');
  // }

  newJourney.save();
  cb();
};

exports.createAndSaveNewJourney = createAndSaveNewJourney;

// POST
// "{
//   journeyTitle: String,
//   pages: [
//     {
//       order: Number,
//       imgUrl: String,
//       caption: String
//     },
//     {
//       order: Number,
//       imgUrl: String,
//       caption: String
//     }
//   ]

// }"

// GET
// var journeySchema = new Schema({

//   userId: String,
//   username: String,
//   avatarUrl: String,
//   journeyTitle: String,
//   visits: Number,
//   createdDate: Date,
//   pages: [{
//     order: Number,
//     memlyId: String,
//     imgUrl: String,
//     location: {
//       lat: Number,
//       lng: Number
//     },
//     caption: String
//   }]
// });
