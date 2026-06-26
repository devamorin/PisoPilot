-- Add email verification columns to existing users table
-- Run this in Railway MySQL Console or MySQL Workbench

USE railway;

-- Add verification columns if they don't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE COMMENT 'Email verification status';

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS verification_code VARCHAR(6) COMMENT '6-digit OTP code for email verification';

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS verification_expires TIMESTAMP NULL COMMENT 'OTP expiration timestamp';

-- Verify columns were added
DESCRIBE users;
