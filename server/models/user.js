const mg = require("mongoose");
const validator = require("validator");

var User = mg.model("user", {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    unique: true,
    validate: {
      validator: v => {
        return validator.isEmail(v);
      },
      message: "{VALUE} is not a valid email!"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
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
