const mg = require("mongoose");
const url = "mongodb://127.0.0.1:27017/TodoApp";
mg.connect(url);
mg.Promise = global.Promise;

module.exports = {
  mg
};
