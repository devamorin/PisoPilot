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
import { useAuth } from '../context/AuthContext'
import { isValidToken } from '../lib/jwt'

// Protected Route Component with JWT validation
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Redirect to login if not authenticated or token is invalid
  if (!token || !isValidToken(token)) {
    return <Navigate to="/login" replace />
  }

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
