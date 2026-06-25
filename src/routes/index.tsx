import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { MainLayout } from '../layouts/MainLayout'
import { LandingPage } from '../pages/landing/LandingPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { TransactionsPage } from '../pages/transactions/TransactionsPage'
import { BudgetsPage } from '../pages/budgets/BudgetsPage'
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage'
import { GoalsPage } from '../pages/goals/GoalsPage'
import { SettingsPage } from '../pages/settings/SettingsPage'

// Protected Route Component (placeholder for Phase 1)
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // TODO: Implement authentication check in Phase 1
  return <>{children}</>
}

export function Routes() {
  return (
    <ReactRoutes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/transactions"
        element={
          <ProtectedRoute>
            <MainLayout>
              <TransactionsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/budgets"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BudgetsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AnalyticsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/goals"
        element={
          <ProtectedRoute>
            <MainLayout>
              <GoalsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </ReactRoutes>
  )
}
