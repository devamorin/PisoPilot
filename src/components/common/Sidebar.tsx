import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Receipt, Wallet, BarChart3, Target, Settings } from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/dashboard/transactions', label: 'Transactions', icon: Receipt },
  { path: '/dashboard/budgets', label: 'Budgets', icon: Wallet },
  { path: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/dashboard/goals', label: 'Goals', icon: Target },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-background border-r border-surface-variant h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-surface-variant">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Wallet className="w-5 h-5 text-on-primary" />
          </div>
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
            PisoPilot
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary font-medium'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-body-lg">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-surface-variant">
        <p className="font-body-sm text-on-surface-variant text-center">
          © 2024 PisoPilot
        </p>
      </div>
    </aside>
  )
}
