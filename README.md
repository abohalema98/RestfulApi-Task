# RestfulApi-Task
This is a basic Express application that demonstrates how to create a RESTful API for managing books and implementing user authentication using JSON Web Tokens (JWT).

### Prerequisites

- Node.js (v14+)
- MongoDB (Ensure you have a running MongoDB instance or configure the connection in `config/db.config.js`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/express-app.git
   cd express-app

```
PORT=3000
TOKEN_SECRET=your-secret-key
MONGODB_URI=your-mongodb-uri
```
### Features
```
User authentication using JWT
CRUD operations for managing books
Error handling and middleware setup
API routes for books management and user authentication

```

### API Endpoints
```
GET /api/books - Retrieve a list of books
POST /api/books - Create a new book
PUT /api/books/:id - Update a book's description
DELETE /api/books/:id - Delete a book
POST /api/auth/userLogin - User login and JWT generation
POST /api/auth/userRegister - User registration
```

### Error Handling
```
Errors are handled using Express middleware.
```
