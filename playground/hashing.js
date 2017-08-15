const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "123abc";

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log("hash1:", hash);
  });
});

bcrypt.hash(password, 10, function(err, hash) {
  console.log("hash2:", hash);
});

// var hash = "$2a$10$PsrPGj6UNFluWbPbBHdlU.CXhS7iAZpWJZYAGn51HRlVLkveZdNzO";
// bcrypt.compare("password!", hash, (err, res) => {
//   console.log(res);
// });

// var data = {
//   id: 10
// };

// var token = jwt.sign(data, "abc123");
// console.log(token);

// var decoded = jwt.verify(token, "abc1234");
// console.log("decoded:", decoded);

// var message = "I am number 3";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
