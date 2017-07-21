const express = require("express");
const bodyParser = require("body-parser");

var { mg } = require("./db/db");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

var app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  // console.log(req.body);
  var todo = new Todo({ text: req.body.text });
  todo
    .save()
    .then(doc => {
      res.send(doc);
      console.log("I was here");
    })
    .catch(err => {
      // res.send("There was a problem");
      res.status(400).send(err);
    });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

module.exports = { app };
//mg.connect(url);
