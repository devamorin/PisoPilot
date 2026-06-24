export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-background mb-2">
          Settings
        </h1>
        <p className="font-body-lg text-on-surface-variant">
          Manage your preferences
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
          <div className="font-headline-md text-headline-md text-on-surface mb-4">
            Profile Information
          </div>
          <div className="space-y-4">
            <div>
              <label className="font-label-caps text-on-surface-variant block mb-2">
                Name
              </label>
              <div className="font-body-lg text-on-surface">John Doe</div>
            </div>
            <div>
              <label className="font-label-caps text-on-surface-variant block mb-2">
                Email
              </label>
              <div className="font-body-lg text-on-surface">john@example.com</div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
          <div className="font-headline-md text-headline-md text-on-surface mb-4">
            Preferences
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body-lg text-on-surface">Currency</div>
                <div className="font-body-sm text-on-surface-variant">
                  Philippine Peso (PHP)
                </div>
              </div>
              <span className="font-body-lg text-on-surface-variant">PHP</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body-lg text-on-surface">Monthly Reset Day</div>
                <div className="font-body-sm text-on-surface-variant">
                  Day of month to reset budget
                </div>
              </div>
              <span className="font-body-lg text-on-surface-variant">1st</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin">
          <div className="font-headline-md text-headline-md text-on-surface mb-4">
            Data
          </div>
          <div className="space-y-4">
            <button className="w-full text-left font-body-lg text-on-surface hover:text-primary transition-colors">
              Export Data
            </button>
            <button className="w-full text-left font-body-lg text-error hover:text-error-container transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
