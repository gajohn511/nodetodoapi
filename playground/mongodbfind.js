// const mc = require("mongodb").MongoClient;
var { MongoClient, ObjectID } = require("mongodb");
var obj = new ObjectID();
// console.log(MongoClient);

var url = "mongodb://127.0.0.1:27017/TodoApp";

MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB Server", err);
  }

  console.log("Connected to MongoDB Server");

  var collection = db.collection("Users");

  collection.count(
    {
      name: "Jonathan"
    },
    (err, cnt) => {
      if (err) {
        return console.log("Unable to perform count in Users", err);
      }

      console.log(`The count is ${cnt}, and the objectid: ${obj}`);
    }
  );

  //   db.collection("Todos").find({}).count().then(
  //     cnt => {
  //       console.log(`Todos count: ${cnt}`);
  //     },
  //     err => {
  //       console.log("Unable to perform a cursor count", err);
  //     }
  //   );

  //   db.collection("Users").insertOne({
  //     name: "Jonathan",
  //     age: 25,
  //     location: "33009",
  //     insertedAt: "7/18/2017 ~ 6pm"
  //   }, (err, res) => {
  //     if (err) {
  //       return console.log("Unable to insert into Users", err);
  //     }

  //     console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 3));
  //   });

  //   db.close();
});
