import { ReactNode } from 'react'

interface PublicLayoutProps {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-on-background antialiased">
      {children}
    </div>
  )
}
