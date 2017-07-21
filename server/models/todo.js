const mg = require("mongoose");

var Todo = mg.model("Todo", {
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false,
    required: false
  },
  completedAt: {
    type: Number
  }
});

module.exports = { Todo };

// var td2 = new Todo({
//   text: "wash my underwear",
//   completed: false
// });

// td2.save().then(res => {
//   console.log("Saved td2", res);
// });

// var newTodo = new Todo({
//   text: "Cook Dinner"
// });

// newTodo
//   .save()
//   .then(res => {
//     console.log("Saved todo", res);
//   })
//   .catch(err => {
//     console.error("Unable to save todo", err);
//   });
