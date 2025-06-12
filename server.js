// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
require('express-async-errors'); // For handling async errors
const errorHandler = require('./Middleware/errorHandler');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// - Request logging
app.use((req,res,next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}); 

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  },
  {
    id:'4',
    name:"Lady Million",
    description: "Perfume by Paco rabbane",
    price:200,
    category:"accessories",
    inStock: true
  },
  {
    id:'5',
    name:"Braids",
    description: "Piece",
    price:20,
    category:"Beauty",
    inStock: true
  },
  {
    id:'6',
    name:"Marshall Emberton 2",
    description: "Bluetooth speaker portable",
    price:150,
    category:"electronic",
    inStock: true
  },
  {
    id:'7',
    name:"Alienware Mouse",
    description: "Wireless Pro mouse",
    price:100,
    category:"Gaming",
    inStock: true
  },
  {
    id:'8',
    name:"Steel-series Apex 3",
    description:"Gaming TKL keyboard",
    price:100,
    category:"Gaming",
    inStock: true
  },
  {
    id:'9',
    name:'Lenovo 27" Monitor  ',
    description: "Frameless  27 inch 2k Monitor",
    price:300,
    category:"electronics",
    inStock: true
  },
  {
    id:'10',
    name:"Jimmy Choo",
    description: "Perfume by JimmyChoo",
    price:200,
    category:"accessories",
    inStock: true
  },
  {
    id:'11',
    name:"iPhone",
    description: "Personal phone",
    price:900,
    category:"electronic",
    inStock: true
  },
  {
    id:'12',
    name:"Xerjoff",
    description: "Alexandria li",
    price:200,
    category:"beauty",
    inStock: true
  },
  {
    id:'13',
    name:"RAINS Bag",
    description: "Leather bagpack",
    price:200,
    category:"accessories",
    inStock: true
  }
  ];


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product


// Example route implementation for GET /api/products
// GET /api/products - Get all products with filtering and pagination
app.get('/api/products', (req, res, next) => {
  try {
    let { category, page = 1, limit = 10 } = req.query;
    let filtered = products;

    // Filter by category if provided
    if (category) {
      filtered = filtered.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Pagination
    page = parseInt(page);
    limit = parseInt(limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    res.json({
      total: filtered.length,
      page,
      limit,
      products: paginated
    });
  } catch (err) {
    next(err);
  }
});

// Search endpoint: GET /api/products/search?name=...
app.get('/api/products/search', (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Missing search query parameter: name' });
    }
    const results = products.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json({ total: results.length, products: results });
  } catch (err) {
    next(err);
  }
});

// Product statistics: GET /api/products/stats
app.get('/api/products/stats', (req, res, next) => {
  try {
    const stats = {};
    products.forEach(p => {
      const cat = p.category.toLowerCase();
      stats[cat] = (stats[cat] || 0) + 1;
    });
    res.json({ countByCategory: stats, total: products.length });
  } catch (err) {
    next(err);
  }
});

// Retrieve single product by id
app.get('/api/products/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// Add product 
app.post('/api/products', (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    if (!name || !description || !price || !category || inStock === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// Update product
app.put('/api/products/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).send('Product not found');
    const { name, description, price, category, inStock } = req.body;
    product.name = name !== undefined ? name : product.name;
    product.description = description !== undefined ? description : product.description;
    product.price = price !== undefined ? price : product.price;
    product.category = category !== undefined ? category : product.category;
    product.inStock = inStock !== undefined ? inStock : product.inStock;
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// Delete product
app.delete('/api/products/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).send('Product not found');
    products = products.filter(p => p.id !== req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});


// TODO: Implement custom middleware for:

// - Authentication
// - Error handling
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;