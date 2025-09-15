const { pool } = require('../config/db');

class Category {
  static async getAll() {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
  }

  static async create(name, cover_image) {
    const result = await pool.query(
      'INSERT INTO categories (name, cover_image) VALUES ($1, $2) RETURNING *',
      [name, cover_image]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    return { message: 'Category deleted' };
  }
}

module.exports = Category; 