var Journey = require('./journeyModel').journeyModel;
var Memly = require('../memly/model').memlyModel;

var createAndSaveNewJourney = function(req, cb) {
  // Create new instance of Journey and save to database
  var newJourney = new Journey();
  
  newJourney.userId = req.session.passport.user._id;
  newJourney.avatarUrl = req.session.passport.user.profilePhotoUrl;
  newJourney.username = req.session.passport.user.name.split(' ')[0];
  
  // newJourney.username = 'HR47_EXTREME';
  // newJourney.userId = 'asdfasdfasdf12341234';
  // newJourney.avatarUrl = 'AVATAR URL';

  newJourney.journeyTitle = req.body.journeyTitle;
  newJourney.visits = 0;
  newJourney.createdDate = new Date();
  newJourney.pages = req.body.pages;
  
  // search DB to find and attach memly ID and location?
  // Async forEach without Promises:
  var pagesLength = newJourney.pages.length;
  var pagesProcessed = 0;

  if (pagesLength !== 0) {

    newJourney.pages.forEach(function(page, index) {
      
      Memly.findOne({'media.url': page.imgUrl}, function(err, result) {
        if (err) {
          pagesProcessed++;
          console.log('there was an error inside journeyUtils: ', err);
        } else {

          // console.log('setting location');
          // newJourney.pages[index].memlyId = 'fakeid with index' + index;
          // newJourney.pages[index].location = {lat: index + 100, lng: index + 50};

          //console.log('testing with dummy data without auth......');
          //console.log(index);
          //console.log('newJourney.pages is: ', newJourney.pages);
          newJourney.pages[index].memlyId = result._id;
          newJourney.pages[index].location = {lat: result.location.lat, lng: result.location.lng};
          pagesProcessed++;

          if (pagesProcessed === pagesLength) {
            //console.log('======= newJourney save triggered', newJourney);
            newJourney.save();
            cb();
          }
        }
      });

    });
  } else {
    console.log('No Pages!');
  }

  // newJourney.save();
  // cb();
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
