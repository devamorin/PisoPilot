import db from '../config/database.js';
import crypto from 'crypto';

class PasswordReset {
  static async create(userId) {
    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Delete any existing tokens for this user
    await this.deleteByUserId(userId);

    const query = `
      INSERT INTO password_resets (user_id, reset_token, expires_at)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [userId, resetToken, expiresAt]);
    return resetToken;
  }

  static async findByToken(token) {
    const query = `
      SELECT * FROM password_resets
      WHERE reset_token = ? AND expires_at > NOW()
    `;
    const [rows] = await db.execute(query, [token]);
    return rows[0];
  }

  static async deleteByUserId(userId) {
    const query = 'DELETE FROM password_resets WHERE user_id = ?';
    await db.execute(query, [userId]);
  }

  static async deleteByToken(token) {
    const query = 'DELETE FROM password_resets WHERE reset_token = ?';
    await db.execute(query, [token]);
  }

  static async cleanupExpired() {
    const query = 'DELETE FROM password_resets WHERE expires_at < NOW()';
    await db.execute(query);
  }
}

export default PasswordReset;
