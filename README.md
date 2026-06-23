# PISOPILOT_PROJECT_SPECIFICATION.md

# PisoPilot

## Project Overview

### Project Name

PisoPilot

### Tagline

Know where every peso goes.

### Purpose

PisoPilot is a student-focused expense tracking web application designed to help students monitor spending, manage budgets, and achieve savings goals.

The application should be simple, fast, and practical. Students should be able to add expenses quickly, understand where their money goes, and determine whether they are staying within budget.

### Target Audience

* College Students
* Senior High School Students
* Students receiving allowances
* Students managing personal budgets

### Core Objectives

Users should be able to:

1. Track daily expenses
2. Monitor monthly spending
3. Manage personal budgets
4. Analyze spending habits
5. Set savings goals
6. View financial summaries

### Design Principles

* Mobile First
* Simple User Experience
* Fast Expense Entry
* Minimal Navigation
* Clean Modern UI
* Responsive Design
* Accessibility Friendly

---

# UI Screens

## Public Pages

### Landing Page

Sections:

* Navigation Bar
* Hero Section
* Features Section
* Benefits Section
* Call To Action
* Footer

Primary CTA:
"Start Tracking For Free"

---

### Login Page

Components:

* Email Field
* Password Field
* Login Button
* Register Link

---

### Register Page

Components:

* Full Name
* Email
* Password
* Confirm Password
* Register Button

---

# Protected Application Pages

## Dashboard

Purpose:
Main financial overview.

Components:

* Monthly Budget Card
* Remaining Budget Card
* Total Spending Card
* Quick Add Expense
* Budget Progress
* Recent Transactions
* Active Goals Preview

---

## Transactions

Purpose:
Manage expenses.

Components:

* Transaction Table
* Search Bar
* Category Filter
* Date Filter
* Add Expense Modal
* Edit Expense Modal
* Delete Confirmation Modal

Fields:

* Amount
* Category
* Date
* Notes

---

## Budgets

Purpose:
Monitor and manage budgets.

Components:

* Monthly Budget Card
* Category Budget Cards
* Progress Indicators
* Warning Alerts

---

## Analytics

Purpose:
Visualize spending habits.

Components:

* Category Breakdown Chart
* Spending Trend Chart
* Summary Cards
* Date Filters
* Export CSV Button

---

## Goals

Purpose:
Track savings goals.

Components:

* Goal Cards
* Goal Progress Bars
* Create Goal Modal
* Edit Goal Modal
* Delete Goal Modal

---

## Settings

Purpose:
Manage user preferences.

Components:

* Profile Information
* Currency Settings
* Monthly Reset Day
* Export Data
* Delete Account
* FAQ Section

---

# Technology Stack

## Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* ShadCN UI
* React Router DOM
* React Hook Form
* Zod
* Axios
* TanStack Query
* Recharts

---

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt

---

## Database

* MySQL

---

## Deployment

Frontend:

* Vercel

Backend:

* Render

Database:

* MySQL Server

---

# Folder Structure

src/

├── assets/

├── components/
│
├── common/
│
├── dashboard/
│
├── transactions/
│
├── budgets/
│
├── analytics/
│
└── goals/

├── pages/
│
├── auth/
│
├── dashboard/
│
├── transactions/
│
├── budgets/
│
├── analytics/
│
├── goals/
│
└── settings/

├── layouts/

├── hooks/

├── services/

├── context/

├── routes/

├── lib/

├── types/

└── utils/

---

# Database Schema

## Users

| Field         | Type      |
| ------------- | --------- |
| id            | INT       |
| name          | VARCHAR   |
| email         | VARCHAR   |
| password_hash | VARCHAR   |
| created_at    | TIMESTAMP |
| updated_at    | TIMESTAMP |

---

## Transactions

| Field            | Type      |
| ---------------- | --------- |
| id               | INT       |
| user_id          | INT       |
| amount           | DECIMAL   |
| category         | VARCHAR   |
| notes            | TEXT      |
| transaction_date | DATE      |
| created_at       | TIMESTAMP |
| updated_at       | TIMESTAMP |

