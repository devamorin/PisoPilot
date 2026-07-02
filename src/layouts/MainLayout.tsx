import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/common/Sidebar'
import { MobileNavigation } from '../components/common/MobileNavigation'

interface MainLayoutProps {
  children?: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-on-background antialiased">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen">
          {/* Mobile Header */}
          <header className="md:hidden bg-background border-b border-surface-variant sticky top-0 z-40">
            <div className="flex items-center justify-between px-container-margin py-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-on-primary font-bold text-lg">P</span>
                </div>
                <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
                  PisoPilot
                </span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 md:p-8 pb-24 md:pb-8">
            {children || <Outlet />}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />
    </div>
  )
}
