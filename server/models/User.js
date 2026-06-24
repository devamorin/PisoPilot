import db from '../config/database.js';

class User {
  static async create(name, email, passwordHash) {
    const query = `
      INSERT INTO users (name, email, password_hash)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [name, email, passwordHash]);
    return result.insertId;
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }

  static async update(id, name, email) {
    const query = `
      UPDATE users
      SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.execute(query, [name, email, id]);
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    await db.execute(query, [id]);
  }
}

export default User;
