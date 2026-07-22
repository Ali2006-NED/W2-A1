const express = require('express');

const app = express();

const tasks = [{"id":1,"title":"Task 1","done":false},{"id":2,"title":"Task 2","done":true},{"id":3,"title":"Task 3","done":false}];

app.use(express.json());

app.get('/hello', (req, res) => {
  res.send({ "message": "Hello, World!" });
});

app.get('/tasks', (req, res) => {
  res.send({ "tasks": tasks });
});

app.get('/tasks/:id',(req,res) => {
  const id = req.params.id;
  if (tasks.some(tasks => tasks.id == id)){
    res.send({"task":tasks[id-1]});
  } else {
    res.status(404).send({"error":`Task ${id} not found`});
  }
});

app.post('/tasks', (req,res) => {
  const title = req.body.title;
  if (title){
    const newTask = {"id": tasks.length + 1, "title": title, "done": false};
    tasks.push(newTask);
    res.status(201).send({"task": newTask});
  } else {
    res.status(400).send({"error": "Title is required"});
  }
});

app.get('/health', (req, res) => {
  res.send({ "status": "ok" });
});

module.exports = app;