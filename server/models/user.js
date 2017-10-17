const mg = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

var UserSchema = new mg.Schema({
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

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  return _.pick(obj, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = "auth";
  var token = jwt
    .sign({ _id: user._id.toHexString(), access }, "abc123")
    .toString();
  user.tokens.push({ access, token });
  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, "abc123");
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  }).then(thisuser => {
    return thisuser;
  });
};

UserSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    console.log("password was modified -> hashing password...");
    bcrypt.hash(user.password, 10, (err, hash) => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

var User = mg.model("user", UserSchema);

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
