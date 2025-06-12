[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19757580&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

# Product API - Express.js Assignment

This is a simple RESTful API for managing products, built with Express.js.  
It supports CRUD operations, filtering, pagination, search, and statistics.

## Features

- **CRUD**: Create, Read, Update, Delete products
- **Filtering**: Filter products by category
- **Pagination**: Paginate product listings
- **Search**: Search products by name
- **Statistics**: Get product counts by category
- **Error Handling**: Centralized error middleware

## Endpoints

| Method | Endpoint                   | Description                                 |
|--------|----------------------------|---------------------------------------------|
| GET    | `/api/products`            | List products (supports filtering & pagination) |
| GET    | `/api/products/:id`        | Get a single product by ID                  |
| POST   | `/api/products`            | Create a new product                        |
| PUT    | `/api/products/:id`        | Update a product by ID                      |
| DELETE | `/api/products/:id`        | Delete a product by ID                      |
| GET    | `/api/products/search`     | Search products by name                     |
| GET    | `/api/products/stats`      | Get product statistics by category          |

### Query Parameters

- **Filtering by category:**  
  `/api/products?category=electronics`
- **Pagination:**  
  `/api/products?page=2&limit=5`
- **Search:**  
  `/api/products/search?name=laptop`

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd week-2-express-js-assignment-achore26
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file in the project root:**
   ```
   PORT=3000
   ```

4. **Start the server:**
   ```sh
   node server.js
   ```
   Or, for development with auto-reload:
   ```sh
   npx nodemon server.js
   ```

5. **Access the API:**  
   Visit [http://localhost:3000/api/products](http://localhost:3000/api/products) in your browser or use tools like Postman.

---

## Example Product Object

```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

---

## Notes

- This API uses an in-memory array for products. Data will reset when the server restarts.
- For production, connect to a real database.

---
