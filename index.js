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

app.use(express.json());

app.get('/', async (req, res) => {
});



// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// For serverless deployment
module.exports = app;
module.exports.handler = serverless(app);