import Transaction from '../models/Transaction.js';

// Get all transactions for a user
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const filters = {
      category: req.query.category,
      date_from: req.query.date_from,
      date_to: req.query.date_to,
      search: req.query.search,
    };

    const transactions = await Transaction.findByUserId(userId, filters);

    res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transactions',
    });
  }
};

// Get single transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndUserId(id, userId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found',
      });
    }

    res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transaction',
    });
  }
};

// Create new transaction
export const createTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, category, notes, transaction_date } = req.body;

    // Validate input
    if (!amount || !category || !transaction_date) {
      return res.status(400).json({
        success: false,
        error: 'Amount, category, and date are required',
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0',
      });
    }

    const validCategories = [
      'Food',
      'Transport',
      'School',
      'Entertainment',
      'Bills',
      'Shopping',
      'Health',
      'Others',
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category',
      });
    }

    const transactionId = await Transaction.create(
      userId,
      amount,
      category,
      notes || null,
      transaction_date
    );

    // Fetch the created transaction
    const transaction = await Transaction.findById(transactionId);

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction,
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create transaction',
    });
  }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { amount, category, notes, transaction_date } = req.body;

    // Check if transaction exists and belongs to user
    const existingTransaction = await Transaction.findByIdAndUserId(id, userId);
    if (!existingTransaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found',
      });
    }

    // Validate amount if provided
    if (amount !== undefined && amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0',
      });
    }

    // Validate category if provided
    if (category) {
      const validCategories = [
        'Food',
        'Transport',
        'School',
        'Entertainment',
        'Bills',
        'Shopping',
        'Health',
        'Others',
      ];

      if (!validCategories.includes(category)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid category',
        });
      }
    }

    await Transaction.update(
      id,
      userId,
      amount !== undefined ? amount : existingTransaction.amount,
      category || existingTransaction.category,
      notes !== undefined ? notes : existingTransaction.notes,
      transaction_date || existingTransaction.transaction_date
    );

    // Fetch the updated transaction
    const transaction = await Transaction.findById(id);

    res.json({
      success: true,
      message: 'Transaction updated successfully',
      data: transaction,
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update transaction',
    });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Check if transaction exists and belongs to user
    const existingTransaction = await Transaction.findByIdAndUserId(id, userId);
    if (!existingTransaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found',
      });
    }

    await Transaction.delete(id, userId);

    res.json({
      success: true,
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete transaction',
    });
  }
};
