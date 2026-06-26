# PisoPilot Database Schema Documentation

## Overview
The PisoPilot database uses MySQL 8.0+ with InnoDB engine for transaction support and data integrity.

**Database Name:** `railway` (Railway default)  
**Total Tables:** 5  
**Character Set:** utf8mb4 (full Unicode support including emojis)

---

## Table Relationships

```
users (1) ────────→ (many) transactions
users (1) ────────→ (many) budgets (one per month)
users (1) ────────→ (many) goals
users (1) ────────→ (many) password_resets
```

All foreign keys use `ON DELETE CASCADE` for automatic cleanup when a user is deleted.

---

## Table Details

### 1. users
**Purpose:** User accounts and authentication data

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| name | VARCHAR(255) | NOT NULL | Full name of the user |
| email | VARCHAR(255) | NOT NULL, UNIQUE | User email address |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| is_verified | BOOLEAN | DEFAULT FALSE | Email verification status |
| verification_code | VARCHAR(6) | NULL | 6-digit OTP for email verification |
| verification_expires | TIMESTAMP | NULL | OTP expiration timestamp |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Last update timestamp |

**Indexes:**
- `idx_email` - Fast lookup by email for login
- `idx_created_at` - For user analytics and sorting
- `idx_verification_code` - For OTP verification

---

### 2. transactions
**Purpose:** Individual expense transactions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique transaction identifier |
| user_id | INT | NOT NULL, FK → users(id) | Foreign key to users table |
| amount | DECIMAL(10,2) | NOT NULL, > 0 | Transaction amount |
| category | ENUM | NOT NULL | Expense category |
| notes | TEXT | NULL | Optional notes or description |
| transaction_date | DATE | NOT NULL, ≤ CURDATE() | Date of the transaction |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Last update timestamp |

**Categories:** Food, Transportation, Education, Entertainment, Shopping, Health, Utilities, Personal Care, Communication, Savings, Others

**Constraints:**
- `chk_amount_positive` - Ensures amount is positive
- `chk_transaction_date_valid` - Prevents future-dated transactions

**Indexes:**
- `idx_user_id` - Fast lookup of user transactions
- `idx_transaction_date` - For date-range queries and analytics
- `idx_category` - For category-based filtering
- `idx_user_date` - Composite index for user-specific date queries

---

### 3. budgets
**Purpose:** Monthly budget limits per user

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique budget identifier |
| user_id | INT | NOT NULL, FK → users(id) | Foreign key to users table |
| monthly_budget | DECIMAL(10,2) | NOT NULL, > 0 | Monthly budget limit |
| month | INT | NOT NULL, 1-12 | Month number (1-12) |
| year | INT | NOT NULL, 2000-2100 | Year (e.g., 2024) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Budget creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Last update timestamp |

**Constraints:**
- `chk_month_valid` - Ensures month is valid (1-12)
- `chk_year_valid` - Reasonable year range (2000-2100)
- `chk_budget_positive` - Ensures budget is positive
- `unique_user_budget` - One budget per user per month (UNIQUE on user_id, month, year)

**Indexes:**
- `idx_user_id` - Fast lookup of user budgets
- `idx_month_year` - For monthly/annual budget queries
- `idx_user_month_year` - Composite index for user-specific budget lookup

---

### 4. goals
**Purpose:** Savings goals with progress tracking

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique goal identifier |
| user_id | INT | NOT NULL, FK → users(id) | Foreign key to users table |
| goal_name | VARCHAR(255) | NOT NULL | Name/description of the savings goal |
| target_amount | DECIMAL(10,2) | NOT NULL, > 0 | Target savings amount |
| current_amount | DECIMAL(10,2) | DEFAULT 0.00, ≥ 0 | Current saved amount |
| target_date | DATE | NOT NULL, ≥ CURDATE() | Target completion date |
| status | ENUM | DEFAULT 'active' | Goal status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Goal creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Last update timestamp |

**Status Values:** active, completed, cancelled

**Constraints:**
- `chk_target_amount_positive` - Ensures target amount is positive
- `chk_current_amount_non_negative` - Ensures current amount is non-negative
- `chk_target_date_future` - Target date must be current or future

