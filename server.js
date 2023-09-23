import express from "express";
import store from "node-persist";

//intialising the storage
store.init().then(val => console.log("Node persistence storage initialised", val));
//clearing the storage, whenever server restrats
store.clear().then("storage cleared");

//initailising express 
const app = express();

//initialising express router
const myRouter = express.Router();

//setting up the middleware, so that every requesgt can be logged
myRouter.use((req, res)=> console.log("request recieved::", req));

//setting routes for app using express router

//endpoint for getting all the tasks
myRouter.get("/tasks", (req, res)=>{
    const tasks = store.getItem("tasks");
    console.log("server: getting tasks", tasks);
    res.send(tasks);
});

//endpoint for getting all the tasks
myRouter.get("/addTask", (req, res)=> {
    const tasks = store.getItem("tasks");
    const task = req.body();
    console.log("server: task recieved :: ", task);
    allTasks = [...tasks, task];
    console.log("server: tasks after adding :: ", allTasks);
    store.setItem("tasks", allTasks);

});

app.listen(3030, ()=> console.log("Server started"));