const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Search for recipes (possibly by name or ingredient via query string)
app.post('/recipes/search', (req, res) => {
  const { query } = req.body; // e.g., { "query": "chicken" }
  res.send(`Searching recipes for: ${query}`);
});

// Get all recipes
app.get('/recipes', (req, res) => {
  res.send('Returning all recipes');
});

// Get a single recipe by ID
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Returning recipe with ID: ${id}`);
});

// Create a new recipe
app.post('/recipes', (req, res) => {
  const newRecipe = req.body;
  res.send(`Created a new recipe: ${JSON.stringify(newRecipe)}`);
});

// Update a recipe by ID
app.put('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  res.send(`Updated recipe ${id} with data: ${JSON.stringify(updatedData)}`);
});

// Delete a recipe by ID
app.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Deleted recipe with ID: ${id}`);
});

// Choose a port (e.g. 3000)
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
