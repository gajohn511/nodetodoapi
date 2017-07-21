var { MongoClient, ObjectID } = require("mongodb");
var obj = new ObjectID();

var url = "mongodb://127.0.0.1:27017/TodoApp";

MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log("Unable to connect to mongo server", err);
  }

  console.log("Connected to MongoDB Server");

  var users = db.collection("Users");

  users
    .findOneAndUpdate(
      {
        _id: new ObjectID("596e859c13542a4450481e6a")
      },
      {
        $set: {
          name: "Sid"
        },
        $inc: {
          age: 2
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(res => {
      console.log(JSON.stringify(res, undefined, 3));
    });

  // delete many
  //   users.deleteMany({ name: "Jonathan" }).then(res => {
  //     console.log(JSON.stringify(res, undefined, 3));
  //   });
});