**Indexes:**
- `idx_user_id` - Fast lookup of user goals
- `idx_status` - For filtering by goal status
- `idx_target_date` - For goal deadline queries
- `idx_user_status` - Composite index for user-specific status queries

---

### 5. password_resets
**Purpose:** Password reset tokens for secure password recovery

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique reset token identifier |
| user_id | INT | NOT NULL, FK → users(id) | Foreign key to users table |
| reset_token | VARCHAR(64) | NOT NULL | Secure reset token |
| expires_at | TIMESTAMP | NOT NULL | Token expiration timestamp |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Token creation timestamp |

**Indexes:**
- `idx_user_id` - Fast lookup of user reset tokens
- `idx_reset_token` - For token validation
- `idx_expires_at` - For cleanup of expired tokens

---

## Design Decisions

### 1. Engine: InnoDB
- Supports transactions, foreign keys, and row-level locking
- Essential for data integrity in financial applications

### 2. Character Set: utf8mb4
- Full Unicode support including emojis
- Future-proof for international users

### 3. AUTO_INCREMENT on Primary Keys
- Simple, reliable unique identifiers
- Avoids application-side ID generation complexity

### 4. TIMESTAMP with DEFAULT CURRENT_TIMESTAMP
- Automatic timestamp management
- ON UPDATE CURRENT_TIMESTAMP for audit trails

### 5. FOREIGN KEY with ON DELETE CASCADE
- Maintains referential integrity
- Automatic cleanup of related data when user is deleted
- Simplifies application logic (no orphaned data)

### 6. ENUM for category and status fields
- Data integrity at database level
- Prevents invalid values
- Storage efficient (1-2 bytes)
- Easy to modify with ALTER TABLE if needed

### 7. CHECK Constraints
- Business logic enforcement at database level
- Prevents invalid data entry
- Reduces application-side validation burden

### 8. Indexes Strategy
- Foreign key indexes for fast joins
- Date indexes for time-based queries (analytics)
- Composite indexes for common query patterns
- Balance between read performance and write overhead

### 9. DECIMAL(10, 2) for monetary values
- Exact precision for financial calculations
- Avoids floating-point rounding errors
- Supports amounts up to 99,999,999.99

### 10. UNIQUE constraint on budgets (user_id, month, year)
- Enforces one budget per user per month
- Prevents duplicate budget entries
- Simplifies budget lookup logic

### 11. TEXT for notes field
- Flexible length for user descriptions
- No arbitrary length limit
- Stored separately from main row for performance

### 12. DATE vs TIMESTAMP for transaction_date and target_date
- DATE for business dates (no time component needed)
- TIMESTAMP for audit trails (includes time)
- Clear semantic distinction

---

## Setup Instructions

### Local Development
```bash
# Create the database and run the schema
mysql -u root -p < server/schema.sql
```

### Vercel Deployment
```bash
# Using PlanetScale CLI
pscale shell your-database-name < server/schema.sql

# Or using MySQL client with cloud database
mysql -h your-host -u your-user -p pisopilot < server/schema.sql
```

### Environment Variables Required
```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=pisopilot
DB_PORT=3306
JWT_SECRET=your-secure-random-key
```

---

## Common Queries

### Get user transactions for a date range
```sql
SELECT * FROM transactions 
WHERE user_id = ? 
  AND transaction_date BETWEEN ? AND ?
ORDER BY transaction_date DESC;
```

### Get user's monthly budget
```sql
SELECT * FROM budgets 
WHERE user_id = ? 
  AND month = ? 
  AND year = ?;
```

### Get active goals nearing deadline
```sql
SELECT * FROM goals 
WHERE user_id = ? 
  AND status = 'active' 
  AND target_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
ORDER BY target_date ASC;
```

### Get total spending by category for a month
```sql
SELECT category, SUM(amount) as total
FROM transactions
WHERE user_id = ?
  AND MONTH(transaction_date) = ?
  AND YEAR(transaction_date) = ?
GROUP BY category
ORDER BY total DESC;
```
