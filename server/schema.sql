-- PisoPilot Database Schema
-- Student-focused expense tracking application
-- MySQL 8.0+ compatible

-- Create database
CREATE DATABASE IF NOT EXISTS pisopilot;
USE pisopilot;

-- Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- USERS TABLE
-- ============================================
-- Stores user authentication and profile information
-- Design: One-to-many relationship with transactions, budgets, and goals
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique user identifier',
  name VARCHAR(255) NOT NULL COMMENT 'Full name of the user',
  email VARCHAR(255) NOT NULL UNIQUE COMMENT 'User email address (unique)',
  password_hash VARCHAR(255) NOT NULL COMMENT 'Bcrypt hashed password',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Account creation timestamp',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  
  -- Indexes
  INDEX idx_email (email) COMMENT 'Fast lookup by email for login',
  INDEX idx_created_at (created_at) COMMENT 'For user analytics and sorting'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User accounts and authentication data';

-- ============================================
-- TRANSACTIONS TABLE
-- ============================================
-- Stores individual expense transactions
-- Design: Many-to-one relationship with users
CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique transaction identifier',
  user_id INT NOT NULL COMMENT 'Foreign key to users table',
  amount DECIMAL(10, 2) NOT NULL COMMENT 'Transaction amount (positive for expenses)',
  category ENUM(
    'Food', 'Transportation', 'Education', 'Entertainment', 
    'Shopping', 'Health', 'Utilities', 'Personal Care',
    'Communication', 'Savings', 'Others'
  ) NOT NULL COMMENT 'Expense category for analytics',
  notes TEXT COMMENT 'Optional notes or description',
  transaction_date DATE NOT NULL COMMENT 'Date of the transaction',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  
  -- Constraints
  CONSTRAINT chk_amount_positive CHECK (amount > 0) COMMENT 'Ensure amount is positive',
  CONSTRAINT chk_transaction_date_valid CHECK (transaction_date <= CURDATE()) COMMENT 'Prevent future-dated transactions',
  
  -- Foreign Key
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT 'Cascade delete when user is deleted',
  
  -- Indexes
  INDEX idx_user_id (user_id) COMMENT 'Fast lookup of user transactions',
  INDEX idx_transaction_date (transaction_date) COMMENT 'For date-range queries and analytics',
  INDEX idx_category (category) COMMENT 'For category-based filtering',
  INDEX idx_user_date (user_id, transaction_date) COMMENT 'Composite index for user-specific date queries'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Individual expense transactions';

