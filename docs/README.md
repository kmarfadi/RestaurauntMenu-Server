# 📚 Marf Pizza API Documentation

<img src="../apiDocsScreenShot.png" alt="Marf Pizza API Documentation Screenshot" width="800">

This folder contains the comprehensive Swagger/OpenAPI documentation for the Marf Pizza Restaurant API.

## 📁 Structure

```
docs/
├── README.md              # This file
├── swagger.js             # Swagger configuration and setup
├── swagger.json           # Complete OpenAPI 3.0 specification
└── schemas/               # JSON schema definitions
    ├── auth.json          # Authentication schemas
    ├── category.json      # Category-related schemas
    ├── checkout.json      # Checkout and branch schemas
    ├── error.json         # Error response schemas
    ├── item.json          # Menu item schemas
    ├── menu.json          # Menu response schemas
    └── upload.json        # Image upload schemas
```

## 🚀 Accessing the Documentation

### Live Documentation
Visit the interactive Swagger UI at: **`http://localhost:3008/docs`**

### Features
- **Interactive API Testing**: Try out endpoints directly from the browser
- **Request/Response Examples**: See real data structures and examples
- **Authentication Testing**: Test JWT authentication flows
- **File Upload Testing**: Test image uploads with the built-in file picker
- **Custom Styling**: Pizza-themed UI with red accent colors

## 📋 API Overview

### 🍕 Customer Endpoints
- **GET /api/menu** - Retrieve complete menu (categories + items)
- **GET /api/branches** - Get available restaurant branches
- **POST /api/checkout** - Submit order and get WhatsApp URL

### 👨‍💼 Admin Endpoints (Protected)
- **POST /api/admin/login** - Admin authentication
- **GET /api/admin/categories** - List all categories
- **POST /api/admin/categories** - Create new category
- **DELETE /api/admin/category/:id** - Delete category
- **GET /api/admin/items** - List all menu items
- **POST /api/admin/items** - Create new menu item
- **PUT /api/admin/item/:id** - Update menu item
- **DELETE /api/admin/item/:id** - Delete menu item
- **POST /api/admin/upload** - Upload image to Cloudinary

## 🔐 Authentication

### JWT Token Flow
1. **Login**: `POST /api/admin/login` with username/password
2. **Get Token**: Receive JWT token in response
3. **Use Token**: Include `Authorization: Bearer <token>` header
4. **Token Expiry**: Tokens expire after 1 hour

### Example Authentication
```bash
# Login
curl -X POST http://localhost:3008/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'

# Use token
curl -X GET http://localhost:3008/api/admin/categories \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 📊 Data Models

### Category
```json
{
  "id": 1,
  "name": "Classic Pizzas",
  "cover_image": "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Item
```json
{
  "id": 1,
  "name": "Margherita Pizza",
  "description": "Classic Italian pizza with fresh mozzarella, tomato sauce, and basil",
  "price": 16.99,
  "image": "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg",
  "category_id": 1,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Checkout Request
```json
{
  "name": "محمد أحمد",
  "address": "شارع هايل، صنعاء",
  "cart": [
    {
      "name": "Margherita Pizza",
      "qty": 2
    }
  ],
  "branch_id": 1
}
```

## 🛠️ Development

### Updating Documentation

1. **Modify Schemas**: Update JSON files in `schemas/` folder
2. **Update Swagger Spec**: Modify `swagger.json` for endpoint changes
3. **Restart Server**: Documentation updates require server restart

### Adding New Endpoints

1. **Create Schema**: Add request/response schemas to appropriate JSON files
2. **Update swagger.json**: Add new path definition
3. **Reference Schemas**: Use `$ref` to reference schema definitions
4. **Test**: Verify in Swagger UI at `/docs`

### Custom Styling

The Swagger UI includes custom CSS for pizza-themed styling:
- Red accent colors (#ef4444)
- Hidden topbar for cleaner look
- Enhanced button styling
- Custom favicon support

## 🔧 Configuration

### Swagger Options
```javascript
const swaggerUiOptions = {
  customCss: '...',           // Custom styling
  customSiteTitle: 'Marf Pizza API Documentation',
  swaggerOptions: {
    persistAuthorization: true,    // Keep auth between sessions
    displayRequestDuration: true,  // Show response times
    filter: true,                 // Enable search/filter
    tryItOutEnabled: true         // Enable "Try it out" buttons
  }
};
```

### Environment Variables
- **CLIENT_URL**: Frontend URL for CORS
- **JWT_SECRET**: Secret for JWT token signing
- **CLOUDINARY_***: Cloudinary configuration for image uploads

## 📱 Integration Examples

### Frontend Integration
```javascript
// Fetch menu data
const response = await fetch('http://localhost:3008/api/menu');
const { categories, items } = await response.json();

// Submit order
const orderResponse = await fetch('http://localhost:3008/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Customer Name',
    address: 'Delivery Address',
    cart: [{ name: 'Pizza', qty: 2 }],
    branch_id: 1
  })
});
```

### Admin Integration
```javascript
// Login
const loginResponse = await fetch('http://localhost:3008/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'password123' })
});
const { token } = await loginResponse.json();

// Create category
const categoryResponse = await fetch('http://localhost:3008/api/admin/categories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'New Category',
    cover_image: 'https://example.com/image.jpg'
  })
});
```

## 🚨 Error Handling

### Standard Error Format
```json
{
  "error": "Bad Request",
  "message": "Category name is required",
  "statusCode": 400
}
```

### Common HTTP Status Codes
- **200**: Success
- **400**: Bad Request (missing/invalid data)
- **401**: Unauthorized (invalid/missing token)
- **404**: Not Found (resource doesn't exist)
- **500**: Internal Server Error

## 📞 Support

For API support or questions:
- **Email**: khalifahmarfadi@gmail.com
- **Documentation**: Visit `/docs` endpoint
- **Issues**: Check server logs for detailed error messages

---

**Built with ❤️ for Marf Pizza Restaurant API**
