// const mc = require("mongodb").MongoClient;
var { MongoClient } = require("mongodb");

// console.log(MongoClient);

var url = "mongodb://127.0.0.1:27017/TodoApp";

MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB Server", err);
  }

  console.log("Connected to MongoDB Server");
  db.collection("Users").insertOne({
    name: "Jonathan",
    age: 25,
    location: "33009",
    insertedAt: "7/18/2017 ~ 6pm"
  }, (err, res) => {
    if (err) {
      return console.log("Unable to insert into Users", err);
    }

    console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 3));
  });

  db.close();
});

// mc.connect("mongodb://127.0.0.1:27017/TodoApp", (err, db) => {
//   if (err) {
//     console.log("Unable to connect to MongoDB Server");
//   }

//   console.log("Connected to MongoDB Server");

//   db.collection("Todos").insertOne({
//     text: "Something to do 7182017",
//     completed: false
//   }, (err, result) => {
//     if (err) {
//       return console.log("Unable to insert todo record", err);
//     }

//     console.log(JSON.stringify(result.ops, undefined, 3));
//   });

//   db.close();
// });
