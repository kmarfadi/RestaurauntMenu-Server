// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { pool } = require('./models/db.js');
// const app = express();
// dotenv.config();

// //______________________________________________________________

// // Middleware
// app.use(cors());
// app.use(express.json());

// // ----------- Admin Routes -----------

// // Add category
// app.post('/admin/category', async (req, res) => {
//   const { name, cover_image } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO categories (name, cover_image) VALUES ($1, $2) RETURNING *',
//       [name, cover_image]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add category' });
//   }
// });

// // Add item
// app.post('/admin/item', async (req, res) => {
//   const { name, description, price, image, category_id } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO items (name, description, price, image, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [name, description, price, image, category_id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add item' });
//   }
// });

// //delete category
// app.delete('/admin/category/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM categories WHERE id = $1', [id]);
//     res.json({ message: 'Category deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete category' });
//   }
// });

// // Delete item
// app.delete('/admin/item/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM items WHERE id = $1', [id]);
//     res.json({ message: 'Item deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete item' });
//   }
// });

// // Update item description or price
// app.put('/admin/item/:id', async (req, res) => {
//   const { id } = req.params;
//   const { description, price } = req.body;
//   try {
//     const result = await pool.query(
//       'UPDATE items SET description = $1, price = $2 WHERE id = $3 RETURNING *',
//       [description, price, id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update item' });
//   }
// });

// // ----------- Customer Routes -----------

// // Get menu
// app.get('/menu', async (req, res) => {
//   try {
//     const categories = await pool.query('SELECT * FROM categories');
//     const items = await pool.query('SELECT * FROM items');
//     res.json({ categories: categories.rows, items: items.rows });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch menu' });
//   }
// });

// // Get branches
// app.get('/branches', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM branches');
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to get branches' });
//   }
// });

// // Checkout — build WhatsApp message and redirect link
// // Checkout — build WhatsApp message and redirect link
// app.post('/checkout', async (req, res) => {
//     const { name, address, cart, branch_id } = req.body;
  
//     // Hardcoded WhatsApp numbers for branches
//     const branchNumbers = {
//       1: '+905352596905', // Branch 1 number
//       2: '+905358615683'  // Branch 2 number
//     };
  
//     const number = branchNumbers[branch_id];
//     if (!number) return res.status(404).json({ error: 'Branch not found' });
//   const itemLines = cart.map(item => `• ${item.name} x${item.qty}`).join('\n');
//   const message = `طلب من ${name}\nالعنوان: ${address}\n\nالمنتجات:\n${itemLines}`;
//   const encodedMsg = encodeURIComponent(message);
//   const whatsappUrl = `https://wa.me/${number}?text=${encodedMsg}`;
    
//     res.json({ whatsappUrl });
//   });
  

// // ----------- Start Server -----------
// const port = process.env.PORT;

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// }
// );


// app.listen(port, () => {
//     try {
//         console.log('Server is running on port ' + port);
//     }
//     catch (error) {
//         console.error('Error starting server:', error);
//     }});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('./models/db.js'); // keep your db pool
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//===================== ADMIN AUTH CONFIG =========================//

const ADMIN = {
  username: process.env.ADMIN_USERNAME || 'admin',
  passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'password123', 10), // hash once
};

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN.username) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, ADMIN.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

//===================== ADMIN ROUTES (PROTECTED) =========================//

app.get('/admin/categories', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
);
app.get('/admin/items', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}
);

app.post('/admin/category', authMiddleware, async (req, res) => {
  const { name, cover_image } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categories (name, cover_image) VALUES ($1, $2) RETURNING *',
      [name, cover_image]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add category' });
  }
});

app.post('/admin/item', authMiddleware, async (req, res) => {
  const { name, description, price, image, category_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO items (name, description, price, image, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, image, category_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

app.delete('/admin/category/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

app.delete('/admin/item/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.put('/admin/item/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { description, price } = req.body;
  try {
    const result = await pool.query(
      'UPDATE items SET description = $1, price = $2 WHERE id = $3 RETURNING *',
      [description, price, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

//===================== CUSTOMER ROUTES =========================//

app.get('/menu', async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    const items = await pool.query('SELECT * FROM items');
    res.json({ categories: categories.rows, items: items.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

app.get('/branches', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM branches');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get branches' });
  }
});

app.post('/checkout', async (req, res) => {
  const { name, address, cart, branch_id } = req.body;

  const branchNumbers = {
    1: '+967777858820',
    2: '+967779595956'
  };

  const number = branchNumbers[branch_id];
  if (!number) return res.status(404).json({ error: 'Branch not found' });

  const itemLines = cart.map(item => `• ${item.name} x${item.qty}`).join('\n');
  const message = `طلب من _*${name}*_\nالعنوان: _*${address}*_ \n\الطلب:\n${itemLines}`;
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${number}?text=${encodedMsg}`;

  res.json({ whatsappUrl });
});

//===================== SERVER INIT =========================//

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
