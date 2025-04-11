// index.js

const http = require('http');

// Create a simple server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set status and header
  res.end('Hello, world! This is my Node.js server.\n'); // Send response
});

// Choose a port (e.g. 3000)
const PORT = 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
