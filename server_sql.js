import express from "express";
import cors from "cors";
import { createConnection } from "mysql";

//initailising express
const app = express();
const myRouter = express.Router();

//intialising the connection object
const conn = createConnection({
  user: "root",
  password: "MySql@121",
  host: "localhost",
  database: "to_do_list",
});

//connecting to mysql database
conn.connect((err) => {
  if (err) {
    console.log("Serverjs: Error Occured while connecting to db", err);
  } else {
    console.log("Serverjs: Connection Successful");
  }
});

//setting routes for app using express router
myRouter.get("/", (req, res) => {
  res.send("<h1> Wecome to my To-DO App</h1>");
});

//endpoint for getting all the tasks
myRouter.get("/tasks", (req, res) => {
  const qry = "SELECT * FROM tasks";
  conn.query(qry, (err, result) => {
    if (err) {
      console.log("Serverjs: getting tasks: err", err);
      res.send(err);
    } else {
      // result.forEach(element => {
      //     console.log("Serverjs: getting tasks: id", element.id);
      //     console.log("Serverjs: getting tasks: task", element.task);
      // });
      res.send(result);
    }
  });
  //console.log("Serverjs: returning tasks", tasks);
  //res.send(tasks ? tasks : []);
});

//endpoint for adding the tasks
myRouter.post("/addTask", express.json(), (req, res) => {
  const task = req.body;
  if (task) {
    const taskId = task.id;
    const taskStr = task.task;
    const qry = "INSERT INTO tasks (id, task) VALUES (?, ?)";
    const tasks = conn.query(qry, [taskId, taskStr], (err, result) => {
      if (err) {
        console.log("Adding Task Error::", err);
      }
      console.log("Task Successfully added. here;s the result", result);
    });
  }
  res.send("Erorr: Empty Task");
});

//endpoint for adding the tasks
myRouter.post("/deleteTask", express.json(), (req, res) => {
  const task = req.body;
  if (task) {
    const taskId = task.id;
    const qry = "delete from tasks where id=?";
    conn.query(qry, [taskId], (err, result) => {
      if (err) {
        console.log("Deleting Task Error::", err);
        res.status(500).json({"err":err});
      } else {
        console.log("Task Successfully delted.", result);
        res.status(200).json({ "msg": "Success" });
      }
    });
  } else {
    res.status(400).json({"err": "Empty Task"});
  }
});

//setting up the middleware to handle cross-origin requests
app.use(cors());
//setting up the middleware to handle incoming requests by the router
app.use(myRouter);
//starting the server on port 5050
app.listen(5050, "localhost", () => console.log("Server started"));
