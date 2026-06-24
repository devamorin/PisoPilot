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

export function MobileNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-surface-variant z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[60px] ${
                  isActive
                    ? 'text-primary'
                    : 'text-on-surface-variant'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-label-caps text-[10px]">{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
