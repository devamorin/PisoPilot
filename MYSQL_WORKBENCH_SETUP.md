# MySQL Workbench Setup Guide for Railway Database

This guide will help you connect MySQL Workbench to your Railway MySQL database so you can view and manage the same database both in MySQL Workbench and Railway.

---

## Part 1: Get Railway MySQL Connection Details

### Step 1: Log in to Railway
1. Go to [railway.app](https://railway.app) and sign in
2. Click on your **PisoPilot** project

### Step 2: Select MySQL Database
1. Click on your **MySQL** service in the project
2. Go to the **"Connect"** tab

### Step 3: Copy Connection Details
You'll see connection information like:
```
mysql://root:yGgAjbOPpFzQUBqcfeIhMAXPZTWqIASv@reseau.proxy.rlwy.net:26802/railway
```

Extract these values:
- **Host:** `reseau.proxy.rlwy.net`
- **Port:** `26802`
- **Username:** `root`
- **Password:** `yGgAjbOPpFzQUBqcfeIhMAXPZTWqIASv`
- **Database:** `railway`

---

## Part 2: Set Up MySQL Workbench Connection

### Step 1: Open MySQL Workbench
Launch MySQL Workbench on your computer

### Step 2: Create New Connection
1. Click the **"+"** button next to "MySQL Connections"
2. Fill in the connection details:

**Connection Name:** `PisoPilot Railway`

**Connection Method:** `Standard TCP/IP`

**Parameters:**
- **Hostname:** `reseau.proxy.rlwy.net`
- **Port:** `26802`
- **Username:** `root`
- **Password:** Click "Store in Vault" and enter: `yGgAjbOPpFzQUBqcfeIhMAXPZTWqIASv`

**Default Schema:** `railway`

### Step 3: Test Connection
1. Click **"Test Connection"**
2. If successful, you'll see "Connection successful"
3. Click **"OK"** to save the connection

---

## Part 3: Connect and Verify Database

### Step 1: Connect to Database
1. Double-click on your new **"PisoPilot Railway"** connection
2. Wait for the connection to establish
3. You should see a query tab open

### Step 2: Verify Tables Already Exist
Since you already created tables in Railway Console, run:

```sql
SHOW TABLES;
```

You should see:
- users
- transactions
- budgets
- goals
- password_resets

### Step 3: View Table Structure
Click on any table name in the **SCHEMAS** panel to see its structure, or run:

```sql
DESCRIBE users;
DESCRIBE transactions;
DESCRIBE budgets;
DESCRIBE goals;
DESCRIBE password_resets;
```

---

## Part 4: Run Schema (If Needed)

If tables don't exist or you want to recreate them:

### Step 1: Select Database
In the SCHEMAS panel, **double-click** on `railway` to select it

### Step 2: Run Schema
1. Open `server/schema-workbench.sql` in a text editor
2. Copy the entire content
3. Paste into MySQL Workbench query tab
4. Click the **lightning bolt** icon to execute

**Note:** Since tables already exist, you'll see "Table already exists" warnings - this is normal.

---

## Part 5: View and Manage Data

### View Existing Data
```sql
-- View all users
SELECT * FROM users;

-- View all transactions
SELECT * FROM transactions;

-- View all budgets
SELECT * FROM budgets;

-- View all goals
SELECT * FROM goals;
```

### Insert Test Data (Optional)
```sql
-- Insert a test user
INSERT INTO users (name, email, password_hash, is_verified) 
VALUES ('Test User', 'test@example.com', 'hashedpassword', TRUE);

-- Insert a test transaction
INSERT INTO transactions (user_id, amount, category, notes, transaction_date)
VALUES (1, 50.00, 'Food', 'Lunch', CURDATE());
```

### Delete Test Data (If Needed)
```sql
-- Delete test data
DELETE FROM transactions WHERE user_id = 1;
DELETE FROM users WHERE id = 1;
```

---

## Part 6: Sync Between Railway and MySQL Workbench

**Important:** MySQL Workbench connects directly to your Railway database, so:
- Any changes made in MySQL Workbench **immediately** reflect in Railway
- Any changes made in Railway Console **immediately** reflect in MySQL Workbench
- They are the **same database** - just different interfaces

### Real-Time Sync Example
1. Insert a user in MySQL Workbench
2. Check Railway Console - the user appears there
3. Insert a transaction in Railway Console
4. Check MySQL Workbench - the transaction appears there

---

## Part 7: Common Operations

### Backup Database
```sql
-- Export data (use MySQL Workbench Data Export feature)
-- Server > Data Export > Select railway database > Export
```

### Clear All Tables (Use with Caution!)
```sql
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS password_resets;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;
```

### Reset Database
After clearing tables, run the schema again to recreate them.

---

## Troubleshooting

### Connection Timeout
- **Error:** "Can't connect to MySQL server"
- **Solution:** Check if Railway MySQL is running, verify host and port are correct

### Access Denied
- **Error:** "Access denied for user"
- **Solution:** Verify username and password are correct from Railway Connect tab

### Database Not Found
- **Error:** "Unknown database 'railway'"
- **Solution:** Make sure you selected `railway` as Default Schema in connection settings

### SSL Connection Issues
- **Error:** SSL connection errors
- **Solution:** In MySQL Workbench connection settings, go to SSL tab and select "Use SSL if available"

---

## Summary Checklist

- [ ] Get connection details from Railway Connect tab
- [ ] Create new connection in MySQL Workbench
- [ ] Test connection successfully
- [ ] Connect to Railway database
- [ ] Verify tables exist with SHOW TABLES
- [ ] Run schema if tables don't exist
- [ ] Test data sync between MySQL Workbench and Railway

---

## Next Steps

Once connected, you can:
- View and edit data directly in MySQL Workbench
- Run complex queries for analytics
- Export data for reporting
- Manage database structure
- Debug application data issues

The database in MySQL Workbench is the **same** as your Railway database - changes sync in real-time!
