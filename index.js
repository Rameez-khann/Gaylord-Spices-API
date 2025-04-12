const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { Recipes } = require('./js/recipes');

const app = express();

const recipesClient = new Recipes();

// Apply CORS middleware before other middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Requests
app.use(express.json());
app.get('/recipes', async (req, res) => {
  const recipes = await  recipesClient.getAll();
  res.status(200).send(recipes)
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