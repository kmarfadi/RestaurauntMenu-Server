const { pool } = require('../config/db');

class Item {
  static async getAll() {
    const result = await pool.query('SELECT * FROM items');
    return result.rows;
  }

  static async create(name, description, price, image, category_id) {
    const result = await pool.query(
      'INSERT INTO items (name, description, price, image, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, image, category_id]
    );
    return result.rows[0];
  }

  static async update(id, description, price) {
    const result = await pool.query(
      'UPDATE items SET description = $1, price = $2 WHERE id = $3 RETURNING *',
      [description, price, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    return { message: 'Item deleted' };
  }
}

module.exports = Item; 