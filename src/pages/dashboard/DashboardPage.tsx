export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-background mb-2">
          Dashboard
        </h1>
        <p className="font-body-lg text-on-surface-variant">
          Overview of your finances
        </p>
      </div>

      {/* Placeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
          <div className="font-label-caps text-on-surface-variant mb-2">Monthly Budget</div>
          <div className="font-display-currency text-primary">₱0.00</div>
        </div>
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
          <div className="font-label-caps text-on-surface-variant mb-2">Remaining</div>
          <div className="font-display-currency text-primary">₱0.00</div>
        </div>
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
          <div className="font-label-caps text-on-surface-variant mb-2">Total Spending</div>
          <div className="font-display-currency text-on-surface">₱0.00</div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
        <div className="font-headline-md text-headline-md text-on-surface mb-4">
          Recent Transactions
        </div>
        <div className="text-center py-12 text-on-surface-variant font-body-lg">
          No transactions yet
        </div>
      </div>
    </div>
  )
}
