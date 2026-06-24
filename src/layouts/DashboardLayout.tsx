import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface DashboardLayoutProps {
  children?: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar - Placeholder for Phase 1 */}
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">PisoPilot</h1>
          </div>
          <nav className="flex-1 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Navigation placeholder</p>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Header - Placeholder for Phase 1 */}
          <header className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">PisoPilot</h1>
          </header>
          <div className="p-4 md:p-8">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}
