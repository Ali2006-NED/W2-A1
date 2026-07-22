// Application bootstrap entry point.
// This file initializes the Express application and starts the HTTP server.

const server = require('./src/app');

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});