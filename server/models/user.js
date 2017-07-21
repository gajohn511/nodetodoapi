const mg = require("mongoose");

var User = mg.model("user", {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  }
});

module.exports = { User };

// var user = new User({
//   email: ""
// });

// user
//   .save()
//   .then(u => {
//     console.log("Saved user", u);
//   })
//   .catch(err => {
//     console.error("Unable to save user", err);
//   });
