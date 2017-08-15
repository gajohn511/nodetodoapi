//const mocha = require("mocha");
const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");
const { ObjectID } = require("mongodb");


beforeEach(done => {
  Todo.remove({}).then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    var text = "test todo text";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(r => {
            expect(r.length).toBe(1);
            expect(r[0].text).toBe(text);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should NOT create a todo document", done => {
    request(app).post("/todos").send({}).expect(400).end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find()
        .then(r => {
          expect(r.length).toBe(0);
          done();
        })
        .catch(err => done(err));
    });
  });
});



const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo"
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
  }
];

describe("PATCH /todos/:id", () => {
  it("should update the todo", done => {
    let hexid = todos[0]._id.toHexString();
    let hexid2 = "598f16ed5808fbbd623fb094";
    let text = "this should be the new text";

    request(app)
      .patch(`/todos/${hexid2}`)
      .send({
        completed: true,
        text: text
      })
      .expect(200)
      .expect(res => {
        // console.log(JSON.stringify(res.body, undefined, 3));
        expect(res.body.text).toBe(text);
        expect(res.body.completed).toBe(true);
        expect(res.body.completedAt).toBeA("number");
      })
      .end(done);
  });

  // it("should clear completedAt when todo is not completed", done => {
  //   //
  // });
});
