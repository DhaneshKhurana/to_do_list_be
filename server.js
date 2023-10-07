import express from "express";
import store from "node-persist";
import cors from "cors";

//initailising express
const app = express();
const myRouter = express.Router();

//intialising the storage
store.init().then(() => {
  //clearing the storage, whenever server restrats
  store.clear().then(console.log("Storage cleared"));
});

//setting routes for app using express router
myRouter.get("/", (req, res)=> {res.send("<h1> Wecome to my To-DO App</h1>")});

//endpoint for getting all the tasks
myRouter.get("/tasks", async (req, res) => {
  const tasks = await store.getItem("tasks");
  console.log("server: tasks got from db::", tasks);
  res.send(tasks?tasks:[]);
});

//endpoint for getting all the tasks
myRouter.post("/addTask", express.json(), async (req, res) => {
  const tasks = await store.getItem("tasks");
  const task = req.body;
  //console.log("server: task to be added :: ", task);
  const allTasks = tasks?[...tasks, task]:[task];
  console.log("server: tasks after adding :: ", allTasks);
  await store.setItem("tasks", allTasks);
  res.send("Task Successfully added");
});

//setting up the middleware to handle cross-origin requests
app.use(cors());
//setting up the middleware to handle incoming requests by the router
app.use(myRouter);
//starting the server on port 5050
app.listen(5050, "localhost",  () => console.log("Server started"));
