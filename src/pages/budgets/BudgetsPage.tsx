export function BudgetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-background mb-2">
          Budgets
        </h1>
        <p className="font-body-lg text-on-surface-variant">
          Monitor and manage your budgets
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
        <div className="flex items-center justify-between mb-6">
          <div className="font-headline-md text-headline-md text-on-surface">
            Monthly Budget
          </div>
          <button className="bg-primary text-on-primary font-body-lg px-6 py-3 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors">
            Set Budget
          </button>
        </div>

        <div className="text-center py-12 text-on-surface-variant font-body-lg">
          No budget set yet
        </div>
      </div>
    </div>
  )
}
