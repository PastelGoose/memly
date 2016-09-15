var Story = require('./storyModel').storyModel;

var createAndSaveNewStory = function(req, res) {
  // Create new instance of Story and save to database
  var newStory = new Story();
  newStory.userId = req.session.passport.user._id;
  newStory.username = req.session.passport.user.name.split(' ')[0];
  newStory.avatarUrl = req.session.passport.user.profilePhotoUrl;
  newStory.storyTitle = req.body.storyTitle;
  newStory.visits = 1;
  newStory.createdDate = new Date();
  newStory.pages = req.body.pages;
  newStory.caption = req.body.caption;
  
  // search DB to find and attach memly ID and location?
  // Async forEach without Promises:
  var pagesLength = newStory.pages.length;
  var pagesProcessed = 0;

  if (pagesLength !== 0) {

    newStory.pages.forEach(function(page) {
      pagesProcessed++;

      //do stuff

      if (pagesProcessed === pagesLength) {
        newStory.save();        
      }

    });
  } else {
    console.log('No Pages!');
  }


};

exports.createAndSaveNewStory = createAndSaveNewStory;

// POST
// "{
//   storyTitle: String,
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
// var storySchema = new Schema({

//   userId: String,
//   username: String,
//   avatarUrl: String,
//   storyTitle: String,
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
