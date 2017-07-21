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

  var todos = db.collection("Todos");

  // delete many
  //   todos.deleteMany({ text: "eat lunch" }).then(res => {
  //     console.log(JSON.stringify(res, undefined, 3));
  //   });

  // delete one
  //   todos.deleteOne({ text: "eat lunch" }).then(res => {
  //     console.log(JSON.stringify(res, undefined, 3));
  //   });

  // find one and delete
  //   todos.findOneAndDelete({ completed: false }).then(resp => {
  //     console.log(JSON.stringify(resp, undefined, 3));
  //   });

  //   collection.count(
  //     {
  //       name: "Jonathan"
  //     },
  //     (err, cnt) => {
  //       if (err) {
  //         return console.log("Unable to perform count in Users", err);
  //       }

  //       console.log(`The count is ${cnt}, and the objectid: ${obj}`);
  //     }
  //   );

  //   db.close();
});