---

## Budgets

| Field          | Type      |
| -------------- | --------- |
| id             | INT       |
| user_id        | INT       |
| monthly_budget | DECIMAL   |
| month          | INT       |
| year           | INT       |
| created_at     | TIMESTAMP |
| updated_at     | TIMESTAMP |

---

## Goals

| Field          | Type      |
| -------------- | --------- |
| id             | INT       |
| user_id        | INT       |
| goal_name      | VARCHAR   |
| target_amount  | DECIMAL   |
| current_amount | DECIMAL   |
| target_date    | DATE      |
| status         | VARCHAR   |
| created_at     | TIMESTAMP |
| updated_at     | TIMESTAMP |

---

# API Endpoints

## Authentication

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/profile

---

## Transactions

GET /api/transactions

GET /api/transactions/:id

POST /api/transactions

PUT /api/transactions/:id

DELETE /api/transactions/:id

---

## Budgets

GET /api/budgets

POST /api/budgets

PUT /api/budgets/:id

DELETE /api/budgets/:id

---

## Goals

GET /api/goals

POST /api/goals

PUT /api/goals/:id

DELETE /api/goals/:id

---

## Analytics

GET /api/analytics/summary

GET /api/analytics/categories

GET /api/analytics/trends

---

# Development Rules

## General Rules

1. Use TypeScript strictly.
2. Use functional components only.
3. Use React Hooks.
4. Use reusable components.
5. Use Tailwind CSS.
6. Use ShadCN UI when applicable.
7. Avoid code duplication.
8. Follow clean architecture.
9. Mobile-first design.
10. Responsive on Desktop, Tablet, and Mobile.

---

## Form Rules

1. React Hook Form
2. Zod Validation
3. Error Messages
4. Loading States

---

## API Rules

1. Axios Only
2. TanStack Query
3. Centralized API Service Layer
4. Global Error Handling

---

## UI Rules

Every page must include:

* Loading State
* Empty State
* Error State
* Success Feedback

---

# Development Roadmap

## Phase 1 — Foundation

Goal:
Establish architecture and authentication.

Tasks:

* Project Setup
* Tailwind Setup
* ShadCN Setup
* Routing
* Authentication
* Layout System
* Sidebar
* Mobile Navigation
* Landing Page
* Login Page
* Register Page

Deliverables:

✓ Authentication
✓ Navigation
✓ Responsive Layout

---

## Phase 2 — Core Features

Goal:
Implement expense tracking and budgeting.

Tasks:

* Dashboard
* Transactions CRUD
* Budget CRUD
* Budget Calculations
* Budget Alerts

Deliverables:

✓ Expense Tracking
✓ Budget Management

---

## Phase 3 — Analytics & Goals

Goal:
Provide insights and savings tracking.

Tasks:

* Analytics Dashboard
* Category Charts
* Spending Trends
* Goal Management
* CSV Export

Deliverables:

✓ Analytics
✓ Savings Goals

---

## Phase 4 — Polish & Deployment

Goal:
Portfolio-ready application.

Tasks:

* Loading States
* Empty States
* Error Handling
* Accessibility
* Performance Optimization
* Testing
* Deployment
* README Creation

Deliverables:

✓ Production Ready Application
✓ Portfolio Ready Repository

---

# MVP Definition

The MVP is complete when:

✓ User can register

✓ User can login

✓ User can logout

✓ User can create expenses

✓ User can edit expenses

✓ User can delete expenses

✓ User can create budgets

✓ User can monitor budgets

✓ User can create goals

✓ User can update goals

✓ User can view analytics

✓ Mobile responsive

✓ Desktop responsive

✓ Deployed online

✓ Public GitHub repository available

---

# Cursor Instructions

Always read this specification before generating code.

Rules:

1. Follow this specification exactly.
2. Do not create features outside the scope.
3. Do not modify unrelated files.
4. Build one phase at a time.
5. Prioritize maintainability and scalability.
6. Generate production-quality code.
7. Ask for clarification if requirements conflict.
