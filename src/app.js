// Express application configuration and API route definitions.
// This file exposes the CRUD task endpoints and serves the OpenAPI documentation.

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const docs = require('./openapi.json');

const app = express();

// In-memory task store used as the backing data source for this demo API.
const tasks = [
  { id: 1, title: 'Task 1', done: false },
  { id: 2, title: 'Task 2', done: true },
  { id: 3, title: 'Task 3', done: false },
];

// Middleware setup.
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));

// Simple smoke-test endpoint.
app.get('/', (req, res) => {
  res.send({ message: 'Hello, World!' });
});

// Retrieve all tasks.
app.get('/tasks', (req, res) => {
  res.send({ tasks });
});

// Retrieve a single task by its identifier.
app.get('/tasks/:id', (req, res) => {
  const id = req.params.id;

  if (tasks.some((task) => task.id == id)) {
    res.send({ task: tasks[id - 1] });
  } else {
    res.status(404).send({ error: `Task ${id} not found` });
  }
});

// Create a new task.
app.post('/tasks', (req, res) => {
  const title = req.body.title;

  if (title) {
    const newTask = { id: tasks.length + 1, title, done: false };
    tasks.push(newTask);
    res.status(201).send({ task: newTask });
  } else {
    res.status(400).send({ error: 'Title is required' });
  }
});

// Update a task's title and completion status.
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const task = tasks.find((item) => item.id == id);

  if (task) {
    const { title, done } = req.body;

    if (title !== undefined) task.title = title;
    if (done !== undefined) task.done = done;

    res.send({ task });
  } else {
    res.status(404).send({ error: `Task ${id} not found` });
  }
});

// Delete a task by identifier.
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex((task) => task.id == id);

  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send({ message: `Task ${id} deleted successfully` });
  } else {
    res.status(404).send({ error: `Task ${id} not found` });
  }
});

// Health check used by deployment and monitoring systems.
app.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

module.exports = app;