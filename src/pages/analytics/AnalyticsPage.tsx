export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-background mb-2">
          Analytics
        </h1>
        <p className="font-body-lg text-on-surface-variant">
          Visualize your spending habits
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
          <div className="font-headline-md text-headline-md text-on-surface mb-4">
            Category Breakdown
          </div>
          <div className="text-center py-12 text-on-surface-variant font-body-lg">
            No data available
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
          <div className="font-headline-md text-headline-md text-on-surface mb-4">
            Spending Trends
          </div>
          <div className="text-center py-12 text-on-surface-variant font-body-lg">
            No data available
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
        <div className="flex items-center justify-between mb-4">
          <div className="font-headline-md text-headline-md text-on-surface">
            Summary
          </div>
          <button className="text-primary font-body-lg hover:underline">
            Export CSV
          </button>
        </div>
        <div className="text-center py-12 text-on-surface-variant font-body-lg">
          No data available
        </div>
      </div>
    </div>
  )
}
