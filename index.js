const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const app = express();

// Apply CORS middleware before other middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Requests
app.use(express.json());
app.get('/', async (req, res) => {
  res.status(200).send("HELLO")
});



// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = {
  app,
  handler: serverless(app)
};