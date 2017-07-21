var { Todo } = require("./../server/models/todo");
var { User } = require("./../server/models/user");
var { mg } = require("./../server/db/db");
var { ObjectID } = require("mongodb");

var id = "596eecd78b84694888be4ff4";

User.findById(id, (e, r) => {
  if (e) {
    return console.error("issue performing findbyid");
  }

  if (!r) {
    return console.log("User not found!");
  }

  console.log(JSON.stringify(r, undefined, 3));
});

/* Find all Todos */
// Todo.find({}, (err, docs) => {
//   if (err) {
//     return console.log("Error finding Todos", err);
//   }

//   console.log(JSON.stringify(docs, undefined, 3));
// });

/* Insert many Todos Array */
// var todos = [
//   {
//     text: "have dinner"
//   },
//   {
//     text: "wash my feet"
//   }
// ];

// Todo.insertMany(todos).then(docs =>
//   console.log(JSON.stringify(docs, undefined, 3))
// );

/* Insert one Todo */
// var todo = new Todo({
//   text: "hello johnny"
// });

// todo
//   .save()
//   .then(docs => {
//     console.log(JSON.stringify(docs, undefined, 3));
//   })
//   .catch(err => console.log("Error saving array", err));

// Todo.find({}).then(res => {
//   console.log("found these todos", res);
// });
