const express = require('express');

const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
  res.send({ "message": "Hello, World!" });
});

app.get('/', (req, res) => {
  res.send({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
});

app.get('/health', (req, res) => {
  res.send({ "status": "ok" });
});

module.exports = app;