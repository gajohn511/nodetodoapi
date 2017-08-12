var { Todo } = require("./../server/models/todo");
var { User } = require("./../server/models/user");
var { mg } = require("./../server/db/db");
var { ObjectID } = require("mongodb");

var id = "596eecd78b84694888be4ff4";

// Todo.remove({}).then(result => {
//   console.log(result.result);
// });

Todo.findByIdAndRemove("598e6bc55808fbbd623fa164").then(thistodo => {
  console.log(thistodo);
});