-- ============================================
-- BUDGETS TABLE
-- ============================================
-- Stores monthly budget limits per user
-- Design: One-to-one per user per month (enforced by unique constraint)
CREATE TABLE IF NOT EXISTS budgets (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique budget identifier',
  user_id INT NOT NULL COMMENT 'Foreign key to users table',
  monthly_budget DECIMAL(10, 2) NOT NULL COMMENT 'Monthly budget limit',
  month INT NOT NULL COMMENT 'Month number (1-12)',
  year INT NOT NULL COMMENT 'Year (e.g., 2024)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Budget creation timestamp',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  
  -- Constraints
  CONSTRAINT chk_month_valid CHECK (month BETWEEN 1 AND 12) COMMENT 'Ensure month is valid',
  CONSTRAINT chk_year_valid CHECK (year >= 2000 AND year <= 2100) COMMENT 'Reasonable year range',
  CONSTRAINT chk_budget_positive CHECK (monthly_budget > 0) COMMENT 'Ensure budget is positive',
  
  -- Foreign Key
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT 'Cascade delete when user is deleted',
  
  -- Unique Constraint (One budget per user per month)
  UNIQUE KEY unique_user_budget (user_id, month, year) COMMENT 'Prevent duplicate budgets for same month',
  
  -- Indexes
  INDEX idx_user_id (user_id) COMMENT 'Fast lookup of user budgets',
  INDEX idx_month_year (month, year) COMMENT 'For monthly/annual budget queries',
  INDEX idx_user_month_year (user_id, month, year) COMMENT 'Composite index for user-specific budget lookup'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Monthly budget limits';

-- ============================================
-- GOALS TABLE
-- ============================================
-- Stores savings goals with progress tracking
-- Design: Many-to-one relationship with users
CREATE TABLE IF NOT EXISTS goals (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique goal identifier',
  user_id INT NOT NULL COMMENT 'Foreign key to users table',
  goal_name VARCHAR(255) NOT NULL COMMENT 'Name/description of the savings goal',
  target_amount DECIMAL(10, 2) NOT NULL COMMENT 'Target savings amount',
  current_amount DECIMAL(10, 2) DEFAULT 0.00 COMMENT 'Current saved amount',
  target_date DATE NOT NULL COMMENT 'Target completion date',
  status ENUM('active', 'completed', 'cancelled') DEFAULT 'active' COMMENT 'Goal status',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Goal creation timestamp',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  
  -- Constraints
  CONSTRAINT chk_target_amount_positive CHECK (target_amount > 0) COMMENT 'Ensure target amount is positive',
  CONSTRAINT chk_current_amount_non_negative CHECK (current_amount >= 0) COMMENT 'Ensure current amount is non-negative',
  CONSTRAINT chk_current_not_exceed_target CHECK (current_amount <= target_amount) COMMENT 'Current cannot exceed target',
  CONSTRAINT chk_target_date_future CHECK (target_date >= CURDATE()) COMMENT 'Target date must be current or future',
  
  -- Foreign Key
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT 'Cascade delete when user is deleted',
  
  -- Indexes
  INDEX idx_user_id (user_id) COMMENT 'Fast lookup of user goals',
  INDEX idx_status (status) COMMENT 'For filtering by goal status',
  INDEX idx_target_date (target_date) COMMENT 'For goal deadline queries',
  INDEX idx_user_status (user_id, status) COMMENT 'Composite index for user-specific status queries'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Savings goals and progress tracking';

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- DESIGN DECISIONS DOCUMENTATION
-- ============================================
-- 
-- 1. ENGINE: InnoDB
--    - Supports transactions, foreign keys, and row-level locking
--    - Essential for data integrity in financial applications
--
-- 2. CHARSET: utf8mb4
--    - Full Unicode support including emojis
--    - Future-proof for international users
--
-- 3. AUTO_INCREMENT on Primary Keys
--    - Simple, reliable unique identifiers
--    - Avoids application-side ID generation complexity
--
-- 4. TIMESTAMP with DEFAULT CURRENT_TIMESTAMP
--    - Automatic timestamp management
--    - ON UPDATE CURRENT_TIMESTAMP for audit trails
--
-- 5. FOREIGN KEY with ON DELETE CASCADE
--    - Maintains referential integrity
--    - Automatic cleanup of related data when user is deleted
--    - Simplifies application logic (no orphaned data)
--
-- 6. ENUM for category and status fields
--    - Data integrity at database level
--    - Prevents invalid values
--    - Storage efficient (1-2 bytes)
--    - Easy to modify with ALTER TABLE if needed
--
-- 7. CHECK Constraints
--    - Business logic enforcement at database level
--    - Prevents invalid data entry
--    - Reduces application-side validation burden
--
-- 8. Indexes Strategy
--    - Foreign key indexes for fast joins
--    - Date indexes for time-based queries (analytics)
--    - Composite indexes for common query patterns
--    - Balance between read performance and write overhead
--
-- 9. DECIMAL(10, 2) for monetary values
--    - Exact precision for financial calculations
--    - Avoids floating-point rounding errors
--    - Supports amounts up to 99,999,999.99
--
-- 10. UNIQUE constraint on budgets (user_id, month, year)
--     - Enforces one budget per user per month
--     - Prevents duplicate budget entries
--     - Simplifies budget lookup logic
--
-- 11. TEXT for notes field
--     - Flexible length for user descriptions
--     - No arbitrary length limit
--     - Stored separately from main row for performance
--
-- 12. DATE vs TIMESTAMP for transaction_date and target_date
--     - DATE for business dates (no time component needed)
--     - TIMESTAMP for audit trails (includes time)
--     - Clear semantic distinction
--
