const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { Recipes } = require('./js/recipes');
const { Search } = require('./js/search');

const app = express();

const recipesClient = new Recipes();
const searchClient = new Search();

// Apply CORS middleware before other middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
// Requests

app.post('/recipes/search', async (req, res) => {  
  console.log(req.body);
  const searchTerm = req.body?.searchTerm;
  const recipes = await searchClient.findRecipes(searchTerm);
  res.status(200).json(recipes);
});


app.use(express.json());
app.get('/recipes', async (req, res) => {
  const recipes = await  recipesClient.getAll();
  res.status(200).send(recipes)
});

app.get('/recipes/:id', async (req, res) => {
  const item = await recipesClient.getOne(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

app.post('/recipes', async (req, res) => {
  const save = await recipesClient.create(req.body);
  res.status(200).json(save);
});

app.put('/recipes/:id', async (req, res) => {
  const updated = await recipesClient.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Item not found' });
  res.json(updated);
});

app.delete('/recipes/:id', async (req, res) => {
  const removed = await recipesClient.delete(req.params.id);
  res.status(200).json(removed);
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