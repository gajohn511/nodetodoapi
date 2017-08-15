const mg = require("mongoose");
const url = process.env.MONGODB_URI;
mg.connect(url, { useMongoClient: true });
mg.Promise = global.Promise;

module.exports = {
  mg
};
