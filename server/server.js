require("./config/config");
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
var { ObjectID } = require("mongodb");

var { mg } = require("./db/db");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");
var { authenticate } = require("./middleware/authenticate");

var app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ msg: "Server is running" });
});

app.post("/todos", (req, res) => {
  // console.log(req.body);
  var todo = new Todo({ text: req.body.text });
  todo
    .save()
    .then(doc => {
      res.send(doc);
      // console.log("I was here");
    })
    .catch(err => {
      // res.send("There was a problem");
      res.status(400).send(err);
    });
});

app.get("/todos", (req, res) => {
  Todo.find({})
    .then(list => {
      res.status(200).send(list);
    })
    .catch(err => {
      return res.status(400).send(err);
    });
});

app.get("/todo/:id", (req, res) => {
  var id = req.params.id;

  // try {
  //   id = parseInt(req.params.id);
  // } catch (e) {
  //   return res
  //     .status(400)
  //     .send({ respond: "The provided id was not a number" });
  // }

  Todo.findById(id, (error, doc) => {
    if (error) {
      return res.status(400).send({ respond: `Todo was not found by ${id}` });
    }

    res.status(200).send(doc);
  });
});

app.delete("/todo/:id", (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id, (e, doc) => {
    if (e) {
      return res.status(404).send();
    }

    if (!doc) {
      return res.status(404).send();
    }

    res.status(200).send({ obj: doc });
  });
});

app.patch("/todo/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(thistodo => {
      if (!thistodo) {
        return res.status(404).send();
      }

      res.send(thistodo);
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.post("/users", (req, res) => {
  // var id = req.params.id;
  var body = _.pick(req.body, ["email", "password"]);
  // User.findOne()
  var newUser = new User(body);
  newUser
    .save()
    .then(() => {
      return newUser.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(newUser);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { app };
//mg.connect(url);
