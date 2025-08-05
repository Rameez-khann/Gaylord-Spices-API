const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { Search } = require('./js/search');
const { FoodMenu } = require('./js/food-menu');
const { Orders } = require('./js/orders');
const { Authentication } = require('./js/authentication');

const app = express();

const foodMenu = new FoodMenu();
const searchClient = new Search();
const orders = new Orders();


// Apply CORS middleware before other middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
// Requests

app.post('/menu/search', async (req, res) => {  
  const searchTerm = req.body?.searchTerm;
  const searchResults = await searchClient.findRecipes(searchTerm);
  res.status(200).json(searchResults);
});


app.use(express.json());
app.get('/menu', async (req, res) => {
  const recipes = await  foodMenu.getAll();
  res.status(200).send(recipes)
});

app.get('/menu/:id', async (req, res) => {
  const item = await foodMenu.getOne(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

app.get('/menu/filtered/items', async (req, res) => {
  const recipes = await  foodMenu.getFiltered();

  res.status(200).send(recipes)
});

app.post('/menu', async (req, res) => {
  const save = await foodMenu.create(req.body);
  res.status(200).json(save);
});

app.put('/menu/:id', async (req, res) => {
  const updated = await foodMenu.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Item not found' });
  res.json(updated);
});

app.delete('/menu/:id', async (req, res) => {
  const removed = await foodMenu.delete(req.params.id);
  res.status(200).json(removed);
});


app.post('/menu/order', async (req, res) => {  
  const order = req.body;
  const savePOrder = await orders.create(order)
  res.status(200).json(savePOrder);
  
});

app.post('/authentication/login', async (req, res) => {  
  const auth = new Authentication();
  const body = req.body;
  const login = await auth.login(body)
  res.status(200).json(login);
  
});


app.get('/orders/grouped', async (req, res) => {
  const item = await orders.getGroupedOrders();
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

app.get('/orders/mark-as-delivered/:id', async (req, res) => {
  const id = req.params.id;
  if(!id) res.status(404).json({ message: 'Item not found' })
 const marked = await orders.markAsDelivered(id);
  res.status(200).json({message:"Order Processed Successfully"});

});

app.get('/orders/clear-delivered-orders', async (req, res) => {

 const marked = await orders.clearDeliveredOrders();
  res.status(200).json({message:"Orders Cleared Successfully"});

});



// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => {
  });
}

module.exports = {
  app,
  handler: serverless(app)
};