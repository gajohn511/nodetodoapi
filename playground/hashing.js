const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");

var data = {
  id: 10
};

var token = jwt.sign(data, "abc123");
// console.log(token);

var decoded = jwt.verify(token, "abc1234");
console.log("decoded:", decoded);

// var message = "I am number 3";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);