import db from '../config/database.js';

class Transaction {
  static async create(userId, amount, category, notes, transactionDate) {
    const query = `
      INSERT INTO transactions (user_id, amount, category, notes, transaction_date)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [userId, amount, category, notes, transactionDate]);
    return result.insertId;
  }

  static async findByUserId(userId, filters = {}) {
    let query = 'SELECT * FROM transactions WHERE user_id = ?';
    const params = [userId];

    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters.date_from) {
      query += ' AND transaction_date >= ?';
      params.push(filters.date_from);
    }

    if (filters.date_to) {
      query += ' AND transaction_date <= ?';
      params.push(filters.date_to);
    }

    if (filters.search) {
      query += ' AND (notes LIKE ? OR category LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    query += ' ORDER BY transaction_date DESC, created_at DESC';

    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM transactions WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }

  static async findByIdAndUserId(id, userId) {
    const query = 'SELECT * FROM transactions WHERE id = ? AND user_id = ?';
    const [rows] = await db.execute(query, [id, userId]);
    return rows[0];
  }

  static async update(id, userId, amount, category, notes, transactionDate) {
    const query = `
      UPDATE transactions
      SET amount = ?, category = ?, notes = ?, transaction_date = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `;
    await db.execute(query, [amount, category, notes, transactionDate, id, userId]);
  }

  static async delete(id, userId) {
    const query = 'DELETE FROM transactions WHERE id = ? AND user_id = ?';
    await db.execute(query, [id, userId]);
  }

  static async getTotalByUserId(userId, filters = {}) {
    let query = 'SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE user_id = ?';
    const params = [userId];

    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters.date_from) {
      query += ' AND transaction_date >= ?';
      params.push(filters.date_from);
    }

    if (filters.date_to) {
      query += ' AND transaction_date <= ?';
      params.push(filters.date_to);
    }

    const [rows] = await db.execute(query, params);
    return rows[0].total;
  }
}

export default Transaction;
