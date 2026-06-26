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
    const query = 'SELECT id, name, email, is_verified, created_at, updated_at FROM users WHERE id = ?';
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

  static async setVerificationCode(userId, code) {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    const query = `
      UPDATE users
      SET verification_code = ?, verification_expires = ?
      WHERE id = ?
    `;
    await db.execute(query, [code, expiresAt, userId]);
  }

  static async verifyEmail(userId, code) {
    const query = `
      UPDATE users
      SET is_verified = TRUE, verification_code = NULL, verification_expires = NULL
      WHERE id = ? AND verification_code = ? AND verification_expires > NOW()
    `;
    const [result] = await db.execute(query, [userId, code]);
    return result.affectedRows > 0;
  }

  static async updatePassword(userId, passwordHash) {
    const query = `
      UPDATE users
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.execute(query, [passwordHash, userId]);
  }

  static async isVerified(userId) {
    const query = 'SELECT is_verified FROM users WHERE id = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows[0]?.is_verified === 1 || rows[0]?.is_verified === true;
  }
}

export default User;
